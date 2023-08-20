import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { AccountsService } from '../accounts.service';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethod } from './schemas/payment-method.schema';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  beforeEach(async () => {
    const model: Provider = {
      provide: getModelToken(PaymentMethod.name),
      useValue: {},
    };

    const accountsService: Provider = {
      provide: AccountsService,
      useValue: {},
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodsService, accountsService, model],
    }).compile();

    service = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
