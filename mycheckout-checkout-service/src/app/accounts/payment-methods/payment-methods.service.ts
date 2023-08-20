import { AccountsService } from '../../accounts/accounts.service';
import { ApiResponse } from '../../../shared/responses';
import { Injectable, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import {
  PaymentMethodModel,
  PaymentMethod,
} from './schemas/payment-method.schema';
import { createPaymentMethodDto } from './dtos/createPaymentMethod.dto';
import { InjectModel } from 'nestjs-dynamoose';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: PaymentMethodModel,
    @Inject(forwardRef(() => AccountsService))
    private accountService: AccountsService,
  ) {}

  async findByAccount(accountName: string) {
    return await this.paymentMethodModel
      .query({ accountName: accountName })
      .exec();
  }

  async createPaymentMethod(payment: createPaymentMethodDto, an: string) {
    const account = await this.accountService.get({ account: an });
    if (!account) {
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);
    } else {
      if (payment.id) {
        const paymentsMethods = await this.paymentMethodModel.get(payment.id);
        if (paymentsMethods) {
          paymentsMethods.set(payment);
          return paymentsMethods.save();
        } else {
          return this.paymentMethodModel.build(payment).save();
        }
      } else {
        return this.paymentMethodModel.build(payment).save();
      }
    }
  }
}
