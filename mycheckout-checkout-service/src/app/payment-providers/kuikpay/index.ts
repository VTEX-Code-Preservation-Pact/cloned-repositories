import { GatewayException } from '../../../shared/exceptions/gateway-exception';
import { OrderContext } from '../../../typings/OrderContext';
import { PaymentProvider } from '../payment-provider';
import { PaymentProviderServices } from '../types/payment-providers.type';
import { KuikpayService } from './kuikpay.service';
import { AdditionalData } from './types';

export class KuikpayProvider extends PaymentProvider {
  constructor(
    public services: PaymentProviderServices,
    public ctx: OrderContext,
  ) {
    super(services, ctx);
  }

  async authorizePayment(): Promise<void> {
    const {
      processTransactionDto: {
        payment: { additionalData: ad, ...paymentData },
        omsExtraData: { order: orderVtex, transactions, checkoutCookie },
        account,
        hostname,
      },
    } = this.ctx;

    const additionalData = ad as AdditionalData;
    const kuikpayService = new KuikpayService(this.services);
    const transactionPromises = [];

    try {
      transactions.forEach((transaction) =>
        transaction.payments.forEach((payment) =>
          transactionPromises.push(
            kuikpayService.sendPayment(
              payment,
              orderVtex,
              transaction,
              account,
              checkoutCookie,
              hostname,
              { additionalData, ...paymentData },
              this.ctx,
            ),
          ),
        ),
      );
      await Promise.all(transactionPromises);
    } catch (err) {
      if (err.code && err.code === 'ECONNREFUSED') {
        throw new GatewayException(
          'Payments service is not online',
          err.response,
        );
      }
      throw new GatewayException(
        'Error in payment service',
        err.response?.data,
      );
    }

    this.ctx.transaction = {
      ...this.ctx.transaction,
      transactionId: additionalData?.transactionId,
    };
  }

  capturePayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  refundPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  cancelPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rollbackPayment(): Promise<void> {
    return;
  }
}
