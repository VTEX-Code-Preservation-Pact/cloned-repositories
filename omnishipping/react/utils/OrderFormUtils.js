import { DELIVERY, PICKUP_IN_STORE } from '../constants'

import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { isResidential, isGiftRegistry } from '../utils/AddressFormUtils'
import { isFromCurrentSeller } from '../utils/SellerUtils'
import { findSlaWithChannel, hasSLAs, getSelectedSlaInSlas } from './SlasUtils'
import {
  findChannelById,
  isPickup,
  setSelectedDeliveryChannel,
} from './DeliveryChannelsUtils'
import { helpers } from 'vtex.address-form'
const { removeValidation } = helpers

export function findFirstItemWithPickup({ logisticsInfo, seller, items }) {
  return (
    logisticsInfo &&
    logisticsInfo.find(li => {
      const hasSellerIdMatch = seller
        ? isFromCurrentSeller({ items, li, seller })
        : true

      const hasPickupSelectedOrHasPickupInSlas =
        isPickup(li) || findSlaWithChannel(li, PICKUP_IN_STORE)

      return hasSellerIdMatch && hasPickupSelectedOrHasPickupInSlas
    })
  )
}

export function findPickupSla(firstItemWithPickup) {
  const selectedSla = getSelectedSlaInSlas(firstItemWithPickup)
  const selectedSlaIsPickup = selectedSla && isPickup(selectedSla)

  if (selectedSlaIsPickup) {
    return selectedSla
  }

  return (
    firstItemWithPickup &&
    findSlaWithChannel(firstItemWithPickup, PICKUP_IN_STORE)
  )
}

function findSlaOption(logisticsInfo, slaOption) {
  const logisticsInfoWithSla = logisticsInfo.find(li =>
    li.slas.find(sla => sla.id === slaOption)
  )

  return (
    logisticsInfoWithSla &&
    logisticsInfoWithSla.slas.find(sla => sla.id === slaOption)
  )
}

function getNewLogisticsInfoIfPickup(
  action,
  actionAddress,
  actionSearchAddress,
  channel,
  canEditData,
  firstPickupSla,
  logisticsInfo
) {
  const noSlas = logisticsInfo.slas.length === 0

  if (noSlas) {
    return {
      ...logisticsInfo,
      selectedDeliveryChannel: channel,
    }
  }

  const defaultSlaSelection =
    logisticsInfo.slas.find(
      sla => firstPickupSla && sla.id === firstPickupSla.id
    ) || findSlaWithChannel(logisticsInfo, channel)

  if (
    findChannelById(logisticsInfo, channel) &&
    isPickup(channel) &&
    defaultSlaSelection &&
    firstPickupSla &&
    defaultSlaSelection.id !== firstPickupSla.id
  ) {
    const defaultDeliverySla = findSlaWithChannel(logisticsInfo, DELIVERY)

    return {
      ...logisticsInfo,
      addressId: actionAddress.addressId,
      selectedDeliveryChannel: defaultDeliverySla ? DELIVERY : null,
      selectedSla: defaultDeliverySla ? defaultDeliverySla.id : null,
    }
  }

  const hasDifferentGeoCoordinates = !isEqual(
    actionAddress.geoCoordinates,
    actionSearchAddress.geoCoordinates
  )

  if (findChannelById(logisticsInfo, channel) && defaultSlaSelection) {
    const shouldReferenceSearchAddress =
      isPickup(channel) &&
      firstPickupSla &&
      (canEditData || hasDifferentGeoCoordinates)

    return {
      ...logisticsInfo,
      selectedDeliveryChannel: channel,
      addressId: shouldReferenceSearchAddress
        ? actionSearchAddress.addressId
        : actionAddress.addressId,
      selectedSla:
        isPickup(channel) && firstPickupSla
          ? firstPickupSla.id
          : defaultSlaSelection.id,
    }
  }
}

