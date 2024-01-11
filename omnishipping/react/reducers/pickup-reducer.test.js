import reducer from './pickup-reducer'
import * as types from '../actions/action-types'

describe('Pickup reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle CHANGE_ACTIVE_PICKUP_OPTIONS', () => {
    const pickupOptions = [{}]

    const defaultState = {
      isModalActive: false,
      pickupOptions: [],
    }

    expect(
      reducer(defaultState, {
        type: types.CHANGE_ACTIVE_PICKUP_OPTIONS,
        pickupOptions,
      })
    ).toMatchSnapshot()
  })

  it('should handle CHANGE_ACTIVE_PICKUP_DETAILS', () => {
    const pickupPointId = '1'

    const defaultState = {
      isPickupDetailsActive: false,
      pickupPointId: '',
    }

    expect(
      reducer(defaultState, {
        type: types.CHANGE_ACTIVE_PICKUP_DETAILS,
        pickupPointId,
      })
    ).toMatchSnapshot()
  })

  it('should handle CLOSE_PICKUP_MODAL', () => {
    const defaultState = {
      isModalActive: true,
      pickupOptions: [],
    }

    expect(
      reducer(defaultState, {
        type: types.CLOSE_PICKUP_MODAL,
      })
    ).toMatchSnapshot()
  })

  it('should handle CLOSE_PICKUP_DETAILS', () => {
    const defaultState = {
      isPickupDetailsActive: true,
    }

    expect(
      reducer(defaultState, {
        type: types.CLOSE_PICKUP_DETAILS,
      })
    ).toMatchSnapshot()
  })
})
