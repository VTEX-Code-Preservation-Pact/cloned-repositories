import { ApiResponse } from '../../../../shared/responses';
import { ITransactionService } from '../../base/base-transaction.interface';
import { ChargesDto } from '../../base/dtos/charges.dto';
import { CustomerDto } from '../../base/dtos/customer.dto';

export class TransactionService implements ITransactionService {
  constructor(private readonly mercadopago) {}

  createCharge(data: ChargesDto, customer: CustomerDto): Promise<any> {
    // details in https://www.mercadopago.com.mx/developers/es/guides/online-payments/checkout-api/receiving-payment-by-card
    let transaction;
    if (data.order.issuer_id)
      transaction = this.mercadopago.payment.save({
        transaction_amount: data.order.amount,
        token: data.ccToken,
        description: data.order.description,
        installments: data.order.installments,
        payment_method_id: data.order.payment_method_id,
        issuer_id: data.order.issuer_id,
        payer: {
          email: customer.email,
          identification: {
            type: customer.documentType,
            number: customer.documentNumber,
          },
        },
      });
    else
      transaction = this.mercadopago.payment.create({
        transaction_amount: data.order.amount,
        token: data.ccToken,
        description: data.order.description,
        installments: data.order.installments,
        payer: {
          type: 'customer',
          id: customer.id,
        },
      });

    return transaction
      .then((response) => {
        this.paymentCapture(response.body.id);
        return {
          transaction_id: response.body.id,
          authorization_code: response.body.status_detail,
          status: response.body.status,
        };
      })
      .catch((error) => {
        console.log(error);
        throw ApiResponse.errorWithObject(
          'errors.mercadopago_create_transaction',
          { error: error },
        );
      });
  }

  private paymentCapture(paymentId: number) {
    // acretited payment after being authorized
    return this.mercadopago.payment.capture(
      paymentId,
      this.mercadopago,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      },
    );
  }
  /*createOtherPayment(payment: PaymentDto, order: OrderDoc) {
    // details in https://www.mercadopago.com.mx/developers/es/guides/online-payments/checkout-api/other-payment-ways
    const user = order.user;
    return this.mercadopago.payment
      .create({
        ...payment,
        payer: {
          email: user.email,
        },
      })
      .then((response) => {
        this.paymentCapture(response.body.id);
        return {
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id,
          transaction_details: response.body.transaction_details,
        };
      })
      .catch((error) => {
        console.log(error);
        throw ApiResponse.errorWithObject(
          'errors.mercadopago_create_transaction',
          { error: error },
        );
      });
  }*/

  getPaymentMethods() {
    return this.mercadopago
      .get('/v1/payment_methods')
      .then((response) => response.response)
      .catch((error) => error);
  }
}
