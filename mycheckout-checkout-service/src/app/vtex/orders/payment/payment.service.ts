import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CreateAccountDto } from 'src/app/accounts/dtos/createAccount.dto';
import { OrderVtexDto } from '../../dtos/orderVtex.dto';
import { TransactionVtexDto } from '../../dtos/transactionVtex.dto';
import { PaymentData } from '../../../../typings/OrderContext';
import { GatewayException } from 'src/shared/exceptions/gateway-exception';

@Injectable()
export class PaymentVTEXService {
  constructor(private httpService: HttpService) {}

  async sendPaymentData(
    accountData: CreateAccountDto,
    transaction: TransactionVtexDto,
    order: OrderVtexDto,
    headers: any,
    paymentData?: PaymentData,
  ) {
    const payments = [];
    transaction.payments.forEach((payment) => {
      payments.push({
        paymentSystem: payment.paymentSystem,
        installments: 1,
        installmentsInterestRate: 0,
        installmentsValue: 0,
        Value: payment.value,
        referenceValue: payment.referenceValue,
        bin: paymentData?.bin,
        fields: {
          holderName: paymentData?.holderName,
          cardNumber: paymentData?.cardNumber,
          validationCode: paymentData?.cvv,
          accountId: (paymentData.additionalData as any)?.accountId,
          dueDate: paymentData?.expirationDate,
          addressId: order.addressId,
          bin: paymentData?.bin,
        },
        transaction: {
          id: transaction.transactionId,
          merchantName: transaction.merchantName,
        },
        currencyCode: order.currencyCode,
      });
    });

    try {
      return this.httpService
        .post(
          `https://${accountData.account}.vtexpayments.com.br/api/pub/transactions/${transaction.transactionId}/payments`,
          payments,
          {
            headers: {
              ...headers,
            },
          },
        )
        .pipe(map((response: any) => response.status))
        .toPromise();
    } catch (err) {
      throw new GatewayException(
        'VTEX: Error send payment data',
        err.response?.data,
        order,
      );
    }
  }

  async requestPaymentProcess(
    accountData: CreateAccountDto,
    checkoutCookie: string,
    order: OrderVtexDto,
    headers: any,
  ) {
    try {
      return this.httpService
        .post(
          `http://${accountData.account}.vtexcommercestable.com.br/api/checkout/pub/gatewayCallback/${order.orderGroup}`,
          null,
          {
            headers: {
              Vtex_CHKO_Auth: checkoutCookie,
              ...headers,
            },
          },
        )
        .pipe(
          map((response: any) => {
            return {
              status: response.status === 200 || response.status === 204,
              message: 'ok',
            };
          }),
        )
        .toPromise();
    } catch (err) {
      throw new GatewayException(
        'VTEX: Error send payment data',
        err.response?.data,
        order,
      );
    }
  }
}
