import { HttpModule, Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago/mercadopago.service';
import { PaymentProvidersService } from './payment-providers.service';
import { CreditPayController } from './credit-pay/credit-pay.controller';
import { CreditPayService } from './credit-pay/credit-pay.service';
import { Credit } from './credit-pay/schema/credit.schema';
import { CustomDynamooseModule } from 'src/shared/utils/dynamoose-module';

@Module({
  imports: [HttpModule, CustomDynamooseModule.forFeature([Credit])],
  providers: [MercadopagoService, PaymentProvidersService, CreditPayService],
  exports: [PaymentProvidersService],
  controllers: [CreditPayController],
})
export class PaymentProvidersModule {}
