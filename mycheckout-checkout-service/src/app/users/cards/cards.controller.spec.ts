import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from '../profiles/profiles.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

const JwtServiceProvider = {
  provide: JwtService,
  useFactory: () => ({}),
};

const ProfileServiceProvider = {
  provide: ProfilesService,
  useFactory: () => ({}),
};

describe('CardsController', () => {
  let controller: CardsController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CardsService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        ApiServiceProvider,
        JwtServiceProvider,
        ProfileServiceProvider,
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
