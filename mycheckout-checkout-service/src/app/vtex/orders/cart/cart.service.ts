import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { MarketingDataDto } from 'src/app/orders/dtos/marketingData.dto';
import { PaymentDataDto } from 'src/app/orders/dtos/paymentData.dto';
import { GatewayException } from 'src/shared/exceptions/gateway-exception';
import { ItemDto } from '../../../orders/dtos/item.dto';
import { GeoCoordinateDto } from '../../../users/addresses/dtos/geoCoordinates.dto';

@Injectable()
export class CartVTEXService {
  constructor(private httpService: HttpService) {}

  async cartSimulation(
    account: string,
    items: ItemDto[],
    address: {
      postalCode: string;
      geoCoordinates: GeoCoordinateDto;
      country: string;
    },
    logisticsInfo: LogisticInfoInput[],
    marketingData?: MarketingDataDto,
    paymentData?: PaymentDataDto,
    paymentMethodId?: string,
  ) {
    const data: any = {
      items,
      postalCode: address.postalCode,
      country: address.country,
      geoCoordinates: [
        address.geoCoordinates?.longitude,
        address.geoCoordinates?.latitude,
      ],
      shippingData: {
        logisticsInfo: logisticsInfo.map((li) => ({
          selectedDeliveryWindow: li.deliveryWindow,
          selectedSlaId: li.selectedSla,
          ...li,
        })),
      },
      paymentData: {
        payments: [{ bin: paymentData?.bin, paymentSystem: paymentMethodId }],
      },
    };

    if (marketingData?.coupon) {
      data.marketingData = marketingData;
    }
    try {
      return this.httpService
        .post(
          `https://${account}.vtexcommercestable.com.br/api/checkout/pub/orderforms/simulation`,
          data,
        )
        .pipe(map((res: any) => res.data))
        .toPromise();
    } catch (err) {
      throw new GatewayException('VTEX: Error in cart simulation', err, data);
    }
  }
}
