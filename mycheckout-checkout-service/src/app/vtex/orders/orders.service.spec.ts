import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersVTEXService } from './orders.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('OrdersService', () => {
  let service: OrdersVTEXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersVTEXService, HttpServiceProvider],
    }).compile();

    service = module.get<OrdersVTEXService>(OrdersVTEXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
