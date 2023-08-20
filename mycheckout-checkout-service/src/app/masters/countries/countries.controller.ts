import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesDto } from './dtos/countries.dto';

@Controller('masters/countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  getAll() {
    return this.countriesService.getAll();
  }

  @Post()
  create(@Body() createCountriesDto: CountriesDto) {
    return this.countriesService.create(createCountriesDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.countriesService.delete(id);
  }

  @Get('cities')
  async cities(@Query('city') city: string): Promise<any> {
    return this.countriesService.getCities(city.trim());
  }
}
