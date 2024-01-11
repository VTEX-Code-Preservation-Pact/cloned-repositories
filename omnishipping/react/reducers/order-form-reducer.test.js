import * as types from '../actions/action-types'

import { DELIVERY, PICKUP_IN_STORE, RESIDENTIAL, SEARCH } from '../constants'

import { addValidation } from '@vtex/address-form'
import reducer from './order-form-reducer'

describe('OrderForm reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM with only PICKUP', () => {
    const orderForm = {
      canEditData: true,
      clientPreferencesData: {},
      giftRegistryData: {},
      clientProfileData: {},
      loggedIn: false,
      orderFormId: 'test',
      salesChannel: '2',
      sellers: [],
      shippingData: {
        selectedAddresses: [
          {
            addressType: RESIDENTIAL,
          },
        ],
        address: {
          addressId: '10',
        },
        logisticsInfo: [
          {
            slas: [
              {
                id: 'Test',
              },
            ],
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
            ],
          },
        ],
      },
      items: [{}],
      storePreferencesData: {
        currencySymbol: '',
        currencyFormatInfo: {
          currencyDecimalDigits: '',
          currencyDecimalSeparator: '',
          currencyGroupSeparator: '',
          startsWithCurrencySymbol: '',
        },
      },
    }

    expect(
      reducer([], {
        type: types.UPDATE_ORDERFORM,
        orderForm,
      })
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM when has different pickup selected', () => {
    const orderForm = {
      canEditData: true,
      clientPreferencesData: {},
      giftRegistryData: {},
      clientProfileData: {},
      loggedIn: false,
      orderFormId: 'test',
      salesChannel: '2',
      sellers: [],
      shippingData: {
        selectedAddresses: [
          {
            addressType: RESIDENTIAL,
          },
        ],
        address: {
          addressId: '10',
        },
        logisticsInfo: [
          {
            selectedSla: 'Test',
            selectedDeliveryChannel: PICKUP_IN_STORE,
            slas: [
              {
                deliveryChannel: PICKUP_IN_STORE,
                id: 'Test',
              },
            ],
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
            ],
          },
          {
            selectedSla: 'Test 2',
            selectedDeliveryChannel: PICKUP_IN_STORE,
            slas: [
              {
                deliveryChannel: PICKUP_IN_STORE,
                id: 'Test 2',
              },
            ],
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
            ],
          },
        ],
      },
      items: [{}],
      storePreferencesData: {
        currencySymbol: '',
        currencyFormatInfo: {
          currencyDecimalDigits: '',
          currencyDecimalSeparator: '',
          currencyGroupSeparator: '',
          startsWithCurrencySymbol: '',
        },
      },
    }
    const defaultState = {}
    const action = {
      type: types.UPDATE_ORDERFORM,
      orderForm,
    }
    const resultState = reducer(defaultState, action)

    expect(resultState.shippingData.logisticsInfo[1].selectedSla).toBe(null)
    expect(
      resultState.shippingData.logisticsInfo[1].selectedDeliveryChannel
    ).toBe(null)
  })

  it('should handle UPDATE_ORDERFORM with delivery', () => {
    const orderForm = {
      canEditData: true,
      clientPreferencesData: {},
      giftRegistryData: {},
      clientProfileData: {},
      loggedIn: false,
      orderFormId: 'test',
      salesChannel: '2',
      sellers: [],
      shippingData: {
        selectedAddresses: [
          {
            addressType: RESIDENTIAL,
          },
        ],
        address: {
          addressId: '10',
        },
        logisticsInfo: [
          {
            slas: [
              {
                id: 'Test',
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
          },
        ],
      },
      items: [{}],
      storePreferencesData: {
        currencySymbol: '',
        currencyFormatInfo: {
          currencyDecimalDigits: '',
          currencyDecimalSeparator: '',
          currencyGroupSeparator: '',
          startsWithCurrencySymbol: '',
        },
      },
    }

    expect(
      reducer([], {
        type: types.UPDATE_ORDERFORM,
        orderForm,
      })
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM with validation', () => {
    const orderForm = {
      canEditData: true,
      clientPreferencesData: {},
      giftRegistryData: {},
      clientProfileData: {},
      loggedIn: false,
      orderFormId: 'test',
      salesChannel: '2',
      sellers: [],
      shippingData: {
        selectedAddresses: [
          {
            addressType: RESIDENTIAL,
          },
        ],
        address: addValidation({
          addressId: '10',
        }),
        logisticsInfo: [
          {
            slas: [
              {
                id: 'Test',
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
          },
        ],
      },
      items: [{}],
      storePreferencesData: {
        currencySymbol: '',
        currencyFormatInfo: {
          currencyDecimalDigits: '',
          currencyDecimalSeparator: '',
          currencyGroupSeparator: '',
          startsWithCurrencySymbol: '',
        },
      },
    }

    expect(
      reducer([], {
        type: types.UPDATE_ORDERFORM,
        orderForm,
      })
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM with without slas', () => {
    const orderForm = {
      canEditData: true,
      clientPreferencesData: {},
      giftRegistryData: {},
      clientProfileData: {},
      loggedIn: false,
      orderFormId: 'test',
      salesChannel: '2',
      sellers: [],
      hippingData: {
        selectedAddresses: [
          {
            addressType: RESIDENTIAL,
          },
        ],
        address: {
          addressId: {
            value: '10',
          },
        },
        logisticsInfo: [
          {
            slas: [],
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
              {
                id: DELIVERY,
              },
            ],
          },
        ],
      },
      items: [{}],
      storePreferencesData: {
        currencySymbol: '',
        currencyFormatInfo: {
          currencyDecimalDigits: '',
          currencyDecimalSeparator: '',
          currencyGroupSeparator: '',
          startsWithCurrencySymbol: '',
        },
      },
    }

    expect(
      reducer([], {
        type: types.UPDATE_ORDERFORM,
        orderForm,
        address: {
          addressId: '10',
        },
        searchAddress: {
          addressId: '11',
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
