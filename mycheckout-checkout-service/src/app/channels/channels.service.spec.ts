import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { AddressesService } from '../users/addresses/addresses.service';
import { CardsService } from '../users/cards/cards.service';
import { ProfilesService } from '../users/profiles/profiles.service';
import { ChannelsService } from './channels.service';

const AddressServiceProvider = {
  provide: AddressesService,
  useFactory: () => ({}),
};
const ProfilesServiceProvider = {
  provide: ProfilesService,
  useFactory: () => ({}),
};

const CardsServiceProvider = {
  provide: CardsService,
  useFactory: () => ({}),
};

const AccountServiceProvider = {
  provide: AccountsService,
  useFactory: () => ({}),
};

describe('ChannelsService', () => {
  let service: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        AddressServiceProvider,
        ProfilesServiceProvider,
        CardsServiceProvider,
        AccountServiceProvider,
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
