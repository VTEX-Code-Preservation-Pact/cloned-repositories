import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { CreateUserCreditDto } from './dto/createUserCredit.dto';
import { ValidateCreditDto } from './dto/validateCredit.dto';
import { Credit, CreditDoc, CreditModel } from './schema/credit.schema';

@Injectable()
export class CreditPayService {
  constructor(@InjectModel(Credit.name) private creditModel: CreditModel) {}

  async createUserCredit(createUserCreditDto: CreateUserCreditDto) {
    let userCredit: CreditDoc = await this.creditModel
      .findOne({
        email: createUserCreditDto.email,
      })
      .exec();

    if (!userCredit) {
      userCredit = this.creditModel.build({
        email: createUserCreditDto.email,
        creditLimit: createUserCreditDto.creditLimit,
      });
    } else {
      userCredit.set({
        creditLimit: createUserCreditDto.creditLimit,
      });
    }

    return userCredit.save();
  }

  async chargeCredit(validateCreditDto: ValidateCreditDto) {
    const userCredit: CreditDoc = await this.creditModel
      .findOne({
        email: validateCreditDto.email,
      })
      .exec();

    userCredit.set({
      creditLimit: userCredit.creditLimit - validateCreditDto.totals,
    });

    return userCredit.save();
  }

  private calculateInstallments(total: number) {
    if (total <= 100000) {
      return 3;
    } else if (total > 100000 && total < 1000000) {
      return 12;
    } else {
      return 24;
    }
  }

  async validateCredit(validateCreditDto: ValidateCreditDto) {
    const userCredit = await this.creditModel
      .findOne({
        email: validateCreditDto.email,
      })
      .exec();

    if (!userCredit) {
      return {
        approvedCredit: 0,
        maxInstallments: 0,
      };
    }

    if (userCredit.creditLimit - validateCreditDto.totals > 0) {
      return {
        approvedCredit: validateCreditDto.totals,
        maxInstallments: this.calculateInstallments(validateCreditDto.totals),
      };
    }

    return {
      approvedCredit: 0,
      maxInstallments: 0,
    };
  }
}
