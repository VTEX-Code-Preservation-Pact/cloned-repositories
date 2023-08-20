import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersVTEXService } from '../vtex/orders/orders.service';
import { OmsService } from './oms.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

const OrdersVTEXServiceProvider = {
  provide: OrdersVTEXService,
  useFactory: () => ({}),
};

describe('OmsService', () => {
  let service: OmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmsService, HttpServiceProvider, OrdersVTEXServiceProvider],
    }).compile();

    service = module.get<OmsService>(OmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
