import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHabeasDataDto } from './dtos/createHabeasData.dto';
import { HabeasDataService } from './habeasData.service';

@Controller('habeasdata')
export class HabeasDataController {
  constructor(private habeasdataService: HabeasDataService) {}

  @Post()
  habeasdataCreate(@Body() habeasdataDto: CreateHabeasDataDto) {
    return this.habeasdataService.create(habeasdataDto);
  }

  @Get()
  getByActiveState() {
    return this.habeasdataService.getByActiveState();
  }
}
