import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly phone;
  private readonly client;
  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    this.phone = this.configService.get('TWILIO_PHONE_NUMBER');
    this.client = twilio(accountSid, authToken);
  }

  sms(data) {
    return this.client.messages
      .create({
        body: data.body,
        from: this.phone,
        to: data.to,
      })
      .catch((e) => console.log('SMS', e));
  }
}
