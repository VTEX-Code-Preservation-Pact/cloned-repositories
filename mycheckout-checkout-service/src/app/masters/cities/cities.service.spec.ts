import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { CitiesService } from './cities.service';
import { City } from './schemas/city.schema';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const CityModel = {
      provide: getModelToken(City.name),
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService, CityModel],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
