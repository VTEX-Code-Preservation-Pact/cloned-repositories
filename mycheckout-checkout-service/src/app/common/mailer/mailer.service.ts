import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private readonly url =
    'http://mailservice.vtex.com.br/api/mail-service/pvt/sendmail?an=briancarmona';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const url = this.configService.get('MAIL_SERVICE_HOST');
    this.url = url && url != '' ? url : this.url;
  }

  notify(data): Promise<any> {
    const headers = {
      'X-VTEX-API-AppKey': this.configService.get('MAILER_VTEX_APP_KEY'),
      'X-VTEX-API-AppToken': this.configService.get('MAILER_VTEX_APP_TOKEN'),
    };

    return this.httpService
      .post(this.url, data, { headers: headers })
      .toPromise();
  }
}
