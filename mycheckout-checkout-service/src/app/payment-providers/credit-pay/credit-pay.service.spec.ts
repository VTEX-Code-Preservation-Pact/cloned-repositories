import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreditPayService } from './credit-pay.service';
import { Credit } from './schema/credit.schema';

describe('CreditPayService', () => {
  let service: CreditPayService;

  beforeEach(async () => {
    const CreditModel = {
      provide: getModelToken(Credit.name),
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditPayService, CreditModel],
    }).compile();

    service = module.get<CreditPayService>(CreditPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
