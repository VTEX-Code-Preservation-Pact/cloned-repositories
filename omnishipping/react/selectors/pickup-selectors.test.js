import * as pickupSelectors from './pickup-selectors'
import { DELIVERY, PICKUP_IN_STORE } from '../constants/index'

describe('Pickup Selectors', () => {
  const state = {
    pickup: {
      pickupPoint: '1',
      activeSellerId: '1',
    },
    orderForm: {
      items: [{ seller: '1' }, { seller: '1' }],
      shippingData: {
        logisticsInfo: [
          {
            itemIndex: 0,
            deliveryChannels: [{ id: PICKUP_IN_STORE }],
            selectedDeliveryChannel: PICKUP_IN_STORE,
            selectedSla: '0',
            slas: [
              {
                price: 100,
                id: '0',
                deliveryChannel: PICKUP_IN_STORE,
              },
            ],
          },
          {
            itemIndex: 1,
            deliveryChannels: [{ id: DELIVERY }, { id: PICKUP_IN_STORE }],
            selectedDeliveryChannel: PICKUP_IN_STORE,
            selectedSla: '0',
            slas: [
              {
                price: 100,
                id: '0',
                deliveryChannel: PICKUP_IN_STORE,
              },
              {
                price: 100,
                id: '1',
                deliveryChannel: PICKUP_IN_STORE,
              },
            ],
          },
        ],
      },
    },
  }

  const props = {
    pickupPoint: { id: '1' },
    sellerId: '1',
  }

  it('should get getUnavailableItemsAmount from pickup state', () => {
    expect(pickupSelectors.getUnavailableItemsAmount(state, props)).toEqual(1)
  })

  it('should get getPickupPointsById from pickup state searching by pickupPoint from props', () => {
    const expectedResponse = {
      deliveryChannel: PICKUP_IN_STORE,
      id: '1',
      price: 100,
    }

    expect(pickupSelectors.getPickupPointsById(state, props)).toEqual(
      expectedResponse
    )
  })
})
