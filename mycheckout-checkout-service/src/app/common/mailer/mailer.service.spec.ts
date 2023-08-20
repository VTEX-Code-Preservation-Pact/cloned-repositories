import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';

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

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, ConfigServiceProvider, HttpServiceProvider],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
