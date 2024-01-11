import * as omnishippingSelectors from './omnishipping-selectors'

import {
  AVAILABLE,
  CHEAPEST,
  DELIVERY,
  PICKUP_IN_STORE,
  SEARCH,
  RESIDENTIAL,
} from '../constants/index'

describe('omnishipping-selectors', () => {
  const state = {
    componentActivity: {
      isOmniShippingCompleted: false,
      isAddressActive: true,
      isAddressListActive: true,
      activeDeliveryChannel: PICKUP_IN_STORE,
    },
    delivery: {
      activeDeliveryOption: CHEAPEST,
      CHEAPEST: [
        {
          itemIndex: 0,
          deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
          selectedDeliveryChannel: PICKUP_IN_STORE,
          selectedSla: '1',
          slas: [
            {
              id: '1',
              deliveryChannel: PICKUP_IN_STORE,
              availableDeliveryWindows: [],
            },
          ],
        },
      ],
    },
    addressForm: {
      addresses: {
        '10': {
          addressType: {
            value: RESIDENTIAL,
          },
          postalCode: {
            valid: true,
          },
          geoCoordinates: {
            value: [111, 222],
          },
        },
        '11': {
          addressType: {
            value: SEARCH,
          },
          postalCode: {
            valid: true,
          },
          geoCoordinates: {
            value: [111, 222],
          },
        },
      },
      residentialId: '10',
      searchId: '11',
    },
    orderForm: {
      canEditData: true,
      loggedIn: false,
      items: [{ seller: '1', availability: AVAILABLE }],
      shippingData: {
        selectedAddresses: [{}],
        availableAddresses: [{}],
        logisticsInfo: [
          {
            itemIndex: 0,
            deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
            selectedDeliveryChannel: PICKUP_IN_STORE,
            selectedSla: '1',
            slas: [
              {
                id: '1',
                deliveryChannel: PICKUP_IN_STORE,
                availableDeliveryWindows: [],
              },
            ],
          },
        ],
      },
    },
  }

  it('should check if the addressList is active and return true', () => {
    expect(omnishippingSelectors.isAddressListActive(state)).toBe(true)
  })

  it('should check if the paymentButton is active if has only pickups selected and return true', () => {
    expect(omnishippingSelectors.isPaymentButtonActive(state)).toBe(true)
  })

  it('should check if the paymentButton is active if has delivery and pickups selected and return true', () => {
    const localState = {
      ...state,
      componentActivity: {
        isOmniShippingCompleted: false,
        isAddressActive: true,
        isAddressListActive: true,
        activeDeliveryChannel: DELIVERY,
      },
      addressForm: {
        addresses: {
          '10': {
            addressType: {
              value: RESIDENTIAL,
            },
            postalCode: {
              valid: true,
            },
          },
          '11': {
            addressType: {
              value: SEARCH,
            },
            postalCode: {
              valid: true,
            },
          },
        },
        residentialId: '10',
        searchId: '11',
      },
      orderForm: {
        ...state.orderForm,
        items: [
          ...state.orderForm.items,
          { seller: '1', availability: AVAILABLE },
        ],
        shippingData: {
          ...state.orderForm.shippingData,
          logisticsInfo: [
            ...state.orderForm.shippingData.logisticsInfo,
            {
              itemIndex: 1,
              deliveryChannels: [{ id: DELIVERY }],
              selectedDeliveryChannel: DELIVERY,
              selectedSla: '2',
              slas: [
                {
                  id: '2',
                  deliveryChannel: DELIVERY,
                  availableDeliveryWindows: [],
                },
              ],
            },
          ],
        },
      },
    }
    expect(omnishippingSelectors.isPaymentButtonActive(localState)).toBe(true)
  })
})
