import {
  hasAvailableAddresses,
  hasSelectedAddress,
  hasUnavailableItems,
} from './order-form-selectors'
import {
  hasDeliverySlaSelected,
  hasSelectedPickups,
  hasSelectedSlasAndScheduledDeliveries,
  deliverySelector,
  hasSelectedSlas,
} from './delivery-selectors'

import { createSelector } from 'reselect'
import get from 'lodash/get'
import { hasUnavailablePickupItems } from './unavailable-selectors'
import { isValidAddress, getAddress } from './address-form-selectors'
import { isPickup, isDelivery } from '../utils/DeliveryChannelsUtils'
import { isGiftRegistry } from '../utils/AddressFormUtils'

const orderFormSelector = {
  canEditData: state => state.orderForm.canEditData,
  loggedIn: state => state.orderForm.loggedIn,
}

const componentActivitySelector = {
  isOmniShippingCompleted: state =>
    state.componentActivity && state.componentActivity.isOmniShippingCompleted,
  isAddressListActive: state =>
    state.componentActivity && state.componentActivity.isAddressListActive,
  activeDeliveryChannel: state =>
    state.componentActivity && state.componentActivity.activeDeliveryChannel,
}

const postalCodeSelector = state =>
  state.addressForm.addresses[state.addressForm.residentialId] &&
  state.addressForm.addresses[state.addressForm.residentialId].postalCode

const geoCoordinatesSelector = state =>
  (state.addressForm &&
    get(
      state.addressForm,
      'addresses[state.addressForm.searchId].geoCoordinates'
    )) ||
  []

export const hasSelectedDeliveryChannelDelivery = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => !!logisticsInfo.find(li => isDelivery(li))
)

export const hasSelectedDeliveryChannelPickup = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => logisticsInfo && !!logisticsInfo.find(li => isPickup(li))
)

export const isPaymentButtonActive = createSelector(
  componentActivitySelector.isOmniShippingCompleted,
  hasSelectedAddress,
  hasSelectedSlas,
  hasDeliverySlaSelected,
  hasUnavailableItems,
  hasUnavailablePickupItems,
  postalCodeSelector,
  orderFormSelector.canEditData,
  orderFormSelector.loggedIn,
  geoCoordinatesSelector,
  hasSelectedDeliveryChannelPickup,
  hasSelectedPickups,
  componentActivitySelector.activeDeliveryChannel,
  getAddress,
  (
    isOmniShippingCompleted,
    hasSelectedAddress,
    hasSelectedSlas,
    hasDeliverySlaSelected,
    hasUnavailableItems,
    hasUnavailablePickupItems,
    postalCode,
    canEditData,
    loggedIn,
    geoCoordinates,
    hasSelectedDeliveryChannelPickup,
    hasSelectedPickups,
    activeDeliveryChannel,
    address
  ) => {
    const isLoggedAndCanEdit = (canEditData && loggedIn) || canEditData
    const notLoggedAndHasSelectedPickups = !canEditData && hasSelectedPickups
    const noGeoCoordinates = geoCoordinates.length === 0
    const postalCodeNoLoading =
      isGiftRegistry(address) || (postalCode && !postalCode.loading)

    const postalCodeValidAndNoLoading =
      isGiftRegistry(address) || (postalCodeNoLoading && !!postalCode.valid)

    const onlyAvailable = !hasUnavailableItems && !hasUnavailablePickupItems
    const activeDeliveryChannelDelivery = isDelivery(activeDeliveryChannel)
    const activeDeliveryChannelPickup = isPickup(activeDeliveryChannel)

    const pickupConditions =
      hasSelectedDeliveryChannelPickup &&
      ((noGeoCoordinates || hasSelectedPickups) && postalCodeNoLoading)

    const basicConditions =
      !isOmniShippingCompleted &&
      hasSelectedAddress &&
      hasSelectedSlas &&
      onlyAvailable

    if (basicConditions && activeDeliveryChannelDelivery) {
      return (
        !canEditData ||
        ((isLoggedAndCanEdit && pickupConditions) ||
          postalCodeValidAndNoLoading)
      )
    }
    if (basicConditions && activeDeliveryChannelPickup) {
      return (
        notLoggedAndHasSelectedPickups ||
        (isLoggedAndCanEdit && hasSelectedPickups && postalCodeNoLoading)
      )
    }

    return false
  }
)

export const isAddressListActive = createSelector(
  componentActivitySelector.isOmniShippingCompleted,
  hasAvailableAddresses,
  componentActivitySelector.isAddressListActive,
  (isOmniShippingCompleted, hasAvailableAddresses, showAddressList) =>
    showAddressList && (!isOmniShippingCompleted && hasAvailableAddresses)
)

export const shouldCompleteOmnishipping = createSelector(
  hasDeliverySlaSelected,
  hasSelectedSlasAndScheduledDeliveries,
  hasSelectedAddress,
  isValidAddress,
  (
    hasDeliverySlaSelected,
    hasSelectedSlasAndScheduledDeliveries,
    hasSelectedAddress,
    isValidAddress
  ) =>
    (isValidAddress &&
      hasSelectedAddress &&
      hasSelectedSlasAndScheduledDeliveries) ||
    (hasSelectedSlasAndScheduledDeliveries && !hasDeliverySlaSelected)
)
