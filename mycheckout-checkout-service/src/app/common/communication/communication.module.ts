import { HttpModule, Module } from '@nestjs/common';
import { TwilioService } from './twilio/twilio.service';
import { InfobipService } from './infobip/infobip.service';
import { CommunicationService } from './communication.service';

@Module({
  imports: [HttpModule],
  providers: [TwilioService, InfobipService, CommunicationService],
  exports: [CommunicationService],
})
export class CommunicationModule {}
