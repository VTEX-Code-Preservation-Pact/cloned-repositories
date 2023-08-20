import { Test, TestingModule } from '@nestjs/testing';

import { AcceptanceHabeasDataController } from './acceptanceHabeasData.controller';
import { AcceptanceHabeasDataService } from './acceptanceHabeasData.service';

describe('HabeasDataController', () => {
  let controller: AcceptanceHabeasDataController;

  beforeEach(async () => {
    const acceptanceHabeasDataProvider = {
      provide: AcceptanceHabeasDataService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcceptanceHabeasDataController],
      providers: [acceptanceHabeasDataProvider],
    }).compile();

    controller = module.get<AcceptanceHabeasDataController>(
      AcceptanceHabeasDataController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
