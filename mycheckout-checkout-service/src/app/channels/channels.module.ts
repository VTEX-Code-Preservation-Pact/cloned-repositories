import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';
import { ChannelsService } from './channels.service';

@Module({
  providers: [ChannelsService],
  imports: [UsersModule, AccountsModule],
  exports: [ChannelsService],
})
export class ChannelsModule {}
