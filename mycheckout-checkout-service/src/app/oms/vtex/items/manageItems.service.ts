import { GatewayException } from 'src/shared/exceptions/gateway-exception';
import {
  DataDTO,
  Item,
  Offering,
  Vtex,
} from '../../../../typings/OrderContext';
import * as R from 'ramda';
import { LogisticInfoDto } from 'src/app/orders/dtos/logisticInfo.dto';
import { ItemDto } from 'src/app/orders/dtos/item.dto';
import { AddressDoc } from 'src/app/users/addresses/schemas/address.schema';
import { MarketingDataDto } from 'src/app/orders/dtos/marketingData.dto';
import { OrdersVTEXService } from 'src/app/vtex/orders/orders.service';
import { OrderContext } from '../../../../typings/OrderContext';

export class ManageItemsService {
  async individualSimulation(
    logisticsInfo: LogisticInfoDto[],
    items: ItemDto[],
    account: DataDTO['account'],
    address: AddressDoc,
    deliveryType: string,
    marketingData: MarketingDataDto,
    payment: DataDTO['payment'],
    vtexService: OrdersVTEXService,
    ctx: OrderContext,
  ) {
    const logistics = logisticsInfo.filter(
      (item) => item.selectedDeliveryChannel == deliveryType,
    );
    const itemsArr = [];
    logistics.map((item, id) => {
      itemsArr.push(items[item.itemIndex]);
      item.itemIndex = id;
      return item;
    });

    if (itemsArr.length > 0) {
      const simulation = await vtexService.cart.cartSimulation(
        account.accountName,
        itemsArr,
        address,
        logistics,
        marketingData,
        payment,
        ctx.account.paymentMethodId,
      );

      this.validateAvailability(simulation);

      return simulation;
    }
  }

  validateAvailability(simulation: Vtex['simulation']) {
    const itemNotAvailable = simulation.items.some(
      (item: any) => item.availability !== 'available',
    );

    if (itemNotAvailable) {
      throw new GatewayException(
        "Some items can't be deliverable in this location",
        simulation.items,
      );
    }
  }

  manageItems(simulation: Vtex['simulation'], ctx: OrderContext) {
    const {
      dataDto: { offerings },
    } = ctx;
    const { gifts, items } = this.splitItemsAndGifts(
      ctx,
      simulation.items,
      simulation.selectableGifts,
    );

    if (offerings && offerings.length > 0) {
      const { itemsWithBundle, offersTotal } = this.AddOfferings(
        items,
        offerings,
      );

      return { items: itemsWithBundle, gifts, offersTotal };
    }

    return { items, gifts, offersTotal: 0 };
  }

  AddOfferings(items: Item[], offerings: Offering[]) {
    let offersTotal = 0;
    const itemsWithBundle = items.map((item) => {
      const currentOffers = offerings.filter(
        (offer) => item.id === offer.parentItemId,
      );

      const offers = item.offerings.filter((offer) =>
        R.includes({ id: offer.id, parentItemId: item.id }, currentOffers),
      );

      return {
        ...item,
        bundleItems: offers.map((offer) => {
          offersTotal += offer.price;
          return {
            id: offer.id,
            quantity: 1,
            seller: null,
            price: offer.price,
            sellingPrice: offer.price,
          };
        }),
      };
    });

    return { itemsWithBundle, offersTotal };
  }

  splitItemsAndGifts(
    ctx: OrderContext,
    simulationItems: CheckoutOrderForm['items'],
    selectableGifts: CheckoutOrderForm['selectableGifts'],
  ): {
    items: Item[];
    gifts: Item[];
  } {
    const {
      dataDto: { gifts },
    } = ctx;
    const isGift = (priceTags: any) => {
      return priceTags.some((tags: { name: string }) =>
        tags.name.toLocaleLowerCase().includes('gift'),
      );
    };

    const itemsAndGifts: {
      items: Item[];
      gifts: Item[];
    } = simulationItems.reduce(
      (prevValue, currValue) => {
        if (currValue.priceTags && isGift(currValue.priceTags)) {
          prevValue.gifts.push({
            id: currValue.id,
            quantity: currValue.quantity,
            seller: currValue.seller,
            priceTags: currValue.priceTags,
            offerings: currValue.offerings,
            price: currValue.price,
            measurementUnit: currValue.measurementUnit,
            unitMultiplier: currValue.unitMultiplier,
            isGift: true,
          });
        } else {
          prevValue.items.push({
            id: currValue.id,
            quantity: currValue.quantity,
            seller: currValue.seller,
            priceTags: currValue.priceTags,
            offerings: currValue.offerings,
            price: currValue.price,
            measurementUnit: currValue.measurementUnit,
            unitMultiplier: currValue.unitMultiplier,
            isGift: false,
          });
        }
        return prevValue;
      },
      {
        items: [],
        gifts: [],
      },
    );

    itemsAndGifts.gifts = itemsAndGifts.gifts.filter(
      (gift: any) =>
        gifts.some((g) => g.id === gift.id) && // Validate if selected in dto
        selectableGifts.some((sg: any) =>
          // Validate if it is a selectableGift in the simulation
          sg.availableGifts.some((g: any) => g.id === gift.id),
        ),
    );

    return itemsAndGifts;
  }
}
