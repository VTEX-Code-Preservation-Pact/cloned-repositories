import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CountriesService,
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
