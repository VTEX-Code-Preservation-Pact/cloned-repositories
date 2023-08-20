import { OrderContext } from '../../typings/OrderContext';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CashOnDelivery } from './cashOnDelivery';
import { CreditPayProvider } from './credit-pay';
import { CreditPayService } from './credit-pay/credit-pay.service';
import { KuikpayProvider } from './kuikpay';
import { MercadoPagoProvider } from './mercadopago';
import { MercadopagoService } from './mercadopago/mercadopago.service';
import { PaymentProvider } from './payment-provider';
import {
  PaymentMethodName,
  PaymentProviderName,
  PaymentProviderServices,
} from './types/payment-providers.type';
import { Custom } from './custom';

@Injectable()
export class PaymentProvidersService {
  public readonly payments: {
    Mercadopago: MercadopagoService;
  } = {
    Mercadopago: undefined,
  };
  private services: PaymentProviderServices;

  constructor(
    private readonly mercadoPagoService: MercadopagoService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly creditPayService: CreditPayService,
  ) {
    this.services = {
      configService,
      httpService,
      creditPayService,
    };

    this.payments['Mercadopago'] = this.mercadoPagoService;
  }

  createPaymentProvider(
    paymentMethod: string,
    paymentProviderName: string,
    accountId: string,
    ctx: OrderContext,
  ): PaymentProvider {
    //TODO: Revisar al eliminar PCI proxy
    //if (accountId) return new Custom(this.services, ctx, paymentMethod);
    switch (paymentMethod) {
      case PaymentMethodName.CreditCard:
        switch (paymentProviderName) {
          case PaymentProviderName.MercadoPago:
            return new MercadoPagoProvider(this.services, ctx);

          case PaymentProviderName.Noop:
            return new KuikpayProvider(this.services, ctx);

          default:
            throw new Error('Gateway Does Not Exist');
        }
      case PaymentMethodName.Promissory:
        switch (paymentProviderName) {
          case PaymentProviderName.CashOnDelivery:
            return new CashOnDelivery(this.services, ctx);

          default:
            throw new Error('Gateway Does Not Exist');
        }
      case PaymentMethodName.BNPL:
        switch (paymentProviderName) {
          case PaymentProviderName.CreditPay:
            return new CreditPayProvider(this.services, ctx);

          default:
            throw new Error('Gateway Does Not Exist');
        }
      default:
        if (paymentProviderName == PaymentProviderName.Custom)
          return new Custom(this.services, ctx, paymentMethod);
        else throw new Error('Payment Method Does Not Exist');
    }
  }
}
