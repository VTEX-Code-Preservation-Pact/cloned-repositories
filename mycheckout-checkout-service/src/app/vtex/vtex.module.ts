import { HttpModule, Module } from '@nestjs/common';
import { OrdersVTEXService } from './orders/orders.service';
import { ProfileSystemVTEXService } from './profile-system/profile-system.service';
import { AccountsModule } from '../accounts/accounts.module';
import { CheckoutVTEXService } from './orders/checkout/checkout.service';
import { CartVTEXService } from './orders/cart/cart.service';
import { PaymentVTEXService } from './orders/payment/payment.service';

@Module({
  imports: [HttpModule, AccountsModule],
  providers: [
    OrdersVTEXService,
    ProfileSystemVTEXService,
    CheckoutVTEXService,
    CartVTEXService,
    PaymentVTEXService,
  ],
  exports: [OrdersVTEXService, ProfileSystemVTEXService],
})
export class VtexModule {}
