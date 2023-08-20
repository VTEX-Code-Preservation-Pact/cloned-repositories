import { Body, Controller, Post } from '@nestjs/common';
import { CreditPayService } from './credit-pay.service';
import { CreateUserCreditDto } from './dto/createUserCredit.dto';
import { ValidateCreditDto } from './dto/validateCredit.dto';

@Controller('credit-pay')
export class CreditPayController {
  constructor(private creditPayService: CreditPayService) {}

  @Post('/user')
  createUserCredit(@Body() createUserDto: CreateUserCreditDto) {
    return this.creditPayService.createUserCredit(createUserDto);
  }

  @Post('/validate-credit')
  validateCredit(@Body() validateCreditDto: ValidateCreditDto) {
    return this.creditPayService.validateCredit(validateCreditDto);
  }
}
