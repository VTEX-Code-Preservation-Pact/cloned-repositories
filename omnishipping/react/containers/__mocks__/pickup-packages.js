import {
  AVAILABLE,
  CHEAPEST,
  DELIVERY,
  PICKUP_IN_STORE,
  RESIDENTIAL,
} from '../../constants'

import BRA from '@vtex/address-form/lib/country/BRA'

const address = {
  addressType: 'residential',
  receiverName: null,
  addressId: '10',
  postalCode: '22222222',
  city: 'Rio de janeiro',
  state: 'RJ',
  country: 'BRA',
  street: 'Av das Américas',
  number: '',
  neighborhood: 'Barra da Tijuca',
  complement: 'Loja Barra da Tijuca',
  reference: null,
  geoCoordinates: [],
  addressQuery: 'query',
}

export const onePickupPackageState = {
  delivery: {
    shouldUpdateUi: true,
    activeDeliveryOption: CHEAPEST,
    CHEAPEST: [
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
            name: 'pickup',
            price: 100,
            shippingEstimate: '1bd',
            deliveryWindow: null,
            pickupStoreInfo: {
              friendlyName: 'loja rio de janeiro',
              address,
            },
          },
        ],
      },
    ],
  },
  componentActivity: {
    activeDeliveryChannel: PICKUP_IN_STORE,
  },
  pickup: {
    isModalActive: false,
    activeSellerId: '',
    isPickupDetailsActive: false,
    hasGeolocation: false,
  },
  accountInfo: {
    googleMapsKey: 'xablau',
  },
  addressRules: {
    rules: {
      BRA,
    },
    selectedRules: {
      BRA,
      country: 'BRA',
      summary: [
        [
          {
            name: 'street',
          },
          {
            delimiter: ' ',
            name: 'number',
          },
          {
            delimiter: ', ',
            name: 'complement',
          },
        ],
        [
          {
            name: 'neighborhood',
          },
          {
            delimiter: ' - ',
            name: 'city',
          },
          {
            delimiter: ' - ',
            name: 'state',
          },
        ],
        [
          {
            name: 'postalCode',
          },
        ],
      ],
    },
  },
  addressForm: {
    valid: true,
    addresses: {
      '10': {
        addressType: {
          value: RESIDENTIAL,
        },
        postalCode: {
          value: '10',
          valid: true,
        },
      },
    },
    residentialId: '10',
    searchId: '10',
  },
  orderForm: {
    canEditData: true,
    items: [
      {
        availability: AVAILABLE,
        seller: '1',
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413316.jpg',
        uniqueId: '10',
      },
    ],
    sellers: [{ id: '1' }],
    shippingData: {
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
              name: 'pickup',
              price: 100,
              shippingEstimate: '1bd',
              deliveryWindow: null,
              pickupStoreInfo: {
                friendlyName: 'loja rio de janeiro',
                address,
              },
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

export const scheduledDeliveryPickupPackageState = {
  ...onePickupPackageState,
  delivery: {
    ...onePickupPackageState.delivery,
    isScheduledDeliveryActive: true,
    CHEAPEST: [
      {
        ...onePickupPackageState.delivery.CHEAPEST[0],
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
            id: 'pickup',
            deliveryChannel: PICKUP_IN_STORE,
            name: 'pickup',
            price: 100,
            shippingEstimate: '1bd',
            deliveryWindow: {
              endDateUtc: '2017-07-14T00:00:00+00:00',
              lisPrice: 200,
              price: 200,
              startDateUtc: '2017-07-14T18:00:00+00:00',
              tax: 20,
            },
            pickupStoreInfo:
              onePickupPackageState.orderForm.shippingData.logisticsInfo[0]
                .slas[0].pickupStoreInfo,
          },
        ],
      },
    ],
  },
  orderForm: {
    ...onePickupPackageState.orderForm,
    shippingData: {
      ...onePickupPackageState.orderForm.shippingData,
      logisticsInfo: [
        {
          ...onePickupPackageState.orderForm.shippingData.logisticsInfo[0],
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
              id: 'pickup',
              deliveryChannel: PICKUP_IN_STORE,
              name: 'normal',
              price: 100,
              shippingEstimate: '1bd',
              deliveryWindow: {
                endDateUtc: '2017-07-14T00:00:00+00:00',
                lisPrice: 200,
                price: 200,
                startDateUtc: '2017-07-14T18:00:00+00:00',
                tax: 20,
              },
              pickupStoreInfo:
                onePickupPackageState.orderForm.shippingData.logisticsInfo[0]
                  .slas[0].pickupStoreInfo,
            },
          ],
        },
      ],
    },
  },
}

export const pickupAndUnavailablePackageState = {
  ...onePickupPackageState,
  delivery: {
    ...onePickupPackageState.delivery,
    CHEAPEST: [
      ...onePickupPackageState.delivery.CHEAPEST,
      {
        selectedDeliveryChannel: null,
        itemIndex: 1,
        selectedSla: null,
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
            id: 'pickup-2',
            deliveryChannel: PICKUP_IN_STORE,
            name: 'normal-2',
            price: 100,
            shippingEstimate: '1bd',
            deliveryWindow: null,
          },
        ],
      },
    ],
  },
  orderForm: {
    ...onePickupPackageState.orderForm,
    items: [
      ...onePickupPackageState.orderForm.items,
      {
        seller: '1',
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413312312.jpg',
        uniqueId: '123',
        availability: 'cannotBeDelivery',
      },
    ],
    shippingData: {
      ...onePickupPackageState.orderForm.shippingData,
      logisticsInfo: [
        ...onePickupPackageState.orderForm.shippingData.logisticsInfo,
        {
          selectedDeliveryChannel: PICKUP_IN_STORE,
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

export const pickupAndPickupUnavailablePackageState = {
  ...onePickupPackageState,
  delivery: {
    ...onePickupPackageState.delivery,
    CHEAPEST: [
      ...onePickupPackageState.delivery.CHEAPEST,
      {
        selectedDeliveryChannel: null,
        itemIndex: 1,
        selectedSla: null,
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
            id: 'pickup-2',
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
  orderForm: {
    ...onePickupPackageState.orderForm,
    items: [
      ...onePickupPackageState.orderForm.items,
      {
        seller: '1',
        imageUrl:
          'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413312312.jpg',
        uniqueId: '123',
      },
    ],
    shippingData: {
      ...onePickupPackageState.orderForm.shippingData,
      logisticsInfo: [
        ...onePickupPackageState.orderForm.shippingData.logisticsInfo,
        {
          selectedDeliveryChannel: null,
          itemIndex: 1,
          selectedSla: null,
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
              id: 'pickup-2',
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

export const onlyPickupState = {
  ...onePickupPackageState,
  delivery: {
    ...onePickupPackageState.delivery,
    CHEAPEST: [
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
  orderForm: {
    ...onePickupPackageState.orderForm,
    items: [...onePickupPackageState.orderForm.items],
    shippingData: {
      ...onePickupPackageState.orderForm.shippingData,
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
