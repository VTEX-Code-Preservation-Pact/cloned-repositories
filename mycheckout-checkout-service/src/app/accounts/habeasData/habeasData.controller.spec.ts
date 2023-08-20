import { Test, TestingModule } from '@nestjs/testing';
import { HabeasDataController } from './habeasData.controller';
import { HabeasDataService } from './habeasData.service';

describe('HabeasDataController', () => {
  let controller: HabeasDataController;

  beforeEach(async () => {
    const HabeasDataProvider = {
      provide: HabeasDataService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabeasDataController],
      providers: [HabeasDataProvider],
    }).compile();

    controller = module.get<HabeasDataController>(HabeasDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
