import {
  AVAILABLE,
  CHEAPEST,
  DELIVERY,
  PICKUP_IN_STORE,
  RESIDENTIAL,
} from '../../constants'

import BRA from '@vtex/address-form/lib/country/BRA'

export const oneDeliveryPackageState = {
  delivery: {
    activeDeliveryOption: CHEAPEST,
    CHEAPEST: [
      {
        selectedDeliveryChannel: DELIVERY,
        itemIndex: 0,
        selectedSla: 'normal',
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
        slas: [
          {
            availableDeliveryWindows: [],
            id: 'normal',
            deliveryChannel: DELIVERY,
            name: 'normal',
            price: 100,
            shippingEstimate: '1bd',
            deliveryWindow: null,
          },
        ],
      },
    ],
  },
  componentActivity: {
    activeDeliveryChannel: DELIVERY,
  },
  accountInfo: {
    googleMapsKey: 'xablau',
  },
  pickup: {
    isModalActive: false,
    activeSellerId: '',
    isPickupDetailsActive: false,
    hasGeolocation: false,
  },
  addressRules: {
    rules: {
      BRA,
    },
    selectedRules: {
      BRA,
    },
  },
  addressForm: {
    addresses: {
      '10': {
        addressType: {
          value: RESIDENTIAL,
        },
        postalCode: {
          value: '10',
        },
      },
    },
    residentialId: '10',
    searchId: '10',
  },
  orderForm: {
    items: [
      {
        seller: '1',
        availability: AVAILABLE,
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413316.jpg',
        uniqueId: '10',
      },
    ],
    sellers: [{ id: '1' }],
    shippingData: {
      logisticsInfo: [
        {
          selectedDeliveryChannel: DELIVERY,
          itemIndex: 0,
          selectedSla: 'normal',
          deliveryChannels: [
            {
              id: PICKUP_IN_STORE,
            },
            {
              id: DELIVERY,
            },
          ],
          slas: [
            {
              availableDeliveryWindows: [],
              id: 'normal',
              deliveryChannel: DELIVERY,
              name: 'normal',
              price: 100,
              shippingEstimate: '1bd',
              deliveryWindow: null,
            },
          ],
        },
      ],
    },
    storePreferencesData: {
      countryCode: 'BRA',
      currencyCode: 'BRL',
      currencySymbol: 'R$',
      currencyFormatInfo: {
        currencyDecimalDigits: 2,
        currencyDecimalSeparator: ',',
        currencyGroupSeparator: '.',
        currencyGroupSize: 3,
        startsWithCurrencySymbol: true,
      },
    },
  },
}

export const scheduledDeliveryPackageState = {
  ...oneDeliveryPackageState,
  orderForm: {
    ...oneDeliveryPackageState.orderForm,
    shippingData: {
      ...oneDeliveryPackageState.orderForm.shippingData,
      logisticsInfo: [
        {
          ...oneDeliveryPackageState.orderForm.shippingData.logisticsInfo[0],
          slas: [
            {
              availableDeliveryWindows: [
                {
                  endDateUtc: '2017-07-14T00:00:00+00:00',
                  lisPrice: 200,
                  price: 200,
                  startDateUtc: '2017-07-14T18:00:00+00:00',
                  tax: 20,
                },
              ],
              id: 'normal',
              deliveryChannel: DELIVERY,
              name: 'normal',
              price: 100,
              shippingEstimate: '1bd',
              deliveryWindow: null,
            },
          ],
        },
      ],
    },
  },
}

export const deliveryAndUnavailablePackageState = {
  ...oneDeliveryPackageState,
  orderForm: {
    ...oneDeliveryPackageState.orderForm,
    items: [
      ...oneDeliveryPackageState.orderForm.items,
      {
        seller: '1',
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413312312.jpg',
        uniqueId: '123',
        availability: 'cannotBeDelivery',
      },
    ],
    shippingData: {
      ...oneDeliveryPackageState.orderForm.shippingData,
      logisticsInfo: [
        ...oneDeliveryPackageState.orderForm.shippingData.logisticsInfo,
        {
          selectedDeliveryChannel: DELIVERY,
          itemIndex: 0,
          selectedSla: null,
          deliveryChannels: [
            {
              id: PICKUP_IN_STORE,
            },
            {
              id: DELIVERY,
            },
          ],
          slas: [],
        },
      ],
    },
  },
}

export const deliveryAndPickupUnavailablePackageState = {
  ...oneDeliveryPackageState,
  orderForm: {
    ...oneDeliveryPackageState.orderForm,
    items: [
      ...oneDeliveryPackageState.orderForm.items,
      {
        seller: '1',
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413312312.jpg',
        uniqueId: '123',
      },
    ],
    shippingData: {
      ...oneDeliveryPackageState.orderForm.shippingData,
      logisticsInfo: [
        ...oneDeliveryPackageState.orderForm.shippingData.logisticsInfo,
        {
          selectedDeliveryChannel: null,
          itemIndex: 0,
          selectedSla: null,
          deliveryChannels: [
            {
              id: PICKUP_IN_STORE,
            },
            {
              id: DELIVERY,
            },
          ],
          slas: [],
        },
      ],
    },
  },
}

export const onlyPickupState = {
  ...oneDeliveryPackageState,
  orderForm: {
    ...oneDeliveryPackageState.orderForm,
    items: [...oneDeliveryPackageState.orderForm.items],
    shippingData: {
      ...oneDeliveryPackageState.orderForm.shippingData,
      logisticsInfo: [
        {
          selectedDeliveryChannel: PICKUP_IN_STORE,
          itemIndex: 0,
          selectedSla: 'pickup',
          deliveryChannels: [
            {
              id: PICKUP_IN_STORE,
            },
            {
              id: DELIVERY,
            },
          ],
          slas: [
            {
              availableDeliveryWindows: [],
              id: 'pickup',
              deliveryChannel: PICKUP_IN_STORE,
              name: 'normal',
              price: 100,
              shippingEstimate: '1bd',
              deliveryWindow: null,
            },
          ],
        },
      ],
    },
  },
}
