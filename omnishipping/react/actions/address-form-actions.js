import * as types from './action-types'
import { newAddress } from '../utils/AddressFormUtils'
import {
  getDefaultShipsTo,
  getStoreCountryCode,
} from '../selectors/order-form-selectors'
import { getSearchAddress } from '../selectors/address-form-selectors'
import { newAddressEvent } from './component-activity-actions'
import { SEARCH } from '../constants'
import { helpers } from 'vtex.address-form'
const { removeValidation } = helpers

export const updateAddressForm = ({
  address,
  searchAddress,
  channel,
  rules,
}) => ({
  type: types.UPDATE_ADDRESS_FORM,
  address,
  searchAddress,
  channel,
  rules,
})

export const validateAddressForm = rules => ({
  type: types.VALIDATE_ADDRESS_FORM,
  rules,
})

export const validateAddressFormFields = rules => ({
  type: types.VALIDATE_ADDRESS_FORM_FIELDS,
  rules,
})

export const validatePostalCode = rules => ({
  type: types.VALIDATE_POSTAL_CODE,
  rules,
})

export const addAddressFormAddress = ({ address, searchAddress, channel }) => ({
  type: types.ADD_ADDRESS_FORM_ADDRESS,
  address,
  searchAddress,
  channel,
})

export const focusOnInput = input => ({
  type: types.FOCUS_ON_INPUT,
  input,
})

export const addDeliveryAddress = () => (dispatch, getState) => {
  dispatch(newAddressEvent(true))
  const state = getState()
  const shipsTo = getDefaultShipsTo(state)
  const storeCountryCode = getStoreCountryCode(state)
  const channel = state.componentActivity.activeDeliveryChannel
  const searchAddress = removeValidation(getSearchAddress(state))
  const country =
    shipsTo.indexOf(storeCountryCode) > -1 ? storeCountryCode : shipsTo[0]
  dispatch(
    addAddressFormAddress({
      address: newAddress({ country }),
      searchAddress,
      channel,
    })
  )
}

export const addNewAddresses = () => (dispatch, getState) => {
  const state = getState()
  const shipsTo = getDefaultShipsTo(state)
  const storeCountryCode = getStoreCountryCode(state)
  const channel = state.componentActivity.activeDeliveryChannel
  const country =
    shipsTo.indexOf(storeCountryCode) > -1 ? storeCountryCode : shipsTo[0]
  dispatch(
    addAddressFormAddress({
      address: newAddress({ country }),
      searchAddress: newAddress({
        country,
        addressType: SEARCH,
      }),
      channel,
    })
  )
}
