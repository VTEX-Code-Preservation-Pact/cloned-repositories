import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { InfobipService } from './infobip.service';

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({
    get() {
      return {};
    },
  }),
};

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('InfobipService', () => {
  let service: InfobipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfobipService, ConfigServiceProvider, HttpServiceProvider],
    }).compile();

    service = module.get<InfobipService>(InfobipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
