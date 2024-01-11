import * as unavailableSelectors from './unavailable-selectors'

import {
  AVAILABLE,
  DELIVERY,
  PICKUP_IN_STORE,
  RESIDENTIAL,
} from '../constants/index'

describe('order-form-selectors', () => {
  const state = {
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

  it('should get orderForm check if has unavailable items with pickup selected and return false', () => {
    expect(unavailableSelectors.hasUnavailableItems(state)).toEqual(false)
  })

  it('should check has has unavailable items and return false', () => {
    expect(unavailableSelectors.hasUnavailableItems(state)).toEqual(false)
  })
})
