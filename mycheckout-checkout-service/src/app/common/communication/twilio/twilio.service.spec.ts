import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TwilioService } from './twilio.service';

jest.mock('twilio', () => {
  return jest.fn(() => null);
});

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({
    get() {
      return {};
    },
  }),
};

describe('TwilioService', () => {
  let service: TwilioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwilioService, ConfigServiceProvider],
    }).compile();

    service = module.get<TwilioService>(TwilioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
