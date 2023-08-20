import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsLinksService } from '../../accounts/accounts-links/accounts-links.service';
import { AccountsService } from '../../accounts/accounts.service';
import { ProfileSystemVTEXService } from '../../vtex/profile-system/profile-system.service';
import { Address } from '../addresses/schemas/address.schema';
import { Card } from '../cards/schemas/cards.schema';
import { UsersService } from '../users.service';
import { ProfilesService } from './profiles.service';
import { Profile } from './schemas/profile.schema';

const ProfileModel = {
  provide: getModelToken(Profile.name),
  useFactory: () => ({}),
};
const AddressModel = {
  provide: getModelToken(Address.name),
  useFactory: () => ({}),
};
const CardModel = {
  provide: getModelToken(Card.name),
  useFactory: () => ({}),
};
const UserServiceProvider = {
  provide: UsersService,
  useFactory: () => ({}),
};
const AccountServiceProvider = {
  provide: AccountsService,
  useFactory: () => ({}),
};
const AccountLinkServiceProvider = {
  provide: AccountsLinksService,
  useFactory: () => ({}),
};
const VtexProfileSystemServiceProvider = {
  provide: ProfileSystemVTEXService,
  useFactory: () => ({}),
};

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        ProfileModel,
        AddressModel,
        CardModel,
        UserServiceProvider,
        AccountServiceProvider,
        AccountLinkServiceProvider,
        VtexProfileSystemServiceProvider,
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
