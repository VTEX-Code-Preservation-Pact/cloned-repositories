import i18nConfig from 'src/config/i18n';
import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './app/health/health.controller';
import { AccountsModule } from './app/accounts/accounts.module';
import { UsersModule } from './app/users/users.module';
import { MastersModule } from './app/masters/masters.module';
import { OrdersModule } from './app/orders/orders.module';
import { VtexModule } from './app/vtex/vtex.module';
import { PaymentProvidersModule } from './app/payment-providers/payment-providers.module';
import { CommonModule } from './app/common/common.module';
import { ChannelsModule } from './app/channels/channels.module';
import { OmsModule } from './app/oms/oms.module';
import configuration from './config/configuration';
import { AllResponsesInterceptor } from './shared/responses/all-responses.interceptor';
import { AllExceptionsFilter } from './shared/responses/all-exceptions.filter';
import { ExistsRule } from './shared/validation/rules/exists.rule';
import dynamodbConfig from './config/dynamodb';
import { CustomDynamooseModule } from './shared/utils/dynamoose-module';

export const environment = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';

export const isContainer = process.env.CONTAINER == 'docker';

@Module({
  imports: [
    /*General Modules*/
    CustomDynamooseModule.forRootAsync(dynamodbConfig()),
    ConfigModule.forRoot({
      ...(isContainer
        ? {
            envFilePath: ['/config/.env'],
            load: [configuration],
          }
        : {
            envFilePath: ['.env.local'],
          }),
      isGlobal: true,
    }),
    I18nModule.forRoot(i18nConfig()),
    /*Internal Modules*/
    OrdersModule,
    VtexModule,
    AccountsModule,
    UsersModule,
    MastersModule,
    PaymentProvidersModule,
    CommonModule,
    ChannelsModule,
    OmsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AllResponsesInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ExistsRule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
