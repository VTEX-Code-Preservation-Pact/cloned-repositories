import isString from 'lodash/isString'
import get from 'lodash/get'
import uniqBy from 'lodash/uniqBy'
import flatten from 'lodash/flatten'
import { PICKUP_IN_STORE, DELIVERY, PICKUP } from '../constants'
import { hasSLAs } from './SlasUtils'
import { getItem } from './LocalStorageUtils'

function getDeliveryChannel(deliveryChannelSource) {
  if (isString(deliveryChannelSource)) {
    return deliveryChannelSource
  }
  return (
    get(deliveryChannelSource, 'deliveryChannel') ||
    get(deliveryChannelSource, 'selectedDeliveryChannel') ||
    get(deliveryChannelSource, 'id')
  )
}

export function isCurrentChannel(deliveryChannelSource, currentChannel) {
  const deliveryChannel = getDeliveryChannel(deliveryChannelSource)
  return deliveryChannel === currentChannel
}

export function isPickup(deliveryChannelSource) {
  const deliveryChannel = getDeliveryChannel(deliveryChannelSource)
  return deliveryChannel === PICKUP_IN_STORE
}

export function isDelivery(deliveryChannelSource) {
  const deliveryChannel = getDeliveryChannel(deliveryChannelSource)
  return deliveryChannel === DELIVERY
}

export function findChannelById(li, channel) {
  return !!li.deliveryChannels.find(liChannel => liChannel.id === channel)
}

export function hasOnlyCurrentDeliveryChannel(li, currentChannel) {
  return (
    li &&
    li.deliveryChannels &&
    li.deliveryChannels.every(channel => channel.id === currentChannel)
  )
}

export function isUnavailable(li) {
  return (
    hasSLAs(li) &&
    li.selectedSla === null &&
    li.selectedDeliveryChannel === null
  )
}

export function getDeliveryChannelFromLocalStorage() {
  const aditionalShippingData = getItem('aditionalShippingData')
  const activeTab =
    aditionalShippingData && aditionalShippingData.activeTab === PICKUP
      ? PICKUP_IN_STORE
      : aditionalShippingData && aditionalShippingData.activeTab
  return activeTab
}

export function getActiveDeliveryChannel(logisticsInfo) {
  const deliveryChannels = uniqBy(
    flatten(logisticsInfo.map(li => li.deliveryChannels)),
    'id'
  )

  if (deliveryChannels.length > 1) {
    return getDeliveryChannelFromLocalStorage() || DELIVERY
  }

  if (deliveryChannels[0]) {
    return deliveryChannels[0].id
  }

  return DELIVERY
}

export function setSelectedDeliveryChannel(logisticsInfo, deliveryChannel) {
  if (Array.isArray(logisticsInfo)) {
    return logisticsInfo.map(li => ({
      ...li,
      selectedDeliveryChannel: deliveryChannel,
    }))
  }

  return (
    logisticsInfo && {
      ...logisticsInfo,
      selectedDeliveryChannel: deliveryChannel,
    }
  )
}
