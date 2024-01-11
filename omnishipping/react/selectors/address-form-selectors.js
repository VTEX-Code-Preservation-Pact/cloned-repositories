import { createSelector } from 'reselect'
import get from 'lodash/get'
import { GIFT_REGISTRY } from '../constants'
import { isGiftRegistry } from '../utils/AddressFormUtils'

const orderFormSelector = {
  canEditData: state => state.orderForm.canEditData,
}

const clientProfileDataSelector = {
  profileCompleteOnLoading: state =>
    get(state, 'orderForm.clientProfileData.profileCompleteOnLoading'),
}

const addressFormSelector = {
  this: state => state.addressForm,
  lastResidentialId: state => state.addressForm.lastResidentialId,
}

const addressFormAddressSelector = state =>
  get(state, 'addressForm.residentialId') &&
  state.addressForm.addresses[state.addressForm.residentialId]

const addressFormAddressSearchSelector = state =>
  get(state, 'addressForm.searchId') &&
  state.addressForm.addresses[state.addressForm.searchId]

export const getSearchAddress = createSelector(
  addressFormAddressSearchSelector,
  searchAddress => searchAddress
)

export const getSearchAddressReceiverName = createSelector(
  addressFormAddressSearchSelector,
  searchAddress =>
    searchAddress &&
    searchAddress.receiverName &&
    searchAddress.receiverName.value
)

export const getLastResidentialId = createSelector(
  addressFormSelector.lastResidentialId,
  lastResidentialId => lastResidentialId
)

export const getAddress = createSelector(
  addressFormAddressSelector,
  address => address
)

export const getAddressPostalCode = createSelector(
  addressFormAddressSelector,
  address => address && address.postalCode && address.postalCode.value
)

export const getSearchAddressGeoCoordinates = createSelector(
  addressFormAddressSearchSelector,
  address =>
    address &&
    get(address, 'geoCoordinates.value') &&
    address.geoCoordinates.value.length > 0
)

export const isValidAddress = createSelector(
  addressFormSelector.this,
  orderFormSelector.canEditData,
  addressFormAddressSelector,
  (addressForm, canEditData, deliveryAddress) => {
    if (deliveryAddress && isGiftRegistry(deliveryAddress)) {
      return true
    }

    if (!canEditData) {
      return !canEditData
    }

    return addressForm.valid
  }
)

export const isAddressGiftRegistry = createSelector(
  addressFormAddressSelector,
  address => address && get(address, 'addressType.value') === GIFT_REGISTRY
)

export const isValidPostalGeolocation = createSelector(
  addressFormAddressSelector,
  clientProfileDataSelector.profileCompleteOnLoading,
  orderFormSelector.canEditData,
  (address, profileCompleteOnLoading, canEditData) => {
    if (
      !isGiftRegistry(address) &&
      address.postalCode &&
      address.postalCode.loading &&
      canEditData
    ) {
      return false
    }

    if (
      isGiftRegistry(address) ||
      !canEditData ||
      (profileCompleteOnLoading &&
        canEditData &&
        get(address, 'postalCode.value'))
    ) {
      return true
    }

    const hasValidPostalCode = get(address, 'postalCode.valid') !== undefined
    const hasValidGeolocation =
      get(address, 'geoCoordinates.valid') !== undefined

    const postalCodeValid = hasValidPostalCode && address.postalCode.valid
    const geoCoordinatesValid =
      hasValidGeolocation && address.geoCoordinates.valid

    const autocompleteExists =
      get(address, 'postalCode.geolocationAutoCompleted') !== undefined ||
      get(address, 'postalCode.postalCodeAutoCompleted') !== undefined

    const postalCodeExists =
      get(address, 'postalCode.value') && address.postalCode.value.length > 0

    const geoCoordinatesExists =
      get(address, 'geoCoordinates.value') &&
      address.geoCoordinates.value.length > 0

    return hasValidPostalCode && hasValidGeolocation
      ? postalCodeValid && geoCoordinatesValid
      : hasValidPostalCode
        ? postalCodeValid
        : (postalCodeExists && autocompleteExists) || geoCoordinatesExists
  }
)

export const hasValidPostalCode = createSelector(
  addressFormAddressSelector,
  orderFormSelector.canEditData,
  (address, canEditData) =>
    (address && address.postalCode && !!address.postalCode.valid) ||
    !canEditData
)
