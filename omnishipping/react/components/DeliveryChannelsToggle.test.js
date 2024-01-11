import { CHEAPEST, DELIVERY, PICKUP_IN_STORE } from '../constants'
import { loadTranslation, mountWithIntl } from 'enzyme-react-intl'

import ConnectedDeliveryChannelsToggle from './DeliveryChannelsToggle'
import { Provider } from 'react-redux'
import React from 'react'

loadTranslation('../../messages/en.json')

describe('DeliveryChannelsToggle', () => {
  let state, store, props
  const mockFunction = jest.fn()

  beforeEach(() => {
    state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [
          {
            itemIndex: 0,
            slas: [
              {
                price: 0,
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
      addressForm: {
        addresses: {
          '10': {},
          '11': {},
        },
        searchId: '10',
        residentialId: '11',
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
      orderForm: {
        items: [{ seller: '1' }],
        shippingData: {
          logisticsInfo: [
            {
              itemIndex: 0,
              slas: [
                {
                  price: 0,
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
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }
    props = {
      shouldShowToggle: true,
      sellerId: '1',
      orderForm: {
        items: [],
      },
      index: 0,
      availableDeliveryChannels: [
        {
          id: PICKUP_IN_STORE,
        },
        {
          id: DELIVERY,
        },
      ],
      activeTab: DELIVERY,
      changeActiveTab: mockFunction,
      logisticsInfo: {
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
      },
    }
  })

  it('should render the second tab active', done => {
    const mockFunction = jest.fn()
    const props = {
      shouldShowToggle: true,
      sellerId: '1',
      index: 1,
      address: {},
      activeTab: PICKUP_IN_STORE,
      changeActiveTab: mockFunction,
      availableDeliveryChannels: [
        {
          id: PICKUP_IN_STORE,
        },
        {
          id: DELIVERY,
        },
      ],
      logisticsInfo: {
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
      },
    }
    const wrapper = mountWithIntl(
      <Provider store={store}>
        <ConnectedDeliveryChannelsToggle {...props} />
      </Provider>
    )

    wrapper.find('#shipping-option-pickup-in-point').simulate('click')

    process.nextTick(() => {
      try {
        wrapper.update()
        expect(mockFunction.mock.calls.length).toBe(1)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })

  it('should render the first tab active', done => {
    const localState = {
      ...state,
      componentActivity: {
        activeDeliveryChannel: PICKUP_IN_STORE,
      },
    }
    const localStore = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => localState),
    }
    const mockFunction = jest.fn()
    const props = {
      address: {},
      shouldShowToggle: true,
      activeDeliveryChannel: PICKUP_IN_STORE,
      changeActiveDeliveryChannel: jest.fn(),
      shippingData: {},
      updateShippingData: jest.fn(),
      selectedPickupEvent: jest.fn(),
      changeActiveTab: mockFunction,
      availableDeliveryChannels: [
        {
          id: PICKUP_IN_STORE,
        },
        {
          id: DELIVERY,
        },
      ],
      logisticsInfo: {
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
      },
    }

    const wrapper = mountWithIntl(
      <Provider store={localStore}>
        <ConnectedDeliveryChannelsToggle {...props} />
      </Provider>
    )

    wrapper.find('#shipping-option-delivery').simulate('click')

    process.nextTick(() => {
      try {
        wrapper.update()
        expect(mockFunction.mock.calls.length).toBe(1)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })

  it('should render the connected DeliveryChannelsToggle component without crashing', () => {
    mountWithIntl(
      <Provider store={store}>
        <ConnectedDeliveryChannelsToggle {...props} />
      </Provider>
    )
  })
})
