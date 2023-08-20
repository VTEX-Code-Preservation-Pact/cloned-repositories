import { TransactionQueue } from '../../../typings/vtex/order';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SQS from 'aws-sdk/clients/sqs';

@Injectable()
export class AwsService {
  private sqs: SQS;
  private queueNamePT: string;
  constructor(private readonly configService: ConfigService) {
    this.sqs = new SQS({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: 'us-west-2',
    });
    this.queueNamePT = this.configService.get('AWS_QUEUE_ORDER');
  }

  sendTransactionProcessorQueue(
    message: TransactionQueue | Partial<TransactionQueue>,
  ): Promise<SQS.SendMessageResult> {
    return new Promise((resolve, reject) => {
      const params: SQS.Types.SendMessageRequest = {
        MessageBody: JSON.stringify(message),
        MessageDeduplicationId: message.orderId,
        MessageGroupId: 'checkoutless-transaction',
        QueueUrl: `https://sqs.us-east-1.amazonaws.com/666555811597/${this.queueNamePT}.fifo`,
      };
      this.sqs.sendMessage(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
