import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CitiesService,
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
