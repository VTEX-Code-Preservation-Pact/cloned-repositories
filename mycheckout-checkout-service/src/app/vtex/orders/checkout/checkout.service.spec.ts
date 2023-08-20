import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutVTEXService } from './checkout.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('CheckoutVTEXService', () => {
  let service: CheckoutVTEXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutVTEXService, HttpServiceProvider],
    }).compile();

    service = module.get<CheckoutVTEXService>(CheckoutVTEXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
