import {
  AVAILABLE,
  PICKUP_IN_STORE,
  RESIDENTIAL,
  GIFT_REGISTRY,
} from '../constants'

import { createSelector } from 'reselect'
import flatten from 'lodash/flatten'
import get from 'lodash/get'
import { getLastResidentialId } from './address-form-selectors'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import { hasDeliveryWindows } from '../utils/SlasUtils'
import { isResidential, isGiftRegistry } from '../utils/AddressFormUtils'
import { isPickup } from '../utils/DeliveryChannelsUtils'

export const orderFormSelector = {
  this: state => state.orderForm,
  canEditData: state => state.orderForm.canEditData,
  items: state => get(state, 'orderForm.items'),
  loggedIn: state => state.orderForm.loggedIn,
  sellers: state => state.orderForm.sellers,
  storePreferencesData: state => get(state, 'orderForm.storePreferencesData'),
}

export const deliverySelector = {
  this: state => state.delivery,
  selectedPackage: state => state.delivery[state.delivery.activeDeliveryOption],
}

const SDPath = 'orderForm.shippingData'
const hasLogisticsInfo = state => get(state, `${SDPath}.logisticsInfo`)

const shippingDataSelector = {
  this: state => get(state, SDPath),
  availableAddresses: state => get(state, `${SDPath}.availableAddresses`),
  logisticsInfo: state => hasLogisticsInfo(state) || [],
  selectedAddresses: state => get(state, `${SDPath}.selectedAddresses`),
}

const clientProfileDataSelector = {
  email: state => get(state, 'orderForm.clientProfileData.email'),
  profileCompleteOnLoading: state =>
    get(state, 'orderForm.clientProfileData.profileCompleteOnLoading'),
}

const clientPreferencesDataSelector = {
  locale: state => get(state, 'orderForm.clientPreferencesData.locale'),
}

const storePreferencesDataSelector = {
  accountName: state => state.orderForm.storePreferencesData.accountName,
}

const slasSelector = (_, props) => props.slas

const packageSelector = (_, props) => props.liPackage

const hasAddress = (address, addressType = RESIDENTIAL) => {
  return (
    address && !!address.find(address => address.addressType === addressType)
  )
}

const hasAddressLength = address => {
  return address && address.length > 0
}

export const getSelectedAddresses = createSelector(
  shippingDataSelector.selectedAddresses,
  selectedAddresses => selectedAddresses
)

export const getProfileCompleteOnLoading = createSelector(
  clientProfileDataSelector.profileCompleteOnLoading,
  profileCompleteOnLoading => profileCompleteOnLoading
)

export const hasAvailableDeliveryChannelPickup = createSelector(
  shippingDataSelector.logisticsInfo,
  logisticsInfo =>
    !!logisticsInfo.some(li =>
      li.deliveryChannels.some(channel => isPickup(channel))
    )
)

export const getAvailableDeliveryAddresses = createSelector(
  shippingDataSelector.availableAddresses,
  shippingDataSelector.selectedAddresses,
  orderFormSelector.canEditData,
  (availableAddresses, selectedAddresses) => {
    const newAvailableAddresses = uniqBy(
      [
        ...(availableAddresses || []),
        ...((availableAddresses &&
          availableAddresses.length === 0 &&
          selectedAddresses) ||
          []),
      ],
      'addressId'
    )

    return newAvailableAddresses.length > 0
      ? newAvailableAddresses
      : selectedAddresses
  }
)

export const getFirstAvailableAddress = createSelector(
  getAvailableDeliveryAddresses,
  getSelectedAddresses,
  getLastResidentialId,
  orderFormSelector.canEditData,
  (availableAddresses, selectedAddresses, lastResidentialId, canEditData) => {
    const selectedAddress = selectedAddresses.find(
      address =>
        address.addressType === (RESIDENTIAL || GIFT_REGISTRY) &&
        address.postalCode
    )

    const hasAvailableAddresses = availableAddresses.length > 0

    return selectedAddress && canEditData
      ? selectedAddress
      : (hasAvailableAddresses &&
          availableAddresses.find(
            address => address.addressId === lastResidentialId
          )) ||
          availableAddresses[0]
  }
)

export const getShippingData = createSelector(
  shippingDataSelector.this,
  shippingData => shippingData
)

