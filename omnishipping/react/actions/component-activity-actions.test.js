import * as actions from './component-activity-actions'
import * as types from './action-types'

describe('Address Form Actions', () => {
  it('should create an action to show AddressList', () => {
    const show = true
    const expectedAction = {
      type: types.SHOW_ADDRESS_LIST,
      show,
    }
    expect(actions.showAddressList(show)).toEqual(expectedAction)
  })

  it('should create an action to show Address', () => {
    const show = true
    const expectedAction = {
      type: types.SHOW_ADDRESS,
      show,
    }
    expect(actions.showAddress(show)).toEqual(expectedAction)
  })

  it('should create an action to show omniShippingCompleted', () => {
    const show = true
    const expectedAction = {
      type: types.SHOW_OMNISHIPPING_COMPLETED,
      show,
    }
    expect(actions.showOmniShippingCompleted(show)).toEqual(expectedAction)
  })

  it('should create an action to show omniShipping', () => {
    const show = true
    const expectedAction = {
      type: types.SHOW_OMNISHIPPING,
      show,
    }
    expect(actions.showOmniShipping(show)).toEqual(expectedAction)
  })
})
