import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from '../profiles/profiles.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

const JwtServiceProvider = {
  provide: JwtService,
  useFactory: () => ({}),
};

const ProfileServiceProvider = {
  provide: ProfilesService,
  useFactory: () => ({}),
};

describe('AddressesController', () => {
  let controller: AddressesController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AddressesService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        ApiServiceProvider,
        JwtServiceProvider,
        ProfileServiceProvider,
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
