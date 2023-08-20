import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AccountDoc } from '../../../accounts/schemas/account.schema';
import { CustomDataDto } from '../../../orders/dtos/customData.dto';
import { MarketingDataDto } from '../../../orders/dtos/marketingData.dto';
import { AddressDoc } from '../../../users/addresses/schemas/address.schema';
import { ProfileDoc } from '../../../users/profiles/schemas/profile.schema';
import { Item, PaymentData } from '../../../../typings/OrderContext';
import { ProfileSystemVTEXService } from '../../profile-system/profile-system.service';
import { findBestMatch } from 'string-similarity';
import * as crypto from 'crypto';

@Injectable()
export class CheckoutVTEXService {
  constructor(
    private httpService: HttpService,
    private profileSystemVtexService: ProfileSystemVTEXService,
  ) {}

  async createOrder(
    accountData: AccountDoc,
    simulationData: CheckoutOrderForm,
    user: ProfileDoc,
    addresses: AddressDoc[],
    total: number,
    items: Item[],
    gifts?: Item[],
    customData?: CustomDataDto,
    marketingData?: MarketingDataDto,
    paymentData?: PaymentData,
    headers?: any,
  ) {
    const userVtex = await this.profileSystemVtexService.getUserInfo(
      accountData,
      user.email,
      headers,
    );

    let addressesVtex: any;
    if (userVtex) {
      addressesVtex = await this.profileSystemVtexService.getUserAddress(
        accountData,
        user,
        { userId: userVtex.id },
        headers,
      );
    }
    let dataAddress = {};
    if (addresses[0]) {
      dataAddress = this.dataAddress(
        addresses[0],
        this.matchVtexAddress(addressesVtex, addresses[0]) || addresses[0].id,
        'residential',
        user,
      );
    }
    const dataAddresses = [];
    const logisticsInfo = simulationData.logisticsInfo.map((itemLogistic) => {
      const sla = itemLogistic.slas.find(
        (slaItem) => slaItem.id === itemLogistic.selectedSla,
      );
      let slaAddress: any = {};
      let residential;
      if (sla.pickupStoreInfo.isPickupStore) {
        residential = false;
        slaAddress = {
          ...sla.pickupStoreInfo.address,
          addressId: crypto
            .createHash('md5')
            .update(JSON.stringify(sla.pickupStoreInfo.address))
            .digest('hex'),
        };
      } else {
        residential = true;
        slaAddress = dataAddress;
      }
      const exits = dataAddresses.find(
        (address) => address.addressId === slaAddress.addressId,
      );
      if (!exits) {
        dataAddresses.push(slaAddress);
        if (!residential)
          addresses.push({
            id: slaAddress.addressId,
            street: slaAddress.street,
            number: slaAddress.number || '0',
            city: slaAddress.city,
            state: slaAddress.state,
            country: slaAddress.country,
            geoCoordinates: {
              longitude: slaAddress.geoCoordinates[0].toString(),
              latitude: slaAddress.geoCoordinates[1].toString(),
            },
            postalCode: slaAddress.postalCode,
            reference: slaAddress.reference || '',
            receiverName: slaAddress.receiverName || '',
            neighborhood: slaAddress.neighborhood || '',
          } as any);
      }

      return {
        itemIndex: itemLogistic.itemIndex,
        selectedSla: sla.id,
        selectedDeliveryChannel: itemLogistic.selectedDeliveryChannel,
        price: sla.price,
        deliveryWindow: sla.deliveryWindow,
        addressId: slaAddress.addressId,
      };
    });

    const data: any = {
      items: [...items, ...(gifts || [])],
      clientProfileData: {
        email: user?.email,
        firstName: user.name,
        lastName: user.lastname,
        document: user.document,
        documentType: user.documentType,
        phone: user.phoneNumber,
        corporateName: null,
        tradeName: null,
        corporateDocument: null,
        stateInscription: null,
        corporatePhone: null,
        isCorporate: false,
      },
      shippingData: {
        id: 'shippingData',
        address: dataAddress,
        selectedAddresses: dataAddresses,
        logisticsInfo: logisticsInfo,
      },
      paymentData: {
        id: 'paymentData',
        payments: [
          {
            bin: paymentData.bin,
            paymentSystem: Number.parseInt(accountData.paymentMethodId),
            referenceValue: total,
            value: total,
            installments: (paymentData.additionalData as any)?.installments
              ? (paymentData.additionalData as any).installments
              : 1,
          },
        ],
      },
      marketingData: {
        coupon: marketingData?.coupon,
        utmiCampaign: 'kuikpay',
        marketingTags: ['kuikpay'],
      },
    };

    if (customData) {
      const customApps = [];
      customData.customApps.forEach((apps) => {
        const fields = {};
        apps.fields.forEach((data) => {
          fields[data.key] = data.value;
        });
        customApps.push({
          ...apps,
          fields: fields,
        });
      });
      data.customData = {
        customApps: customApps,
      };
    }

    return this.httpService
      .put(
        `https://${accountData.account}.vtexcommercestable.com.br/api/checkout/pub/orders`,
        data,
        {
          headers: {
            ...headers,
          },
        },
      )
      .pipe(
        map((response: any) => ({
          data: response.data,
          headers: response.headers,
        })),
      )
      .toPromise();
  }

  matchVtexAddress(addressesVtex, address) {
    const addresses = addressesVtex?.map(
      (address: AddressDoc) => address.street,
    );
    let matchAddress;
    if (addresses && addresses.length) {
      try {
        const { bestMatch } = findBestMatch(address.street, addresses);

        if (bestMatch.rating === 1) {
          matchAddress = addressesVtex.find(
            (address: any) => address.street == bestMatch.target,
          );
        }
      } catch (error) {
        console.log(`error`, error);
      }
      return matchAddress && matchAddress.addressName;
    }
  }

  dataAddress(address, addressId, addressType, user) {
    const dataAddress = {
      addressId: addressId,
      addressType: addressType,
      receiverName: address.receiverName
        ? address.receiverName
        : `${user.name} ${user.lastname}`,
      postalCode: address.postalCode,
      city: address.city,
      state: address.state,
      country: address.country,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      complement: address.complement || address.reference,
      reference: address.reference,
      geoCoordinates: [
        address.geoCoordinates.longitude,
        address.geoCoordinates.latitude,
      ],
    };
    return dataAddress;
  }
}
