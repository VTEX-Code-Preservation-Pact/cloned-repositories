import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { createPaymentMethodDto } from './dtos/createPaymentMethod.dto';

@Controller('accounts/payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @Get()
  findByAccount(@Query('an') accountName: string) {
    return this.paymentMethodsService.findByAccount(accountName);
  }

  @Post()
  createPaymentMethod(
    @Body() paymentMethod: createPaymentMethodDto,
    @Query('an') an: string,
  ) {
    return this.paymentMethodsService.createPaymentMethod(paymentMethod, an);
  }
}
