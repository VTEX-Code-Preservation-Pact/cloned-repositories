import { PaymentProvider } from '../payment-provider';

export class CashOnDelivery extends PaymentProvider {
  authorizePayment(): Promise<void> {
    this.ctx.transaction = {
      transactionId: 'promissory',
    };
    return;
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
