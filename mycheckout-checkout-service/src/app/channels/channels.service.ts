import { Injectable } from '@nestjs/common';
import { OrderContext } from '../../typings/OrderContext';
import { AccountsService } from '../accounts/accounts.service';
import { AddressesService } from '../users/addresses/addresses.service';
import { CardsService } from '../users/cards/cards.service';
import { ProfilesService } from '../users/profiles/profiles.service';
import { Channel } from './channel';
import { KuikpayChannel } from './kuikpay';
import { ChannelName, ChannelServices } from './types/services.type';
import { WhatsappChannel } from './whatsapp';

@Injectable()
export class ChannelsService {
  private services: ChannelServices;
  constructor(
    profilesService: ProfilesService,
    addressesService: AddressesService,
    accountsServices: AccountsService,
    cardsServices: CardsService,
  ) {
    this.services = {
      profilesService,
      addressesService,
      accountsServices,
      cardsServices,
    };
  }

  createChannel(channel: string, ctx: OrderContext): Channel {
    switch (channel) {
      case ChannelName.Kuikpay:
        return new KuikpayChannel(ctx, this.services);
      case ChannelName.Whatsapp:
        return new WhatsappChannel(ctx, this.services);
      case ChannelName.Checkout:
        break;
      default:
        break;
    }
  }
}
