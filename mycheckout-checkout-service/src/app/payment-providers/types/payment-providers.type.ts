import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreditPayService } from '../credit-pay/credit-pay.service';

export type PaymentProviderServices = {
  httpService: HttpService;
  configService: ConfigService;
  creditPayService: CreditPayService;
};

export enum PaymentProviderName {
  MercadoPago = 'mercadopago',
  Paymentez = 'paymentez',
  Noop = 'noop',
  CashOnDelivery = 'promissory',
  CreditPay = 'creditpay',
  Custom = 'custom',
}

export enum PaymentMethodName {
  Promissory = 'promissory',
  CreditCard = 'tc',
  BNPL = 'BNPL',
}
