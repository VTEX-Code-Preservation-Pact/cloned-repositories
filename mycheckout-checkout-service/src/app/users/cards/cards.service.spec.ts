import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { Card } from './schemas/cards.schema';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const CardModel = {
      provide: getModelToken(Card.name),
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService, CardModel],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
