import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentVTEXService } from './payment.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('CartVTEXService', () => {
  let service: PaymentVTEXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentVTEXService, HttpServiceProvider],
    }).compile();

    service = module.get<PaymentVTEXService>(PaymentVTEXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
