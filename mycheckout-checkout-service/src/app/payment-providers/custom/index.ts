import { OrderContext } from 'src/typings/OrderContext';
import { PaymentProvider } from '../payment-provider';
import { PaymentProviderServices } from '../types/payment-providers.type';

export class Custom extends PaymentProvider {
  constructor(
    protected services: PaymentProviderServices,
    protected ctx: OrderContext,
    protected paymentMethod: string,
  ) {
    super(services, ctx);
  }
  authorizePayment(): Promise<void> {
    this.ctx.transaction = {
      transactionId: this.paymentMethod,
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
