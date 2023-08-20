import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { HabeasDataService } from './habeasData.service';
import { HabeasData } from './schemas/habeasdata.schema';

describe('HabeasDataService', () => {
  let service: HabeasDataService;

  beforeEach(async () => {
    const HabeasDataModel = {
      provide: getModelToken(HabeasData.name),
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [HabeasDataService, HabeasDataModel],
    }).compile();

    service = module.get<HabeasDataService>(HabeasDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
