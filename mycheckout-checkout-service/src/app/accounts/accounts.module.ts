import { Module } from '@nestjs/common';

import { AcceptanceHabeasData } from './habeasData/schemas/acceptanceHabeasData.schema';
import { AcceptanceHabeasDataController } from './habeasData/acceptanceHabeasData/acceptanceHabeasData.controller';
import { AcceptanceHabeasDataService } from './habeasData/acceptanceHabeasData/acceptanceHabeasData.service';
import { Account } from './schemas/account.schema';
import { AccountLink } from './accounts-links/schemas/account-link.schema';
import { AccountsController } from './accounts.controller';
import { AccountsLinksController } from './accounts-links/accounts-links.controller';
import { AccountsLinksService } from './accounts-links/accounts-links.service';
import { AccountsService } from './accounts.service';
import { CustomDynamooseModule } from 'src/shared/utils/dynamoose-module';
import { HabeasData } from './habeasData/schemas/habeasdata.schema';
import { HabeasDataController } from './habeasData/habeasData.controller';
import { HabeasDataService } from './habeasData/habeasData.service';
import { PaymentMethod } from './payment-methods/schemas/payment-method.schema';
import { PaymentMethodsController } from './payment-methods/payment-methods.controller';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { StylesController } from './styles/styles.controller';
import { StylesService } from './styles/styles.service';
import { UploadCSS } from './styles/uploadCssToS3';

@Module({
  imports: [
    CustomDynamooseModule.forFeature([
      AcceptanceHabeasData,
      Account,
      AccountLink,
      HabeasData,
      PaymentMethod,
    ]),
  ],
  controllers: [
    AcceptanceHabeasDataController,
    AccountsController,
    AccountsLinksController,
    HabeasDataController,
    PaymentMethodsController,
    StylesController,
  ],
  providers: [
    AcceptanceHabeasDataService,
    AccountsLinksService,
    AccountsService,
    HabeasDataService,
    PaymentMethodsService,
    StylesService,
    UploadCSS,
  ],
  exports: [
    AcceptanceHabeasDataService,
    AccountsLinksService,
    AccountsService,
    HabeasDataService,
    StylesService,
  ],
})
export class AccountsModule {}
