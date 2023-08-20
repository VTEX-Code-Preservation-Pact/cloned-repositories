import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateAcceptanceHabeasDataDto } from '../dtos/createAcceptanceHabeasData.dto';
import { AcceptanceHabeasDataService } from './acceptanceHabeasData.service';

@Controller('habeasdata/acceptance')
export class AcceptanceHabeasDataController {
  constructor(
    private acceptanceHabeasDataService: AcceptanceHabeasDataService,
  ) {}

  @Post()
  create(@Body() acceptanceHabeasDataDto: CreateAcceptanceHabeasDataDto) {
    return this.acceptanceHabeasDataService.create(acceptanceHabeasDataDto);
  }

  @Get(':email/:version')
  getByEmail(
    @Param('email') email: string,
    @Param('version', ParseIntPipe) version: number,
  ) {
    return this.acceptanceHabeasDataService.getByEmail(email, version);
  }
}
