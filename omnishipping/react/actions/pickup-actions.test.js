import * as actions from './pickup-actions'
import * as types from './action-types'

describe('Pickup actions', () => {
  it('should create an action to change active pickup options', () => {
    const pickupOptions = []
    const expectedAction = {
      type: types.CHANGE_ACTIVE_PICKUP_OPTIONS,
      pickupOptions,
    }
    expect(actions.changeActivePickupOptions(pickupOptions)).toEqual(
      expectedAction
    )
  })

  it('should create an action to close pickup options modal', () => {
    const expectedAction = {
      type: types.CLOSE_PICKUP_MODAL,
    }
    expect(actions.closePickupModal()).toEqual(expectedAction)
  })

  it('should create an action to change active pickup details', () => {
    const pickupPoint = '1'
    const expectedAction = {
      type: types.CHANGE_ACTIVE_PICKUP_DETAILS,
      pickupPoint,
    }
    expect(actions.changeActivePickupDetails({ pickupPoint })).toEqual(
      expectedAction
    )
  })

  it('should create an action to close pickup details active', () => {
    const expectedAction = {
      type: types.CLOSE_PICKUP_DETAILS,
    }
    expect(actions.closePickupDetails()).toEqual(expectedAction)
  })
})
