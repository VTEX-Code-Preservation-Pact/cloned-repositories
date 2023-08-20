import { OrderContext } from '../../typings/OrderContext';
import { PaymentProviderServices } from './types/payment-providers.type';

export abstract class PaymentProvider {
  constructor(
    protected services: PaymentProviderServices,
    protected ctx: OrderContext,
  ) {}

  abstract authorizePayment(): Promise<void>;
  abstract capturePayment(): Promise<void>;
  abstract refundPayment(): Promise<void>;
  abstract cancelPayment(): Promise<void>;
  abstract rollbackPayment(): Promise<void>;
}
