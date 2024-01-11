import * as types from '../actions/action-types'

import {
  CHEAPEST,
  DELIVERY,
  PICKUP_IN_STORE,
  SEARCH,
  COMBINED,
  FASTEST,
} from '../constants'

import { addValidation } from '@vtex/address-form'
import reducer from './delivery-reducer'

describe('Delivery reducer', () => {
  it('should handle CHANGE_ACTIVE_TAB', () => {
    const logisticsInfo = [
      {
        itemIndex: 0,
        slas: [
          {
            id: 'pickup',
            deliveryChannel: PICKUP_IN_STORE,
            price: 0,
            deliveryWindow: null,
            availableDeliveryWindows: [],
            pickupStoreInfo: {
              isPickupStore: false,
            },
            shippingEstimate: '50m',
          },
        ],
        deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
        selectedDeliveryChannel: PICKUP_IN_STORE,
        selectedSla: 'pickup',
      },
      {
        itemIndex: 1,
        slas: [
          {
            id: 'pickup',
            deliveryChannel: PICKUP_IN_STORE,
            price: 0,
            deliveryWindow: null,
            availableDeliveryWindows: [],
            pickupStoreInfo: {
              isPickupStore: false,
            },
            shippingEstimate: '50m',
          },
        ],
        deliveryChannels: [{ id: PICKUP_IN_STORE }],
        selectedDeliveryChannel: PICKUP_IN_STORE,
        selectedSla: 'pickup',
      },
    ]
    const delivery = {
      activeDeliveryOption: CHEAPEST,
      CHEAPEST: logisticsInfo,
      logisticsInfo,
    }

    expect(
      reducer(delivery, {
        type: types.CHANGE_ACTIVE_TAB,
        channel: DELIVERY,
        searchAddress: {
          addressId: '10',
          countryCode: 'BRA',
        },
        address: {
          addressId: '11',
          countryCode: 'BRA',
        },
        sellers: [{ id: '1' }],
        items: [{ seller: '1' }, { seller: '1' }],
        canEditData: true,
      })
    ).toMatchSnapshot()
  })

  it('should handle CHANGE_ACTIVE_SLA_OPTION', () => {
    const logisticsInfo = [
      {
        itemIndex: 0,
        slas: [
          {
            id: DELIVERY,
            deliveryChannel: DELIVERY,
            availableDeliveryWindows: [],
            pickupStoreInfo: {
              isPickupStore: false,
            },
          },
          {
            id: PICKUP_IN_STORE,
            deliveryChannel: PICKUP_IN_STORE,
            availableDeliveryWindows: [],
            pickupStoreInfo: {
              isPickupStore: false,
            },
          },
        ],
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
        selectedSla: PICKUP_IN_STORE,
      },
    ]

    const delivery = {
      CHEAPEST: logisticsInfo,
      logisticsInfo,
      activeScheduledDelivery: null,
    }

    expect(
      reducer(delivery, {
        type: types.CHANGE_ACTIVE_SLA_OPTION,
        slaOption: DELIVERY,
        sellers: [{ id: '1' }],
        items: [{ seller: '1' }],
        activeDeliveryChannel: DELIVERY,
      })
    ).toMatchSnapshot()
  })

  it("should handle CHANGE_ACTIVE_SLA_OPTION not changing if it doesn't have that SLA", () => {
    const logisticsInfo = [
      {
        addressId: undefined,
        itemIndex: 0,
        slas: [
          {
            id: PICKUP_IN_STORE,
            deliveryChannel: PICKUP_IN_STORE,
            availableDeliveryWindows: [],
            pickupStoreInfo: {
              isPickupStore: false,
            },
          },
        ],
        selectedDeliveryChannel: PICKUP_IN_STORE,
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
        selectedSla: PICKUP_IN_STORE,
      },
    ]

    const state = {
      CHEAPEST: logisticsInfo,
      logisticsInfo,
    }

    const result = reducer(state, {
      type: types.CHANGE_ACTIVE_SLA_OPTION,
      slaOption: DELIVERY,
      sellers: [{ id: '1' }],
      items: [{ seller: '1' }],
    })

    const expectedLogisticsInfo = [
      {
        addressId: undefined,
        deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
        itemIndex: 0,
        selectedDeliveryChannel: null,
        selectedSla: null,
        slas: [
          {
            availableDeliveryWindows: [],
            deliveryChannel: PICKUP_IN_STORE,
            id: PICKUP_IN_STORE,
            pickupStoreInfo: { isPickupStore: false },
          },
        ],
      },
    ]

    expect(result[CHEAPEST]).toEqual(expectedLogisticsInfo)
  })

  it('should handle SELECT_ADDRESS_ITEM', () => {
    const state = {
      [CHEAPEST]: [{ addressId: '1234', selectedDeliveryChannel: DELIVERY }],
      [COMBINED]: [{ addressId: '1234', selectedDeliveryChannel: DELIVERY }],
      [FASTEST]: [{ addressId: '1234', selectedDeliveryChannel: DELIVERY }],
    }
    expect(
      reducer(state, {
        type: types.SELECT_ADDRESS_ITEM,
        selectedAddress: {
          addressId: '10',
          addressType: 'residential',
          city: 'São Paulo',
          complement: '300',
          country: 'BRA',
          geoCoordinates: [],
          neighborhood: 'Vila Mariana',
          number: '',
          postalCode: '555555555',
          receiverName: 'teste',
          reference: null,
          state: 'RJ',
          street: 'Rua Gonzaga Bastos',
        },
      })
    ).toMatchSnapshot()
  })

  it("should handle UPDATE_ADDRESS_FORM if it's the same addressId", () => {
    const address = {
      addressId: 'master',
      addressType: 'residential',
      city: 'Rio de Janeiro',
      complement: '100',
      country: 'BRA',
      geoCoordinates: [],
      neighborhood: 'Tijuca',
      number: '',
      postalCode: '333333333',
      receiverName: 'bananinha',
      reference: null,
      state: 'RJ',
      street: 'Rua Andrade Neves',
    }
    const selectedAddress = {
      storePreferencesData: {
        countryCode: 'BRA',
      },
      shippingData: {
        logisticsInfo: [
          {
            selectedDeliveryChannel: DELIVERY,
          },
        ],
        selectedAddresses: [{ ...address, addressType: SEARCH }],
      },
    }
    expect(
      reducer(selectedAddress, {
        type: types.UPDATE_ADDRESS_FORM,
        address: addValidation({
          ...address,
          city: 'Niteroi',
        }),
        searchAddress: addValidation({
          ...address,
          addressId: '11',
          city: 'Niteroi',
        }),
      })
    ).toMatchSnapshot()
  })

  it("should handle UPDATE_ADDRESS_FORM if it's the different addressId", () => {
    const address = {
      addressId: 'master',
      addressType: 'residential',
      city: 'Rio de Janeiro',
      complement: '100',
      country: 'BRA',
      geoCoordinates: [],
      neighborhood: 'Tijuca',
      number: '',
      postalCode: '333333333',
      receiverName: 'bananinha',
      reference: null,
      state: 'RJ',
      street: 'Rua Andrade Neves',
    }
    const selectedAddress = {
      storePreferencesData: {
        countryCode: 'BRA',
      },
      canEditData: true,
      shippingData: {
        logisticsInfo: [
          {
            selectedDeliveryChannel: DELIVERY,
          },
        ],
        selectedAddresses: [address],
        availableAddresses: [address],
      },
    }
    expect(
      reducer(selectedAddress, {
        type: types.UPDATE_ADDRESS_FORM,
        address: addValidation({
          ...address,
          addressId: '123456',
        }),
        searchAddress: addValidation({
          ...address,
          addressId: '12341116',
        }),
      })
    ).toMatchSnapshot()
  })
})
