import { Test, TestingModule } from '@nestjs/testing';
import { CreditPayController } from './credit-pay.controller';
import { CreditPayService } from './credit-pay.service';

describe('CreditPayController', () => {
  let controller: CreditPayController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CreditPayService,
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditPayController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<CreditPayController>(CreditPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
