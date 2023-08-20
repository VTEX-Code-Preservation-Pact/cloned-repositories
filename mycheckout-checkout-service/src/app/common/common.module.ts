import { Global, HttpModule, Module } from '@nestjs/common';
import { AwsService } from './aws/aws.service';
import { MailerService } from './mailer/mailer.service';
import { SMSService } from './sms/sms.service';
import { CommunicationModule } from './communication/communication.module';

@Global()
@Module({
  imports: [HttpModule, CommunicationModule],
  providers: [AwsService, MailerService, SMSService],
  exports: [AwsService, SMSService, MailerService],
})
export class CommonModule {}
