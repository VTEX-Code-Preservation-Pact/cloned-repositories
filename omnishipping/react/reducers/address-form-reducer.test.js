import reducer from './address-form-reducer'
import * as types from '../actions/action-types'
import { addValidation } from '@vtex/address-form'
import BRA from '@vtex/address-form/lib/country/BRA'
import MockDate from 'mockdate'
import { DELIVERY } from '../constants/index'
const defaultAddress = {
  city: 'Rio de Janeiro',
  neighborhood: 'Botafogo',
  receiverName: 'Xablauzera da Bahia',
  addressId: '11',
  addressType: 'residential',
  complement: null,
  country: 'BRA',
  geoCoordinates: [],
  number: '12',
  postalCode: '22071-060',
  reference: null,
  state: 'Rio de Janeiro',
  street: 'Rua Saint Roman',
  addressQuery: '',
}

describe('AddressForm reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM', () => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const orderForm = {
      storePreferencesData: {
        countryCode: 'BRA',
      },
      shippingData: {
        selectedAddresses: [
          {
            ...defaultAddress,
            neighborhood: 'Flamengo',
          },
        ],
      },
    }

    expect(
      reducer(
        {
          residentialId: defaultAddress.addressId,
          addresses: {
            [defaultAddress.addressId]: addValidation(defaultAddress),
          },
        },
        {
          type: types.UPDATE_ORDERFORM,
          orderForm,
        }
      )
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ORDERFORM with different addressId', () => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const orderForm = {
      storePreferencesData: {
        countryCode: 'BRA',
      },
      canEditData: true,
      shippingData: {
        selectedAddresses: [
          {
            ...defaultAddress,
            addressId: '1234',
            neighborhood: 'Flamengo',
          },
        ],
      },
    }

    expect(
      reducer(
        {
          residentialId: defaultAddress.addressId,
          valid: false,
          addresses: {
            [defaultAddress.addressId]: addValidation(defaultAddress),
          },
        },
        { type: types.UPDATE_ORDERFORM, orderForm, channel: DELIVERY }
      )
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ADDRESS_FORM', () => {
    const searchId = '12'
    const defaultState = {
      residentialId: defaultAddress.addressId,
      searchId: searchId,
      addresses: {
        [defaultAddress.addressId]: addValidation(defaultAddress),
        [searchId]: addValidation({ ...defaultAddress, addressId: searchId }),
      },
    }

    const address = addValidation({
      ...defaultAddress,
      city: 'Rio de Janeiro',
      complement: 'Apto 106',
      number: '10',
    })

    expect(
      reducer(defaultState, {
        type: types.UPDATE_ADDRESS_FORM,
        address,
        searchAddress: defaultState.addresses[defaultState.searchId],
      })
    ).toMatchSnapshot()
  })

  it('should handle UPDATE_ADDRESS_FORM sending only searchAddress', () => {
    const searchId = '12'
    const defaultState = {
      residentialId: defaultAddress.addressId,
      searchId: searchId,
      addresses: {
        [defaultAddress.addressId]: addValidation(defaultAddress),
        [searchId]: addValidation({ ...defaultAddress, addressId: searchId }),
      },
    }

    const searchAddress = addValidation({
      ...defaultAddress,
      city: 'Rio de Janeiro',
      complement: 'Apto 106',
      number: '10',
    })

    expect(
      reducer(defaultState, {
        type: types.UPDATE_ADDRESS_FORM,
        searchAddress,
      })
    ).toMatchSnapshot()
  })

  it('should handle VALIDATE_ADDRESS_FORM', () => {
    const defaultState = {
      residentialId: defaultAddress.addressId,
      addresses: {
        [defaultAddress.addressId]: addValidation({
          ...defaultAddress,
          city: 'Rio de Janeiro',
          neighborhood: 'Gávea',
          receiverName: 'Teste',
        }),
      },
    }

    const rules = BRA

    expect(
      reducer(defaultState, {
        type: types.VALIDATE_ADDRESS_FORM,
        rules,
      })
    ).toMatchSnapshot()
  })

  it('should not break with rules=null', () => {
    const defaultState = {
      residentialId: defaultAddress.addressId,
      addresses: {
        [defaultAddress.addressId]: addValidation({
          ...defaultAddress,
          city: 'Rio de Janeiro',
          neighborhood: 'Gávea',
          receiverName: 'Teste',
        }),
      },
      queuedValidations: [],
    }

    const rules = null

    expect(
      reducer(defaultState, {
        type: types.VALIDATE_ADDRESS_FORM,
        rules,
      })
    ).toMatchSnapshot()
  })

  it('should handle VALIDATE_ADDRESS_FORM_FIELDS', () => {
    const defaultState = {
      residentialId: defaultAddress.addressId,
      addresses: {
        [defaultAddress.addressId]: addValidation({
          ...defaultAddress,
          city: 'Rio de Janeiro',
          neighborhood: 'Gávea',
          receiverName: 'Teste',
        }),
      },
    }

    const rules = BRA

    expect(
      reducer(defaultState, {
        type: types.VALIDATE_ADDRESS_FORM_FIELDS,
        rules,
      })
    ).toMatchSnapshot()
  })

  it('should handle VALIDATE_POSTAL_CODE', () => {
    const defaultState = {
      addresses: {
        [defaultAddress.addressId]: addValidation({
          ...defaultAddress,
          postalCode: '22071-060',
        }),
      },
      residentialId: defaultAddress.addressId,
    }

    const rules = BRA

    expect(
      reducer(defaultState, {
        type: types.VALIDATE_POSTAL_CODE,
        rules,
      })
    ).toMatchSnapshot()
  })

  it('should handle ADD_DELIVERY_ADDRESS', () => {
    const defaultState = {
      [defaultAddress.addressId]: addValidation(defaultAddress),
    }

    const address = addValidation({
      ...defaultAddress,
      city: 'São Paulo',
      neighborhood: 'Jardim Botânico',
      receiverName: 'Bananinha',
    })

    expect(
      reducer(defaultState, {
        type: types.ADD_DELIVERY_ADDRESS,
        address,
      })
    ).toMatchSnapshot()
  })

  it('should handle FOCUS_ON_INPUT', () => {
    const input = {
      name: 'postalCode',
      value: '',
    }
    const defaultState = {
      addresses: {
        [defaultAddress.addressId]: addValidation(defaultAddress),
      },
      residentialId: defaultAddress.addressId,
    }
    const action = {
      type: types.FOCUS_ON_INPUT,
      input,
    }
    const resultState = reducer(defaultState, action)

    expect(
      resultState.addresses[defaultAddress.addressId][input.name].focus
    ).toEqual(true)
    expect(
      resultState.addresses[defaultAddress.addressId][input.name].value
    ).toEqual('')
  })
})
