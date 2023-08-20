import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreditPayService } from './credit-pay/credit-pay.service';
import { MercadopagoService } from './mercadopago/mercadopago.service';
import { PaymentProvidersService } from './payment-providers.service';

const MercadoPagoServiceProvider = {
  provide: MercadopagoService,
  useFactory: () => ({}),
};

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({}),
};

const CreditPayServiceProvider = {
  provide: CreditPayService,
  useFactory: () => ({}),
};

describe('PaymentProvidersService', () => {
  let service: PaymentProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentProvidersService,
        MercadoPagoServiceProvider,
        HttpServiceProvider,
        ConfigServiceProvider,
        CreditPayServiceProvider,
      ],
    }).compile();

    service = module.get<PaymentProvidersService>(PaymentProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
