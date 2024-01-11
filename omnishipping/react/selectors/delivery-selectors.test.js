import { CHEAPEST, DELIVERY, PICKUP_IN_STORE } from '../constants/index'
import {
  hasDeliverySlaSelected,
  hasPickups,
  hasSelectedSlas,
  hasSlas,
} from './delivery-selectors'

describe('delivery-selectors', () => {
  const state = {
    delivery: {
      activeDeliveryOption: CHEAPEST,
      CHEAPEST: [
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
  }

  it('should check if has SLAs', () => {
    expect(hasSlas(state)).toBe(true)
  })

  it('should check has pickup and return true', () => {
    expect(hasPickups(state)).toEqual(true)
  })

  it('should check has selected slas and return true', () => {
    expect(hasSelectedSlas(state)).toEqual(true)
  })

  it('should check has selected delivery slas and return true', () => {
    expect(hasDeliverySlaSelected(state)).toEqual(true)
  })
})
