import * as actions from './metric-actions'
import * as types from './action-types'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { PICKUP_IN_STORE, DELIVERY, CHEAPEST } from '../constants'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Metric actions', () => {
  it('should dispatch a action log if has pickup', () => {
    const store = mockStore({})

    store.dispatch(actions.hasPickupEvent())

    const receivedActions = store.getActions()

    const spy = jest.spyOn(window, 'checkoutLogger')

    expect(receivedActions[0].type).toEqual(types.HAS_PICKUP_OPTIONS_EVENT)
    expect(spy).toHaveBeenCalled()
  })

  it('should dispatch a action log if has selected Pickup', () => {
    const store = mockStore({})

    store.dispatch(actions.selectedPickupEvent())

    const receivedActions = store.getActions()

    const spy = jest.spyOn(window, 'checkoutLogger')

    expect(receivedActions[0].type).toEqual(types.SELECTED_PICKUP_TAB_EVENT)
    expect(spy).toHaveBeenCalled()
  })

  it('should dispatch a action log if has searched Pickup Address in the modal', () => {
    const store = mockStore({})

    store.dispatch(actions.searchedPickupAddressEvent())

    const receivedActions = store.getActions()

    const spy = jest.spyOn(window, 'checkoutLogger')

    expect(receivedActions[0].type).toEqual(types.SEARCHED_PICKUP_ADDRESS_EVENT)
    expect(spy).toHaveBeenCalled()
  })

  it('should dispatch a action log shipping statistics', () => {
    const store = mockStore({
      delivery: {
        activeDeliveryOption: CHEAPEST,
        [CHEAPEST]: [
          {
            itemIndex: 0,
            selectedDeliveryChannel: PICKUP_IN_STORE,
            deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
            selectedSla: '1',
            slas: [
              {
                deliveryChannel: PICKUP_IN_STORE,
                id: '1',
                shippingEstimate: '1bd',
                listPrice: 100,
                availableDeliveryWindows: [],
              },
              {
                deliveryChannel: DELIVERY,
                id: '2',
                shippingEstimate: '3bd',
                listPrice: 100,
                availableDeliveryWindows: [],
              },
            ],
          },
        ],
      },
      orderForm: {
        items: [{ seller: '1' }],
        shippingData: {
          logisticsInfo: [
            {
              itemIndex: 0,
              selectedDeliveryChannel: PICKUP_IN_STORE,
              deliveryChannels: [{ id: PICKUP_IN_STORE }, { id: DELIVERY }],
              selectedSla: '1',
              slas: [
                {
                  deliveryChannel: PICKUP_IN_STORE,
                  id: '1',
                  shippingEstimate: '1bd',
                  listPrice: 100,
                  availableDeliveryWindows: [],
                },
                {
                  deliveryChannel: DELIVERY,
                  id: '2',
                  shippingEstimate: '3bd',
                  listPrice: 100,
                  availableDeliveryWindows: [],
                },
              ],
            },
          ],
        },
      },
    })

    store.dispatch(actions.shippingStatsEvent())

    const receivedActions = store.getActions()

    const spy = jest.spyOn(window, 'checkoutLogger')

    expect(receivedActions[0].type).toEqual(types.SHIPPING_STATS_EVENT)
    expect(spy).toHaveBeenCalled()
  })
})
