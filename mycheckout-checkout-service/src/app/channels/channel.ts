import { OrderContext } from '../../typings/OrderContext';
import { OrderModel } from '../orders/schemas/order.schema';
import { CardDto } from '../users/cards/dtos/card.dto';
import { ChannelServices } from './types/services.type';

export abstract class Channel {
  constructor(
    protected ctx: OrderContext,
    protected services: ChannelServices,
  ) {}

  protected findAccount(accountName: string) {
    const { accountsServices } = this.services;

    return accountsServices.get({
      account: accountName,
    });
  }

  protected findProfile(email: string, accountName: string, headers: string) {
    const { profilesService } = this.services;

    return profilesService.getProfileInfo(email, accountName, headers);
  }

  protected findProfileById(id: string) {
    const { profilesService } = this.services;
    return profilesService.getById(id);
  }

  protected findAddress(addressId: string) {
    const { addressesService } = this.services;

    return addressesService.get(addressId);
  }

  protected findCard() {
    const { cardsServices } = this.services;
    return cardsServices.get(this.ctx.dataDto.payment.cardId);
  }

  protected createCard() {
    const { cardsServices } = this.services;
    const {
      processTransactionDto: { payment },
      transaction: { cardContent, internalCardContent, aliasCC, aliasCVV },
      profile,
    } = this.ctx;
    return cardsServices.create(
      {
        number: payment.number,
        franchise: payment.franchise,
        token: payment.token,
        gateway: payment.gateway,
        bin: payment.bin,
        paymentSystem: payment.paymentSystem,
        holderName: payment.holderName,
        expirationDate: payment.expirationDate,
        cardNumber: payment.cardNumber,
        aliasCC: aliasCC,
        aliasCVV: aliasCVV,
        holderDocument: payment.holderDocument,
        cardContent,
        internalCardContent,
      },
      profile,
    );
  }

  protected updateCardData(data: Partial<CardDto>) {
    const { cardsServices } = this.services;
    const {
      processTransactionDto: { payment },
    } = this.ctx;

    return cardsServices.update(data, payment.cardId);
  }

  abstract prepare(): Promise<void>;
  abstract createOrder(orderModel: OrderModel): Promise<void>;
  abstract prepareProcessTransaction(orderModel: OrderModel): Promise<void>;
  abstract onProcessTransaction(): Promise<void>;
  abstract cancelOrderProcessTransaction(log?: string): Promise<void>;
  abstract cancelOrder(orderModel: OrderModel, log?: string): Promise<void>;
}
