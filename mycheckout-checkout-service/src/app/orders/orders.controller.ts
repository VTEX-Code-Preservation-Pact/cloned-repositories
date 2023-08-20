import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { ProcessTransactionDto } from './dtos/processTransaction.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/v2')
  create(@Body() createOrderDto: CreateOrderDto, @Headers() headers) {
    return this.ordersService.create({
      ...createOrderDto,
      authToken: headers?.vtexidclientautcookie,
    });
  }

  @Post('v2/process-transaction')
  processTransaction(@Body() processTransactionDto: ProcessTransactionDto) {
    return this.ordersService.processTransaction(processTransactionDto);
  }

  @Get('/payment-process')
  async paymentProcess(
    @Query('orderId') id: number,
    @Query('an') an: string,
    @Headers() headers,
  ) {
    return this.ordersService.paymentProcess(
      an,
      String(id),
      headers?.vtexidclientautcookie,
    );
  }
}
