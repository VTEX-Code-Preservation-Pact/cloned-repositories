import * as actions from './address-form-actions'
import * as types from './action-types'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { DELIVERY } from '../constants/index'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.unmock('../utils/__mocks__/newAddress')

describe('Address Form Actions', () => {
  it('should create an action to update the address', () => {
    const address = {
      addressId: '10',
    }
    const searchAddress = {
      addressId: '10',
    }
    const expectedAction = {
      type: types.UPDATE_ADDRESS_FORM,
      address,
      searchAddress,
    }
    expect(actions.updateAddressForm({ address, searchAddress })).toEqual(
      expectedAction
    )
  })

  it('should create an action to validate address', () => {
    const rules = {}
    const expectedAction = {
      type: types.VALIDATE_ADDRESS_FORM,
      rules,
    }
    expect(actions.validateAddressForm(rules)).toEqual(expectedAction)
  })

  it('should create an action to validate address', () => {
    const rules = {}
    const expectedAction = {
      type: types.VALIDATE_ADDRESS_FORM_FIELDS,
      rules,
    }
    expect(actions.validateAddressFormFields(rules)).toEqual(expectedAction)
  })

  it('should create an action to validate postalCode', () => {
    const rules = {}
    const expectedAction = {
      type: types.VALIDATE_POSTAL_CODE,
      rules,
    }
    expect(actions.validatePostalCode(rules)).toEqual(expectedAction)
  })

  it('should create an action to focus on an input', () => {
    const input = {
      name: 'postalCode',
      value: '',
    }
    const expectedAction = {
      type: types.FOCUS_ON_INPUT,
      input,
    }
    expect(actions.focusOnInput(input)).toEqual(expectedAction)
  })

  it('should dispatch a action to add a new address with country code', () => {
    const store = mockStore({
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
      addressForm: {
        addresses: {
          '10': {
            addressId: '10',
          },
        },
        residentialId: '10',
      },
      orderForm: {
        storePreferencesData: {
          countryCode: 'BRA',
        },
        shippingData: {
          logisticsInfo: [
            {
              shipsTo: ['BRA'],
            },
          ],
        },
      },
    })

    store.dispatch(actions.addDeliveryAddress())

    const getActions = store.getActions()

    expect(getActions[1].type).toBe(types.ADD_ADDRESS_FORM_ADDRESS)
  })

  it('should dispatch a action to add a new address with shipsTo', () => {
    const store = mockStore({
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
      addressForm: {
        addresses: {
          '10': {
            addressId: '10',
          },
        },
        residentialId: '10',
      },
      orderForm: {
        storePreferencesData: {
          countryCode: '',
        },
        shippingData: {
          logisticsInfo: [
            {
              shipsTo: ['BRA'],
            },
          ],
        },
      },
    })

    store.dispatch(actions.addDeliveryAddress())

    const getActions = store.getActions()

    expect(getActions[1].type).toBe(types.ADD_ADDRESS_FORM_ADDRESS)
  })
})
