import { AccountsService } from '../../accounts/accounts.service';
import { AddressesService } from '../../users/addresses/addresses.service';
import { CardsService } from '../../users/cards/cards.service';
import { ProfilesService } from '../../users/profiles/profiles.service';

export type ChannelServices = {
  profilesService: ProfilesService;
  addressesService: AddressesService;
  accountsServices: AccountsService;
  cardsServices: CardsService;
};

export enum ChannelName {
  Kuikpay = 'kuikpay',
  Checkout = 'checkout',
  Whatsapp = 'whatsapp',
}
