import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationService } from '../communication/communication.service';
import { SMSService } from './sms.service';

const CommunicationServiceProvider = {
  provide: CommunicationService,
  useFactory: () => ({}),
};

describe('SmsService', () => {
  let service: SMSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SMSService, CommunicationServiceProvider],
    }).compile();

    service = module.get<SMSService>(SMSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
