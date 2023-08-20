import { Injectable } from '@nestjs/common';
import { CheckoutVTEXService } from './checkout/checkout.service';
import { CartVTEXService } from './cart/cart.service';
import { PaymentVTEXService } from './payment/payment.service';

@Injectable()
export class OrdersVTEXService {
  constructor(
    public checkout: CheckoutVTEXService,
    public cart: CartVTEXService,
    public payment: PaymentVTEXService,
  ) {}
}
