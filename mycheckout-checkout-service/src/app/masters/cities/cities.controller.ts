import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dtos/cities.dto';
import { CityDto } from './dtos/city.dto';

@Controller('masters/cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  getAll() {
    return this.citiesService.getAll();
  }

  @Get()
  getCity(city: string) {
    return this.citiesService.getCity(city);
  }

  @Post('many')
  createMany(@Body() createCitiesDto: CitiesDto) {
    return this.citiesService.createMany(createCitiesDto);
  }

  @Post('')
  create(@Body() createCityDto: CityDto) {
    return this.citiesService.create(createCityDto);
  }
}
