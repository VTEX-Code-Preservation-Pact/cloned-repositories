import { Injectable } from '@nestjs/common';
import { InfobipService } from './infobip/infobip.service';
import { TwilioService } from './twilio/twilio.service';

@Injectable()
export class CommunicationService {
  public readonly twilio;
  public readonly infobip;
  constructor(twilioService: TwilioService, infobipService: InfobipService) {
    this.twilio = twilioService;
    this.infobip = infobipService;
  }
}
