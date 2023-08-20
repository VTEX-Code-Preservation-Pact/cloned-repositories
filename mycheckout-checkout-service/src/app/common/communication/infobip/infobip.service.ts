import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfobipService {
  private readonly headers;
  private readonly url;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {
    this.url = `https://jxvyj.api.infobip.com/sms/2/text/advanced`;
    this.headers = {
      Authorization: `App ${this.configService.get('INFOBIP_APP_KEY')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  sms(data) {
    return this.httpClient
      .post(
        this.url,
        {
          messages: [
            {
              from: 'InfoSMS',
              destinations: [
                {
                  to: data.to,
                },
              ],

              text: data.body,
            },
          ],
        },
        { headers: this.headers },
      )
      .toPromise()
      .catch((e) => console.log('SMS', e));
  }
}
