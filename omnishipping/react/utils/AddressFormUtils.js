import getGGUID from './Gguid'
import get from 'lodash/get'
import {
  RESIDENTIAL,
  GIFT_REGISTRY,
  COMMERCIAL,
  SEARCH,
} from '../constants/index'
import { removeNonWords } from './StringUtils'
import { isString } from 'util'
import omit from 'lodash/omit'

function checkIfSamePostalCode(
  actionAddress,
  addressId,
  addresses,
  checkPostalCode = false
) {
  if (!checkPostalCode) {
    return true
  }

  return (
    actionAddress.postalCode &&
    addresses[addressId].postalCode.value &&
    removeNonWords(actionAddress.postalCode) ===
      removeNonWords(addresses[addressId].postalCode.value)
  )
}

export function newAddress(address) {
  const {
    addressType,
    city,
    complement,
    country,
    geoCoordinates,
    neighborhood,
    number,
    postalCode,
    receiverName,
    reference,
    state,
    street,
    addressQuery,
    addressId,
  } = address

  return {
    addressId: addressId || getGGUID(),
    addressType: addressType || 'residential',
    city: city || null,
    complement: complement || null,
    country: country || null,
    geoCoordinates: geoCoordinates || [],
    neighborhood: neighborhood || null,
    number: number || null,
    postalCode: postalCode || null,
    receiverName: receiverName || null,
    reference: reference || null,
    state: state || null,
    street: street || null,
    addressQuery: addressQuery || '',
  }
}

export function getActionAddress(action, addressType) {
  return (
    findAddress(action, 'selectedAddresses', addressType) ||
    findAddress(action, 'availableAddresses', addressType)
  )
}

export function findAddressByType(addressForm, addressType) {
  if (!addressForm) return

  const { addresses, residentialId, searchId } = addressForm

  return {
    [RESIDENTIAL]: addresses[residentialId],
    [COMMERCIAL]: addresses[residentialId],
    [SEARCH]: addresses[searchId],
  }[addressType]
}

export function findAddress(action, addressState, addressType) {
  const shippingData = 'orderForm.shippingData'
  const hasAddress = get(action, `${shippingData}.${addressState}`)

  return (
    hasAddress &&
    action.orderForm.shippingData[addressState].find(
      item => item.addressType === addressType
    )
  )
}

export function isGiftRegistry(address) {
  return isCurrentAddressType(address, GIFT_REGISTRY)
}

export function isResidential(address) {
  return (
    isCurrentAddressType(address, RESIDENTIAL) ||
    isCurrentAddressType(address, COMMERCIAL)
  )
}

export function isSearch(address) {
  return isCurrentAddressType(address, SEARCH)
}

function isCurrentAddressType(address, addressType) {
  if (address && !get(address, 'addressType')) return false

  if (address && isString(address.addressType)) {
    return address.addressType === addressType
  }
  return address && address.addressType.value === addressType
}

export function checkIfHasGeoCoordinates(searchAddress) {
  return (
    searchAddress &&
    get(searchAddress, 'geoCoordinates.value') &&
    searchAddress.geoCoordinates.value.length > 0
  )
}

export function checkIfHasPostalCode(searchAddress, address) {
  return (
    (searchAddress && !!get(searchAddress, 'postalCode.value')) ||
    !!get(address, 'postalCode.value')
  )
}

export function hasFirstAndLastName(action) {
  return (
    get(action, 'orderForm.clientProfileData.firstName') &&
    get(action, 'orderForm.clientProfileData.lastName')
  )
}

export function formatReceiverName(action) {
  return (
    hasFirstAndLastName(action) &&
    `${action.orderForm.clientProfileData.firstName} ${
      action.orderForm.clientProfileData.lastName
    }`
  )
}

export function isActionAddressEqualState(
  actionAddress,
  addressId,
  addresses,
  checkPostalCode = false
) {
  return (
    actionAddress &&
    addressId &&
    actionAddress.addressId === addresses[addressId].addressId.value &&
    checkIfSamePostalCode(actionAddress, addressId, addresses, checkPostalCode)
  )
}

export function getAvailableAddresses(action) {
  return (
    action.orderForm &&
    get(action, 'orderForm.shippingData.availableAddresses') &&
    action.orderForm.shippingData.availableAddresses.filter(
      address => isResidential(address) || isGiftRegistry(address)
    )
  )
}

export function getSelectedAddresses(action) {
  return (
    action.orderForm &&
    get(action, 'orderForm.shippingData.selectedAddresses') &&
    action.orderForm.shippingData.selectedAddresses.filter(
      address => isResidential(address) || isGiftRegistry(address)
    )
  )
}

export function getSelectedAddress(selectedAddresses) {
  return (
    selectedAddresses &&
    selectedAddresses.find(
      address => isResidential(address) || isGiftRegistry(address)
    )
  )
}

export function hasPostalCodeOnlyNumber(postalCodeMask) {
  return postalCodeMask && /^\d+$/.test(removeNonWords(postalCodeMask))
}

export function addPostalCodeAutoCompleted(address) {
  const newAddress = {
    ...address,
  }

  for (const key in newAddress) {
    newAddress[key] = {
      ...newAddress[key],
      ...(newAddress[key].value &&
      newAddress[key].value.indexOf('::') === -1 &&
      shouldAddPostalCodeAutoCompleted(key)
        ? { postalCodeAutoCompleted: true }
        : {}),
    }
  }

  return newAddress
}

export function removePostalCodeAutoCompleted(address) {
  const newAddress = {
    ...address,
  }

  for (const key in newAddress) {
    newAddress[key] = {
      ...omit(newAddress[key], 'postalCodeAutoCompleted'),
    }
  }

  return newAddress
}

function shouldAddPostalCodeAutoCompleted(field) {
  const excludedFieldsList = [
    'addressId',
    'addressType',
    'receiverName',
    'addressQuery',
    'geoCoordinates',
    'number',
  ]

  const isFieldInExcludedList = excludedFieldsList.some(
    localField => localField === field
  )

  return !isFieldInExcludedList
}

export function unifyAddress(address, newAddress) {
  const keys = Object.keys(address || newAddress)
  const resultAddress = {}

  keys.forEach(key => {
    resultAddress[key] = {
      ...(address ? address[key] : {}),
      ...(newAddress ? newAddress[key] : {}),
    }
  })

  return resultAddress
}
