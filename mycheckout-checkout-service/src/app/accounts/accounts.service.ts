import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { NotFoundException } from '../../shared/exceptions/not-found-exception';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { Account, AccountDoc, AccountModel } from './schemas/account.schema';
import { StylesSchema, TextButton } from './styles/utils/stylesBase';
import { UploadCSS } from './styles/uploadCssToS3';
import { HabeasData } from './habeasData/schemas/habeasdata.schema';
import { HabeasDataService } from './habeasData/habeasData.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    @Inject(forwardRef(() => PaymentMethodsService))
    @Inject(HabeasData.name)
    private accountModel: AccountModel,
    private habeasDataService: HabeasDataService,
    private paymentMethods: PaymentMethodsService,
    private uploadCSS: UploadCSS,
  ) {}
  async save(accountDto: CreateAccountDto) {
    const existAccount = await this.accountModel
      .findOne({ account: accountDto.account })
      .exec();

    if (existAccount) {
      existAccount.set({
        paymentMethodId: accountDto.paymentMethodId,
        cvcRequired:
          accountDto.cvcRequired === true || accountDto.cvcRequired === false
            ? accountDto.cvcRequired
            : existAccount.cvcRequired,
        buttonMessage:
          accountDto.buttonMessage || accountDto.buttonMessage === ''
            ? accountDto.buttonMessage
            : existAccount.buttonMessage,
        visualization: accountDto.visualization || existAccount.visualization,
      });
      return existAccount.save();
    } else {
      const account = this.accountModel.build({
        account: accountDto.account,
        cvcRequired: accountDto.cvcRequired,
        paymentMethodId: accountDto.paymentMethodId,
        visualization: accountDto.visualization,
        buttonMessage: accountDto.buttonMessage,
        buttonText: TextButton,
        styles: JSON.stringify(StylesSchema),
        createdAt: Date.now(),
      });

      await this.uploadCSS.uploadFile(accountDto.account, StylesSchema);
      return await account.save();
    }
  }

  async toggleGoogleAnalytics(an: string) {
    const account = await this.accountModel.findOne({ account: an }).exec();

    if (!account) {
      throw new NotFoundException();
    }

    account.set({
      hasGoogleAnalytics: !account.hasGoogleAnalytics,
    });

    return account.save();
  }

  async get(query: Partial<AccountDoc>) {
    const account = await this.accountModel.findOne(query).exec();

    if (!account) {
      throw new NotFoundException();
    }

    let isConfigured = true;
    const pms = await this.paymentMethods.findByAccount(query.account);
    if (pms.count > 0 && isConfigured) {
      const resultado = pms.find((pm) => pm.isActive === true);
      if (!resultado) isConfigured = false;
    } else {
      isConfigured = false;
    }

    return {
      ...account,
      isConfigured,
    } as AccountDoc;
  }

  async getMany(query) {
    return this.accountModel.scan(query).exec();
  }

  async getStoreFrontSettings(an: string) {
    const account = await this.accountModel.findOne({ account: an }).exec();

    const { url, version } = await this.habeasDataService.getByActiveState();

    if (!account) {
      throw new NotFoundException();
    }

    let isConfigured = true;
    const pms = await this.paymentMethods.findByAccount(an);
    if (pms.count > 0 && isConfigured) {
      const resultado = pms.find((pm) => pm.isActive === true);
      if (!resultado) isConfigured = false;
    } else {
      isConfigured = false;
    }

    return {
      cvcRequired: account.cvcRequired,
      paymentSystem: account.paymentMethodId,
      visualization: account.visualization,
      buttonMessage: account.buttonMessage,
      hasGoogleAnalytics: account.hasGoogleAnalytics || false,
      isTracking: account.isTracking || false,
      trackingKey: account.trackingKey || null,
      isConfigured: isConfigured,
      PaymentMethod: pms,
      styles: account.styles ? account.styles : JSON.stringify(StylesSchema),
      text: account.buttonText,
      habeasDataInformation: {
        url,
        version,
      },
      additionalData: account.additionalData,
    };
  }
}
