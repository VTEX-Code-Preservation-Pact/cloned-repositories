import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { diacriticSensitive } from 'src/shared/utils/diacritic-sensitive';
import { CitiesDto } from './dtos/cities.dto';
import { CityDto } from './dtos/city.dto';
import { City, CityModel } from './schemas/city.schema';

@Injectable()
export class CitiesService {
  private transaction: { transaction: any; '': any };
  constructor(@InjectModel(City.name) private cityModel: CityModel) {
    this.transaction = {
      transaction: this.cityModel.transaction,
      '': this.cityModel,
    };
  }

  getAll() {
    return this.cityModel.scan().exec();
  }

  getCity(city: string) {
    return this.cityModel
      .scan({
        citySearch: { contains: diacriticSensitive(city.toLowerCase()) },
      })
      .exec();
  }

  create(createCityDto: CityDto, trans: keyof typeof this.transaction = '') {
    return this.transaction[trans].create(createCityDto);
  }

  createMany(createCityDto: CitiesDto) {
    return this.cityModel.insertMany(createCityDto.cities);
  }
}
