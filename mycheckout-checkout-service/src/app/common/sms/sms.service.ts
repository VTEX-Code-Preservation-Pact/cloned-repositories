import { Injectable } from '@nestjs/common';
import { CommunicationService } from '../communication/communication.service';

@Injectable()
export class SMSService {
  constructor(private readonly communication: CommunicationService) {}
  notify(data): Promise<any> {
    return this.communication.twilio.sms(data);
  }
}
