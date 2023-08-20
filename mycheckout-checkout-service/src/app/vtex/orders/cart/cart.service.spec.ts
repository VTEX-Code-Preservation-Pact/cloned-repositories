import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CartVTEXService } from './cart.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('CartVTEXService', () => {
  let service: CartVTEXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartVTEXService, HttpServiceProvider],
    }).compile();

    service = module.get<CartVTEXService>(CartVTEXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
