import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { PaymentProvidersModule } from '../payment-providers/payment-providers.module';
import { UsersModule } from '../users/users.module';
import { VtexModule } from '../vtex/vtex.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import { ChannelsModule } from '../channels/channels.module';
import { OmsModule } from '../oms/oms.module';
import { CustomDynamooseModule } from 'src/shared/utils/dynamoose-module';

@Module({
  imports: [
    CustomDynamooseModule.forFeature([Order]),
    VtexModule,
    UsersModule,
    AccountsModule,
    PaymentProvidersModule,
    ChannelsModule,
    OmsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersService],
})
export class OrdersModule {}
