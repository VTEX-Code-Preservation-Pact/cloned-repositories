import { AccountDoc } from '../../accounts/schemas/account.schema';
import { OrderDoc, OrderModel } from '../../orders/schemas/order.schema';
import { PaymentMethodName } from '../../payment-providers/types/payment-providers.type';
import { AddressDoc } from '../../users/addresses/schemas/address.schema';
import { ProfileDoc } from '../../users/profiles/schemas/profile.schema';
import { NotFoundException } from '../../../shared/exceptions/not-found-exception';
import { Channel } from '../channel';
import { decrypt } from 'src/shared/utils/encription';

export class StandardChannel extends Channel {
  async prepare(): Promise<void> {
    const {
      dataDto: {
        profile: { email },
        account: { accountName },
        shipping: { addressId, logisticsInfo },
      },
      headers,
    } = this.ctx;

    const promises: [
      Promise<ProfileDoc>,
      Promise<AddressDoc> | AddressDoc,
      Promise<AccountDoc>,
      Promise<void>,
    ] = [
      this.findProfile(email, accountName, headers),
      this.findAddress(addressId),
      this.findAccount(accountName),
      Promise.resolve(),
    ];

    const card = {
      token: this.ctx.dataDto.payment.token,
      franchise: this.ctx.dataDto.payment.franchise,
      number: this.ctx.dataDto.payment.number,
      gateway: this.ctx.dataDto.payment.gateway,
      paymentMethod: this.ctx.dataDto.payment.paymentMethod,
      paymentSystem: this.ctx.dataDto.payment.additionalData?.['paymentSystem'],
      cardId: this.ctx.dataDto.payment.cardId,
      bin: this.ctx.dataDto.payment.bin,
      holderName: this.ctx.dataDto.payment.holderName,
      holderDocument: this.ctx.dataDto.payment.holderDocument,
      expirationDate: this.ctx.dataDto.payment.expirationDate,
      cardNumber: this.ctx.dataDto.payment.cardNumber,
      additionalData: this.ctx.dataDto.payment.additionalData,
      cardContent: null,
      aliasCC: null,
      aliasCVV: null,
      internalCardContent: null,
      cvv: this.ctx.dataDto.payment.cvv,
    };

    if (this.ctx.dataDto.payment.cardId) {
      promises[3] = new Promise<any>(async (resolve) => {
        const cardData = await this.findCard();
        if (cardData) {
          card.token = decrypt(cardData.token);
          card.franchise = cardData.franchise;
          card.number = cardData.number;
          card.cardContent = cardData.cardContent;
          card.internalCardContent = cardData.internalCardContent;
          card.bin = cardData.bin || card.bin;
          card.holderName = cardData.holderName;
          card.aliasCC = cardData.aliasCC;
          card.expirationDate = cardData.expirationDate;
          card.cardNumber = cardData.cardNumber;
          card.holderDocument = cardData.holderDocument;
        }
        resolve(null);
      });
    }

    const [profile, address, account] = await Promise.all(promises);

    if (!profile) {
      throw new NotFoundException('errors.user_doesnt_exist');
    }

    if (
      !(address && address.geoCoordinates) &&
      logisticsInfo.find((lgi) => lgi.selectedDeliveryChannel === 'delivery')
    ) {
      throw new NotFoundException('errors.address_doesnt_exist');
    }
    const additionalData: any = card.additionalData;
    if (
      !card ||
      (card.paymentMethod === PaymentMethodName.CreditCard &&
        card &&
        !(
          card.token ||
          card.cardNumber ||
          additionalData?.transactionId ||
          card.aliasCVV ||
          additionalData?.accountId
        ))
    ) {
      throw new NotFoundException('errors.card_doesnt_exist');
    }

    if (!account) {
      throw new NotFoundException('errors.card_doesnt_exist');
    }

    this.ctx.profile = profile;
    this.ctx.addresses = [address];
    this.ctx.account = account;
    this.ctx.payment = card;

    this.ctx.queueMessage.profile.profileId = profile.id;
    this.ctx.queueMessage.payment = card;
    this.ctx.queueMessage.account = {
      account: account.account,
      additionalData: account.additionalData?.reduce<Record<string, string>>(
        (
          prev: Record<string, string>,
          item: { key: string; value: string },
        ) => {
          return {
            ...prev,
            [item.key]: item.value,
          };
        },
        {},
      ),
    };
  }