export const hasMultipleScheduledDeliveries = createSelector(
  shippingDataSelector.logisticsInfo,
  logisticsInfo =>
    logisticsInfo.filter(li =>
      li.slas.find(sla => sla.id === li.selectedSla && hasDeliveryWindows(sla))
    ).length > 1
)

export const getOrderFormItems = createSelector(
  orderFormSelector.items,
  orderFormItems => orderFormItems || []
)

export const getOrderFormItemsByPickup = createSelector(
  getOrderFormItems,
  shippingDataSelector.logisticsInfo,
  (orderFormItems, logisticsInfo) =>
    orderFormItems.filter(
      (item, index) => logisticsInfo[index] && isPickup(logisticsInfo[index])
    )
)

export const getAccountName = createSelector(
  storePreferencesDataSelector.accountName,
  accountName => accountName
)

export const getLocale = createSelector(
  clientPreferencesDataSelector.locale,
  locale => locale || document.documentElement.lang
)

export const getUserEmail = createSelector(
  clientProfileDataSelector.email,
  email => email
)

export const getFilteredSlas = createSelector(
  slasSelector,
  packageSelector,
  (slas, liPackage) =>
    slas.filter(option => option.deliveryChannel !== PICKUP_IN_STORE).map(
      sla =>
        sla && {
          ...sla,
          price: liPackage.logisticsInfo
            .map(li => li.slas.find(liSla => liSla.id === sla.id))
            .reduce(
              (previousPrice, nextSla) =>
                nextSla ? previousPrice + nextSla.price : 0,
              0
            ),
        }
    )
)

export const getSellers = createSelector(
  orderFormSelector.sellers,
  sellers => sellers
)

export const getStoreCountryCode = createSelector(
  orderFormSelector.this,
  orderForm => orderForm && get(orderForm, 'storePreferencesData.countryCode')
)

export const getAvailableDeliveryChannels = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    uniqBy(flatten(logisticsInfo.map(li => li.deliveryChannels)), 'id')
)

export const getSelectedDeliveryChannels = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo &&
    uniq(
      logisticsInfo
        .map(item => item.selectedDeliveryChannel)
        .filter(item => item)
    )
)

export const getSelectedDeliveryChannel = createSelector(
  shippingDataSelector.logisticsInfo,
  logisticsInfo =>
    uniq(
      flatten(logisticsInfo.map(item => item.selectedDeliveryChannel))
    ).shift()
)

export const hasSelectedAddress = createSelector(
  shippingDataSelector.this,
  shippingData =>
    shippingData && hasAddressLength(shippingData.selectedAddresses)
)

export const hasAvailableAddresses = createSelector(
  shippingDataSelector.this,
  shippingData =>
    hasAddressLength(shippingData.availableAddresses) ||
    hasAddress(shippingData.selectedAddresses)
)

export const getShipsTo = createSelector(
  shippingDataSelector.logisticsInfo,
  logisticsInfo =>
    uniq(flatten(logisticsInfo ? logisticsInfo.map(item => item.shipsTo) : []))
)

export const getDefaultShipsTo = createSelector(
  getShipsTo,
  orderFormSelector.storePreferencesData,
  (shipsTo, storePreferencesData) =>
    shipsTo.find(item => item === storePreferencesData.countryCode) ||
    (storePreferencesData && storePreferencesData.countryCode)
)

export const getDefaultCountryCode = createSelector(
  orderFormSelector.storePreferencesData,
  storePreferencesData =>
    storePreferencesData && storePreferencesData.countryCode
)

export const getSelectedDeliveryAddress = createSelector(
  shippingDataSelector.this,
  shippingData =>
    shippingData.selectedAddresses.find(
      address => isResidential(address) || isGiftRegistry(address)
    )
)

export const hasUnavailableItems = createSelector(
  getOrderFormItems,
  orderFormItems =>
    orderFormItems &&
    !!orderFormItems.find(item => item.availability !== AVAILABLE)
)

export const isPickupOnly = createSelector(
  shippingDataSelector.logisticsInfo,
  logisticsInfo =>
    logisticsInfo.every(
      item =>
        item.deliveryChannels.length > 0 &&
        item.deliveryChannels.every(sla => isPickup(sla))
    )
)
