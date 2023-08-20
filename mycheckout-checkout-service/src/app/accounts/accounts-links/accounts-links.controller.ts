import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { AccountsLinksService } from './accounts-links.service';
import { CreateAccountLinkDto } from './dtos/createAccountLink.dto';
import { UpdateAccountLinkDto } from './dtos/updateAccountLink.dto';

@Controller('accounts/links')
export class AccountsLinksController {
  constructor(private accountsLinksService: AccountsLinksService) {}

  @Post()
  linkRequest(@Body() createAccountLinkDto: CreateAccountLinkDto) {
    return this.accountsLinksService.linkRequest(createAccountLinkDto);
  }

  @Get(':account')
  getLinkRequest(@Param('account') account: string) {
    return this.accountsLinksService.getLinkRequest(account);
  }

  @Put('')
  linkUpdate(@Body() accountLinkDto: UpdateAccountLinkDto) {
    return this.accountsLinksService.linkUpdate(
      accountLinkDto.id,
      accountLinkDto.status,
    );
  }

  @Delete(':id')
  deleteLink(@Param('id') id: string) {
    return this.accountsLinksService.deleteLink(id);
  }
}
