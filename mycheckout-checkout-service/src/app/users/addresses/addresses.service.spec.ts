import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from '../profiles/profiles.service';
import { AddressesService } from './addresses.service';
import { Address } from './schemas/address.schema';

const ProfileServiceProvider = {
  provide: ProfilesService,
  useFactory: () => ({}),
};

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(async () => {
    const AddressModel = {
      provide: getModelToken(Address.name),
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService, AddressModel, ProfileServiceProvider],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