function getNewLogisticsInfoIfDelivery(
  actionAddress,
  channel,
  slaFromSlaOption,
  logisticsInfo
) {
  const defaultSlaSelection = findSlaWithChannel(logisticsInfo, channel)

  if (!defaultSlaSelection) {
    return {
      ...logisticsInfo,
      addressId: actionAddress.addressId,
      selectedDeliveryChannel: null,
      selectedSla: null,
    }
  }

  if (findChannelById(logisticsInfo, channel) && slaFromSlaOption) {
    return {
      ...logisticsInfo,
      addressId: actionAddress.addressId,
      selectedDeliveryChannel: channel,
      selectedSla: slaFromSlaOption.id,
    }
  }

  if (findChannelById(logisticsInfo, channel) && defaultSlaSelection) {
    return {
      ...logisticsInfo,
      addressId: actionAddress.addressId,
      selectedDeliveryChannel: channel,
      selectedSla: defaultSlaSelection.id,
    }
  }
}

function getNewLogisticsInfo(
  action,
  canEditData,
  channel,
  slaFromSlaOption,
  items,
  newLogisticsInfo,
  seller
) {
  const actionAddress = removeValidation(action.address)
  const actionSearchAddress = removeValidation(action.searchAddress)

  return newLogisticsInfo.map(li => {
    const hasSellerIdMatch = isFromCurrentSeller({ items, li, seller })

    if (!hasSellerIdMatch) {
      return li
    }

    if (isPickup(channel)) {
      const newLogisticsInfoIfPickup = getNewLogisticsInfoIfPickup(
        action,
        actionAddress,
        actionSearchAddress,
        channel,
        canEditData,
        slaFromSlaOption,
        li
      )

      if (newLogisticsInfoIfPickup) {
        return newLogisticsInfoIfPickup
      }
    } else {
      const newLogisticsInfoIfDelivery = getNewLogisticsInfoIfDelivery(
        actionAddress,
        channel,
        slaFromSlaOption,
        li
      )

      if (newLogisticsInfoIfDelivery) {
        return newLogisticsInfoIfDelivery
      }
    }

    return {
      ...li,
      addressId: actionAddress.addressId,
    }
  })
}

export function changeActiveSlas({
  logisticsInfo,
  action,
  items,
  sellers,
  channel,
  canEditData,
  slaOption,
}) {
  let newLogisticsInfo = [...logisticsInfo]

  sellers.forEach(seller => {
    const firstItemWithPickup = findFirstItemWithPickup({
      logisticsInfo,
      seller,
      items,
    })

    if (!firstItemWithPickup) return

    const firstPickupSla = slaOption
      ? findSlaOption(logisticsInfo, slaOption)
      : findPickupSla(firstItemWithPickup)

    newLogisticsInfo = getNewLogisticsInfo(
      action,
      canEditData,
      channel,
      firstPickupSla,
      items,
      newLogisticsInfo,
      seller
    )
  })

  const hasSlas = !!logisticsInfo.find(li => hasSLAs(li))

  if (!hasSlas) {
    newLogisticsInfo = newLogisticsInfo.map(li => ({
      ...li,
      selectedDeliveryChannel: channel,
    }))
  }

  return newLogisticsInfo
}

export function setSelectedSlaFromSlaOption({
  logisticsInfo,
  action,
  items,
  sellers,
  channel,
  canEditData,
  slaOption,
}) {
  let newLogisticsInfo = [...logisticsInfo]

  sellers.forEach(seller => {
    const slaFromSlaOption = findSlaOption(logisticsInfo, slaOption)

    newLogisticsInfo = getNewLogisticsInfo(
      action,
      canEditData,
      channel,
      slaFromSlaOption,
      items,
      newLogisticsInfo,
      seller
    )
  })

  if (!hasSLAs(logisticsInfo)) {
    newLogisticsInfo = setSelectedDeliveryChannel(channel)
  }

  return newLogisticsInfo
}

export function filterSelectedAddresses({
  canEditData,
  deliveryAddress,
  searchAddress,
}) {
  const newSelectedAddresses = [deliveryAddress, searchAddress].filter(
    address => {
      if (!address) return false

      const hasGeocoodinatesValue =
        address &&
        address.geoCoordinates.value &&
        address.geoCoordinates.value.length > 0

      const hasPostalCodeValue = address && get(address, 'postalCode.value')

      const hasValues = hasGeocoodinatesValue || hasPostalCodeValue

      return (
        hasValues ||
        isGiftRegistry(address) ||
        (hasValues && !canEditData && isResidential(address))
      )
    }
  )

  return (
    newSelectedAddresses.map(address => address && removeValidation(address)) ||
    []
  )
}
