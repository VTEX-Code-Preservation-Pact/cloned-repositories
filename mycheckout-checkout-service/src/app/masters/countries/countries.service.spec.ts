import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { CountriesService } from './countries.service';
import { Country } from './schemas/country.schema';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const CountryModel = {
      provide: getModelToken(Country.name),
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService, CountryModel],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
