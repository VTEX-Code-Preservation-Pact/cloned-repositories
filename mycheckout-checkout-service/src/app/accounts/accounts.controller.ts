import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/createAccount.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  save(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.save(createAccountDto);
  }

  @Get()
  findByAccount(@Query('an') an: string) {
    return this.accountsService.get({ account: an });
  }

  @Post('toggleGoogleAnalytics')
  toggleGoogleAnalytics(@Query('an') an: string) {
    return this.accountsService.toggleGoogleAnalytics(an);
  }

  @Get('storefront')
  getStoreFrontSettings(@Query('an') account: string) {
    return this.accountsService.getStoreFrontSettings(account);
  }
}
