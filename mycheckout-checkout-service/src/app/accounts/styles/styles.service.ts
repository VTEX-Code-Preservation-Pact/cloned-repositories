import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { Account, AccountModel } from '../schemas/account.schema';
import { NotFoundException } from '../../../shared/exceptions/not-found-exception';
import { ValidationException } from '../../../shared/exceptions/validation-exception';
import { BASE_STYLES, validateData } from './utils/validate';
import { StylesDto } from './dtos/Styles.dto';
import { UploadCSS } from './uploadCssToS3';

@Injectable()
export class StylesService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: AccountModel,
    private uploadCSS: UploadCSS,
  ) {}

  async save(customDto: StylesDto, accountName: string) {
    const account = await this.accountModel
      .findOne({ account: accountName })
      .exec();

    if (!account) {
      throw new NotFoundException();
    }

    try {
      await validateData(customDto.styles, BASE_STYLES);
    } catch (e) {
      throw new ValidationException(e.message, e.errors, customDto.styles);
    }

    const buttonText = customDto.buttonText;
    const stylesParse = JSON.parse(customDto.styles);
    const restore = customDto.restore;
    await this.uploadCSS.uploadFile(accountName, stylesParse, restore);

    account.set({
      styles: customDto.styles,
      buttonText,
    });

    await account.save();

    return account;
  }

  async findByAccount(accountName: string) {
    const account = await this.accountModel
      .findOne({ account: accountName })
      .exec();

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }
}
