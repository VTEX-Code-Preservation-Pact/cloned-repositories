import reducer from './component-activity-reducer'
import * as types from '../actions/action-types'

describe('ComponentActivity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle SHOW_OMNISHIPPING_COMPLETED', () => {
    expect(
      reducer([], {
        type: types.SHOW_OMNISHIPPING_COMPLETED,
        isAddressValid: true,
        show: true,
      })
    ).toMatchSnapshot()
  })

  it('should handle SHOW_OMNISHIPPING', () => {
    expect(
      reducer([], {
        type: types.SHOW_OMNISHIPPING,
        isAddressValid: true,
        show: true,
      })
    ).toMatchSnapshot()
  })
})
