import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

const JwtServiceProvider = {
  provide: JwtService,
  useFactory: () => ({}),
};

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ProfilesService,
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        ApiServiceProvider,
        JwtServiceProvider,
        {
          provide: REQUEST,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
