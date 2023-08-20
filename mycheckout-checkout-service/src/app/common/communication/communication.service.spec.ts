import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationService } from './communication.service';
import { InfobipService } from './infobip/infobip.service';
import { TwilioService } from './twilio/twilio.service';

const InfobipServiceProvider = {
  provide: InfobipService,
  useFactory: () => ({}),
};

const TwillioServiceProvide = {
  provide: TwilioService,
  useFactory: () => ({}),
};

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunicationService,
        TwillioServiceProvide,
        InfobipServiceProvider,
      ],
    }).compile();

    service = module.get<CommunicationService>(CommunicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
