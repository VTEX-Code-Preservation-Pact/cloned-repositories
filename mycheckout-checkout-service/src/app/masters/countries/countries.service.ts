import { Injectable } from '@nestjs/common';
import { transaction } from 'dynamoose';
import { InjectModel } from 'nestjs-dynamoose';
import { splitArrayIntoChunksOfLen } from 'src/shared/utils/data-array';
import { diacriticSensitive } from '../../../shared/utils/diacritic-sensitive';
import { CitiesService } from '../cities/cities.service';
import { CountriesDto } from './dtos/countries.dto';
import { Country, CountryModel } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: CountryModel,
    protected citiesService: CitiesService,
  ) {}

  getAll() {
    return this.countryModel.scan().exec();
  }

  async create(createCountriesDto: CountriesDto) {
    const transactions = [];
    const countries = createCountriesDto.countries.map((country) => {
      const states = [];
      Object.entries(country.states).forEach(([state, c]) => {
        const cities = [];
        Object.entries(c).forEach(([city, postalCode]) => {
          cities.push({
            city: city,
            city_id: postalCode,
          });
          transactions.push(
            this.citiesService.create(
              {
                city: city,
                citySearch: diacriticSensitive(city.toLowerCase()),
                state: state,
                stateSearch: diacriticSensitive(state.toLowerCase()),
                country: country.country,
                countrySearch: diacriticSensitive(
                  country.country.toLowerCase(),
                ),
                phone: country.phone,
                iso: country.iso,
                postal_code: postalCode,
              },
              'transaction',
            ),
          );
        });
        states.push({ state: state, cities: cities });
      });
      country.states = states;
      transactions.push(this.countryModel.transaction.create(country));
      return country;
    });
    await Promise.all(splitArrayIntoChunksOfLen(transactions, 25, transaction));
    return countries;
  }

  async delete(id: string) {
    return (await this.countryModel.get(id))?.delete();
  }

  async getCities(city) {
    return this.citiesService.getCity(city);
  }
}