  async createOrder(orderModel: OrderModel): Promise<void> {
    const {
      profile,
      addresses,
      account,
      dataDto: {
        channel,
        oms,
        shipping: { logisticsInfo },
        items,
        account: {
          storePreferences: { salesChannel, currencyCode, countryCode },
        },
        customData,
      },
    } = this.ctx;

    const dataAdress = addresses[0] || addresses[1];
    const order = orderModel.build({
      channel,
      oms,
      account,
      accountName: account.account,
      creationDate: new Date().toISOString(),
      createdAt: Date.now(),
      log: '',
      user: {
        document: profile.document,
        documentType: profile.documentType,
        lastname: profile.lastname,
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        phoneCode: profile.phoneCode,
        email: profile.email,
      },
      shipping: {
        address: {
          id: dataAdress.id,
          street: dataAdress.street,
          number: dataAdress.number,
          city: dataAdress.city,
          state: dataAdress.state,
          country: dataAdress.country,
          geoCoordinates: dataAdress.geoCoordinates,
          postalCode: dataAdress.postalCode,
          reference: dataAdress.reference,
          receiverName: dataAdress.receiverName,
          neighborhood: dataAdress.neighborhood,
        },
        logisticsInfo: logisticsInfo.map((logisticInfo) => ({
          itemIndex: logisticInfo.itemIndex,
          selectedDeliveryChannel: logisticInfo.selectedDeliveryChannel,
          selectedSla: logisticInfo.selectedSla,
        })),
      },
      country: countryCode,
      currency: currencyCode,
      salesChannel,
      status: 'pending',
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        seller: item.seller,
      })),
      customData: customData,
    });

    this.ctx.order = await order.save();
    this.ctx.queueMessage.orderId = this.ctx.order.id;
  }

  async prepareProcessTransaction(orderModel: OrderModel): Promise<void> {
    const {
      orderId,
      profile: { profileId },
    } = this.ctx.processTransactionDto;

    const promises: [Promise<ProfileDoc>, Promise<OrderDoc>] = [
      this.findProfileById(profileId),
      orderModel.get(orderId),
    ];

    const [profile, order] = await Promise.all(promises);

    this.ctx.profile = profile;
    this.ctx.order = order;
  }

  async onProcessTransaction(): Promise<void> {
    const {
      order,
      profile,
      processTransactionDto: {
        account,
        payment,
        omsExtraData: { order: orderVtex },
        totalizers,
        profile: { habeasData },
        shipping: { addressId },
      },
      transaction: { transactionId, token },
    } = this.ctx;

    const accountId = payment.additionalData?.accountId;
    if (!accountId) {
      if (
        !payment.cardId &&
        payment.paymentMethod === PaymentMethodName.CreditCard
      ) {
        const cardData = await this.createCard();

        payment.cardId = cardData.id;
      } else if (payment.cardId) {
        if (payment.bin) await this.updateCardData({ bin: payment.bin });
        if (payment.paymentSystem)
          await this.updateCardData({ paymentSystem: payment.paymentSystem });
        if (token && account.additionalData?.paymentez == 'true')
          await this.updateCardData({ token });
      }

      profile.set({
        selectedPayment: {
          paymentMethod: payment.paymentMethod,
          card: payment.cardId,
        },
      });
    }

    order.set({
      orderId: orderVtex.orderGroup,
      total: totalizers.totals,
      totalShipping: totalizers.shippingTotal,
      status: 'approved',
      payment: {
        number: payment.number,
        franchise: payment.franchise,
        transactionId: transactionId,
        gateway: payment.gateway,
        cardId: accountId || (payment.cardId && payment.cardId.toString()),
        paymentMethod: payment.paymentMethod,
        paymentSystem: payment.paymentSystem,
      },
    });

    await order.save();

    profile.set({
      habeasData: !habeasData ? profile.habeasData : habeasData,
    });

    if (addressId)
      profile.set({
        selectedAddress: addressId,
      });

    await profile.save();

    this.ctx.order = order;
  }

  async cancelOrder(orderModel: OrderModel, log = ''): Promise<void> {
    const {
      profile,
      addresses,
      account,
      payment,
      vtex: { order: orderVtex = {} },
      queueMessage: { totalizers },
      dataDto: {
        channel,
        oms,
        shipping: { logisticsInfo },
        items,
        account: {
          storePreferences: { salesChannel, currencyCode, countryCode },
        },
        customData,
      },
    } = this.ctx;

    const dataAdress = addresses[0] || addresses[1];
    const order = orderModel.build({
      channel,
      oms,
      account,
      accountName: account.account,
      creationDate: new Date().toISOString(),
      createdAt: Date.now(),
      log,
      orderId: orderVtex.orderGroup || 'null',
      user: {
        document: profile.document,
        documentType: profile.documentType,
        lastname: profile.lastname,
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        phoneCode: profile.phoneCode,
        email: profile.email,
      },
      shipping: {
        address: {
          id: dataAdress.id,
          street: dataAdress.street,
          number: dataAdress.number,
          city: dataAdress.city,
          state: dataAdress.state,
          country: dataAdress.country,
          geoCoordinates: dataAdress.geoCoordinates,
          postalCode: dataAdress.postalCode,
          reference: dataAdress.reference,
          receiverName: dataAdress.receiverName,
          neighborhood: dataAdress.neighborhood,
        },
        logisticsInfo: logisticsInfo.map((logisticInfo) => ({
          itemIndex: logisticInfo.itemIndex,
          selectedDeliveryChannel: logisticInfo.selectedDeliveryChannel,
          selectedSla: logisticInfo.selectedSla,
        })),
      },
      country: countryCode,
      currency: currencyCode,
      salesChannel,
      status: 'cancelled',
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        seller: item.seller,
      })),
      customData: customData,
      total: totalizers.totals,
      totalShipping: totalizers.shippingTotal,
      payment: {
        number: payment.number,
        franchise: payment.franchise,
        transactionId: '',
        gateway: payment.gateway,
        cardId: '',
        paymentMethod: payment.paymentMethod,
        paymentSystem: payment.paymentSystem,
      },
    });

    this.ctx.order = await order.save();
    this.ctx.queueMessage.orderId = this.ctx.order.id;
  }

  async cancelOrderProcessTransaction(log = ''): Promise<void> {
    const {
      order,
      processTransactionDto: {
        payment,
        omsExtraData: { order: orderVtex },
        totalizers,
      },
    } = this.ctx;

    order.set({
      orderId: orderVtex.orderGroup,
      total: totalizers.totals,
      totalShipping: totalizers.shippingTotal,
      status: 'cancelled',
      log,
      payment: {
        number: payment.number,
        franchise: payment.franchise,
        transactionId: '',
        gateway: payment.gateway,
        cardId: '',
        paymentMethod: payment.paymentMethod,
        paymentSystem: payment.paymentSystem,
      },
    });

    await order.save();

    this.ctx.order = order;
  }
}
