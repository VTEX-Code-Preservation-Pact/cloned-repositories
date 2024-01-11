import { isCurrentChannel, isPickup, isDelivery } from './DeliveryChannelsUtils'
import { hasOnlyScheduledDelivery } from './ScheduledDeliveryUtils'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export function hasSLAs(slasSource) {
  if (Array.isArray(slasSource) && slasSource.some(li => li.slas)) {
    return slasSource.some(li => li.slas.length > 0)
  }

  if (slasSource && slasSource.slas) {
    return slasSource.slas.length > 0
  }

  return !!slasSource && slasSource.length > 0
}

export function hasDeliveryWindows(sla) {
  return sla && sla.availableDeliveryWindows.length > 0
}

export function getSelectedSlaInSlas(item) {
  return item.slas && item.slas.find(sla => sla.id === item.selectedSla)
}

export function sortSlasById(logisticsInfo) {
  return logisticsInfo.map(item => {
    const sortedSlas = sortBy(item.slas, 'id')
    return {
      ...item,
      slas: sortedSlas,
    }
  })
}

export function findSlaWithChannel(item, channel) {
  return (
    item.slas &&
    item.slas.find(
      sla =>
        hasOnlyScheduledDelivery(item.slas, channel)
          ? isCurrentChannel(sla, channel)
          : isCurrentChannel(sla, channel) && !hasDeliveryWindows(sla)
    )
  )
}

export function hasPickupSlas(action) {
  return (
    action &&
    get(action, 'orderForm.shippingData.logisticsInfo') &&
    action.orderForm.shippingData.logisticsInfo.some(li =>
      li.deliveryChannels.some(channel => isPickup(channel))
    )
  )
}

export function hasOnlyPickupSlas(actionLogisticsInfo) {
  return (
    actionLogisticsInfo &&
    !actionLogisticsInfo.find(
      li => hasSLAs(li) && li.slas.find(sla => isDelivery(sla))
    )
  )
}
export function hasSelectedPickupsSlas(actionLogisticsInfo) {
  return (
    actionLogisticsInfo &&
    !!actionLogisticsInfo.find(li => {
      const selectedSla = getSelectedSlaInSlas(li)
      return selectedSla && isPickup(selectedSla)
    })
  )
}

export function hasAnySlaInLogisticsInfo(logisticsInfo) {
  return logisticsInfo && !!logisticsInfo.find(item => hasSLAs(item))
}

export function getSlaPrice(logisticsInfo, sla) {
  return logisticsInfo.reduce((accumulatedPrice, currentLi) => {
    const localSla = currentLi.slas.find(localSla => localSla.id === sla.id)

    return localSla ? accumulatedPrice + localSla.price : accumulatedPrice
  }, 0)
}
