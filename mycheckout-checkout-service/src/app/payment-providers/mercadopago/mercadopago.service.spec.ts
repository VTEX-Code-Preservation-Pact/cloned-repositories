import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MercadopagoService } from './mercadopago.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({
    get() {
      return {};
    },
  }),
};

describe('MercadopagoService', () => {
  let service: MercadopagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadopagoService,
        HttpServiceProvider,
        ConfigServiceProvider,
      ],
    }).compile();

    service = module.get<MercadopagoService>(MercadopagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
