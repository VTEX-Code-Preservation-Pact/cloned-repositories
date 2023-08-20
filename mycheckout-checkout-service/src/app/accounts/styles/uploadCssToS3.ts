import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { customCss } from './utils/customCss';
import { defaultCss } from './utils/defaultCss';

@Injectable()
export class UploadCSS {
  private S3: any;
  private cloudfront: any;
  private enviroment: string;
  constructor(private readonly configService: ConfigService) {
    const config = {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    };

    this.S3 = new AWS.S3(config);
    this.cloudfront = new AWS.CloudFront(config);
    this.enviroment = process.env.NODE_ENV
      ? process.env.NODE_ENV
      : 'development';
  }

  async uploadFile(account: string, styleCustom: any, restore = true) {
    const file = `${account}-vtex-mc.css`;
    const data = restore ? defaultCss() : customCss(styleCustom);

    fs.writeFile(file, data, (err) => {
      if (err) throw err;
      const params = {
        Bucket: this.configService.get('AWS_STYLES_BUCKET'),
        Key: `${file}`,
        Body: fs.createReadStream(file),
        ContentType: 'text/css; charset=utf-8',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      };
      this.S3.upload(params, function (s3Err, dat) {
        if (s3Err) throw s3Err;
        return dat.Location;
      });
    });

    if (this.enviroment !== 'development') {
      await this.invalitadeCache(file);
    }
  }

  async invalitadeCache(key: string) {
    const params = {
      DistributionId: this.configService.get('AWS_STYLES_CF_DISTRIBUTION_ID'),
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: {
          Quantity: 1,
          Items: [`/${key}`],
        },
      },
    };

    this.cloudfront.createInvalidation(params, function (err, data) {
      if (err) throw err;
      return data;
    });
  }
}
