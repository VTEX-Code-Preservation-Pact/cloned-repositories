import { getModelToken } from 'nestjs-dynamoose';
import { Test, TestingModule } from '@nestjs/testing';

import { AcceptanceHabeasData } from '../schemas/acceptanceHabeasData.schema';
import { AcceptanceHabeasDataService } from './acceptanceHabeasData.service';

describe('HabeasDataService', () => {
  let service: AcceptanceHabeasDataService;

  beforeEach(async () => {
    const acceptanceHabeasDataModel = {
      provide: getModelToken(AcceptanceHabeasData.name),
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptanceHabeasDataService, acceptanceHabeasDataModel],
    }).compile();

    service = module.get<AcceptanceHabeasDataService>(AcceptanceHabeasDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
