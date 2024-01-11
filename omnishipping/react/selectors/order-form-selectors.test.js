import {
  AVAILABLE,
  DELIVERY,
  PICKUP_IN_STORE,
  RESIDENTIAL,
  CHEAPEST,
} from '../constants/index'
import {
  getAvailableDeliveryChannels,
  getDefaultShipsTo,
  getLocale,
  getOrderFormItems,
  getSelectedDeliveryAddress,
  getSelectedDeliveryChannel,
  getSelectedDeliveryChannels,
  getShippingData,
  getStoreCountryCode,
  getUserEmail,
  hasAvailableAddresses,
  hasSelectedAddress,
} from './order-form-selectors'

describe('order-form-selectors', () => {
  const state = {
    delivery: {
      activeDeliveryOption: CHEAPEST,
      [CHEAPEST]: [
        {
          itemIndex: 0,
          selectedSla: 'Entrega Agendada',
          selectedDeliveryChannel: DELIVERY,
          slas: [
            {
              id: 'Entrega Agendada',
              deliveryChannel: DELIVERY,
              availableDeliveryWindows: [{}],
              deliveryWindow: null,
            },
          ],
          shipsTo: ['BRA'],
        },
        {
          itemIndex: 1,
          selectedSla: PICKUP_IN_STORE,
          selectedDeliveryChannel: PICKUP_IN_STORE,
          slas: [
            {
              id: PICKUP_IN_STORE,
              deliveryChannel: PICKUP_IN_STORE,
              availableDeliveryWindows: [],
              deliveryWindow: null,
            },
          ],
          shipsTo: ['BRA'],
        },
        {
          itemIndex: 2,
          selectedSla: DELIVERY,
          selectedDeliveryChannel: DELIVERY,
          slas: [
            {
              id: DELIVERY,
              deliveryChannel: DELIVERY,
              availableDeliveryWindows: [{}],
              deliveryWindow: null,
            },
          ],
          shipsTo: ['BRA'],
        },
      ],
    },
    orderForm: {
      clientPreferencesData: {
        locale: 'BRA',
      },
      clientProfileData: {
        email: 'email@email.com',
      },
      items: [
        { availability: AVAILABLE, seller: '1' },
        { availability: AVAILABLE, seller: '1' },
        { availability: AVAILABLE, seller: '1' },
      ],
      storePreferencesData: { countryCode: 'BRA' },
      shippingData: {
        selectedAddresses: [{ addressType: RESIDENTIAL }],
        logisticsInfo: [
          {
            itemIndex: 0,
            selectedSla: 'Entrega Agendada',
            selectedDeliveryChannel: DELIVERY,
            slas: [
              {
                id: 'Entrega Agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}],
                deliveryWindow: null,
              },
            ],
            shipsTo: ['BRA'],
          },
          {
            itemIndex: 1,
            selectedSla: PICKUP_IN_STORE,
            selectedDeliveryChannel: PICKUP_IN_STORE,
            slas: [
              {
                id: PICKUP_IN_STORE,
                deliveryChannel: PICKUP_IN_STORE,
                availableDeliveryWindows: [],
                deliveryWindow: null,
              },
            ],
            shipsTo: ['BRA'],
          },
          {
            itemIndex: 2,
            selectedSla: DELIVERY,
            selectedDeliveryChannel: DELIVERY,
            slas: [
              {
                id: DELIVERY,
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}],
                deliveryWindow: null,
              },
            ],
            shipsTo: ['BRA'],
          },
        ],
      },
    },
  }

  it('should get getAvailableDeliveryChannels from logisticsInfo', () => {
    const state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        [CHEAPEST]: [
          {
            itemIndex: 0,
            deliveryChannels: [{ id: DELIVERY }],
            selectedDeliveryChannel: PICKUP_IN_STORE,
          },
          {
            itemIndex: 1,
            deliveryChannels: [{ id: DELIVERY }, { id: PICKUP_IN_STORE }],
            selectedDeliveryChannel: PICKUP_IN_STORE,
          },
        ],
      },
      orderForm: {
        items: [{ seller: '1' }, { seller: '1' }],
        shippingData: {
          logisticsInfo: [
            {
              itemIndex: 0,
              deliveryChannels: [{ id: DELIVERY }],
              selectedDeliveryChannel: PICKUP_IN_STORE,
            },
            {
              itemIndex: 1,
              deliveryChannels: [{ id: DELIVERY }, { id: PICKUP_IN_STORE }],
              selectedDeliveryChannel: PICKUP_IN_STORE,
            },
          ],
        },
      },
    }
    const expectedResponse = [
      {
        id: 'delivery',
      },
      {
        id: 'pickup-in-point',
      },
    ]
    expect(getAvailableDeliveryChannels(state)).toEqual(expectedResponse)
  })

  it('should get selectedDeliveryChannel from a group of logisticInfo in common', () => {
    const state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        [CHEAPEST]: [
          {
            selectedDeliveryChannel: PICKUP_IN_STORE,
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
            ],
          },
          {
            selectedDeliveryChannel: PICKUP_IN_STORE,
            deliveryChannels: [
              {
                id: PICKUP_IN_STORE,
              },
            ],
          },
        ],
      },
      orderForm: {
        shippingData: {
          logisticsInfo: [
            {
              selectedDeliveryChannel: PICKUP_IN_STORE,
              deliveryChannels: [
                {
                  id: PICKUP_IN_STORE,
                },
              ],
            },
            {
              selectedDeliveryChannel: PICKUP_IN_STORE,
              deliveryChannels: [
                {
                  id: PICKUP_IN_STORE,
                },
              ],
            },
          ],
        },
      },
    }
    const props = {
      deliveryChannel: PICKUP_IN_STORE,
    }

    expect(getSelectedDeliveryChannel(state, props)).toBe('pickup-in-point')
  })

  it('should check if has hasSelectedAddress', () => {
    const state = {
      orderForm: {
        shippingData: {
          selectedAddresses: [
            {
              addressId: '-1370605454479',
              addressType: 'residential',
              city: 'Rio de Janeiro',
              complement: '',
              country: 'BRA',
              geoCoordinates: [],
              neighborhood: 'Sao Palo',
              number: '100',
              postalCode: '200000060',
              receiverName: 'teste',
              reference: null,
              state: 'RJ',
              street: 'Rua teste',
            },
          ],
        },
      },
    }

    expect(hasSelectedAddress(state)).toEqual(true)
  })

  it('should check if has availableAddresses', () => {
    const state = {
      orderForm: {
        shippingData: {
          availableAddresses: [
            {
              addressId: '-1370605454479',
              addressType: 'residential',
              city: 'Rio de Janeiro',
              complement: '',
              country: 'BRA',
              geoCoordinates: [],
              neighborhood: 'Sao Palo',
              number: '100',
              postalCode: '200000060',
              receiverName: 'teste',
              reference: null,
              state: 'RJ',
              street: 'Rua teste',
            },
          ],
        },
      },
    }

    expect(hasAvailableAddresses(state)).toEqual(true)
  })

  it('should get Selected Delivery Channels', () => {
    expect(getSelectedDeliveryChannels(state)).toEqual([
      DELIVERY,
      PICKUP_IN_STORE,
    ])
  })

  it('should get store CountryCode', () => {
    const state = {
      orderForm: {
        storePreferencesData: {
          countryCode: 'BRA',
        },
      },
    }

    expect(getStoreCountryCode(state)).toEqual('BRA')
  })

  it('should get default shipsTo from orderForm', () => {
    expect(getDefaultShipsTo(state)).toEqual('BRA')
  })

  it('should get default shipsTo from orderForm', () => {
    const localstate = {
      ...state,
      orderForm: {
        ...state.orderForm,
        shippingData: null,
      },
    }

    expect(getDefaultShipsTo(localstate)).toEqual('BRA')
  })

  it('should get selected delivery address', () => {
    expect(getSelectedDeliveryAddress(state)).toMatchSnapshot()
  })

  it('should get shippingData', () => {
    expect(getShippingData(state)).toMatchSnapshot()
  })

  it('should get orderForm items', () => {
    expect(getOrderFormItems(state)).toEqual(state.orderForm.items)
  })

  it('should get orderForm items and return empty array if has no items', () => {
    const localState = {
      orderForm: {
        items: null,
      },
    }
    expect(getOrderFormItems(localState)).toEqual([])
  })

  it('should get the locale from state', () => {
    expect(getLocale(state)).toEqual(
      state.orderForm.clientPreferencesData.locale
    )
  })

  it('should get the client email from state', () => {
    expect(getUserEmail(state)).toEqual(state.orderForm.clientProfileData.email)
  })
})
