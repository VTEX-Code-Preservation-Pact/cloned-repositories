import { HttpException, HttpStatus } from '@nestjs/common';
import { PaymentProvider } from '../payment-provider';
import { ValidateCreditDto } from './dto/validateCredit.dto';

export class CreditPayProvider extends PaymentProvider {
  async authorizePayment(): Promise<void> {
    const {
      profile: { email },
      totalizers: { totals },
    } = this.ctx.processTransactionDto;

    const validateCreditDto = new ValidateCreditDto();
    validateCreditDto.email = email;
    validateCreditDto.totals = totals;

    const approvedCredit = await this.services.creditPayService.validateCredit(
      validateCreditDto,
    );

    if (approvedCredit.approvedCredit === 0) {
      throw new HttpException('Credit Limit Exceeded', HttpStatus.BAD_REQUEST);
    }

    await this.services.creditPayService.chargeCredit(validateCreditDto);

    this.ctx.transaction = {
      transactionId: 'credit',
    };
  }
  capturePayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  refundPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  cancelPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rollbackPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
