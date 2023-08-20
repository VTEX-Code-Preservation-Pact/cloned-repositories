import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesDto } from './dtos/Styles.dto';

@Controller('accounts/styles')
export class StylesController {
  constructor(private stylesService: StylesService) {}

  @Post()
  save(@Body() StylesDto: StylesDto, @Query('an') accountName: string) {
    return this.stylesService.save(StylesDto, accountName);
  }

  @Get()
  findByAccount(@Query('an') accountName: string) {
    return this.stylesService.findByAccount(accountName);
  }
}
