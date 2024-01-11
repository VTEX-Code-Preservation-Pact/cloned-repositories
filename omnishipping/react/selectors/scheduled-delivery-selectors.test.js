import { CHEAPEST, DELIVERY, PICKUP_IN_STORE } from '../constants/index'

import {
  hasSelectedScheduledDelivery,
  shouldShowScheduledDeliveryOptions,
} from './scheduled-delivery-selectors'

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

  it('should check if has selected Scheduled Delivery', () => {
    const props = {
      deliveryChannel: {
        id: DELIVERY,
      },
    }

    expect(hasSelectedScheduledDelivery(state, props)).toEqual(true)
  })

  it('should show Scheduled Delivery Options if has intersection', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
              {
                id: 'agendada-top',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(true)
  })

  it('should show Scheduled Delivery Options one logisticsInfo but with multiple scheduled deliveries', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
              {
                id: 'agendada-top',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(true)
  })

  it('should show Scheduled Delivery Options with multiple logisticsInfo but one logisticsInfo but with multiple scheduled deliveries and one empty', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
              {
                id: 'agendada-top',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
          {
            slas: [],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(true)
  })

  it('should NOT show Scheduled Delivery Options if DOES NOT have intersection', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
          {
            slas: [
              {
                id: 'agendada-top',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}, {}],
              },
            ],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(false)
  })

  it('should NOT show Scheduled Delivery Options if DOES NOT have scheduled deliveries', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'Normal',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [],
              },
            ],
          },
          {
            slas: [
              {
                id: 'Expressa',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [],
              },
            ],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(false)
  })

  it('should NOT show Scheduled Delivery Options if have only one empty logisticsInfo', () => {
    const state = {
      delivery: {
        [CHEAPEST]: [
          {
            slas: [
              {
                id: 'agendada',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [{}],
              },
            ],
          },
          {
            slas: [
              {
                id: 'Normal',
                deliveryChannel: DELIVERY,
                availableDeliveryWindows: [],
              },
            ],
          },
        ],
        activeDeliveryOption: CHEAPEST,
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
    }

    const result = shouldShowScheduledDeliveryOptions(state)

    expect(result).toEqual(false)
  })
})
