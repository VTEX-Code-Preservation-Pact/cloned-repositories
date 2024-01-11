import { isFromCurrentSeller } from './SellerUtils'
import { hasDeliveryWindows } from './SlasUtils'
import { isDelivery, isPickup, isCurrentChannel } from './DeliveryChannelsUtils'
import { CHEAPEST, COMBINED, FASTEST } from '../constants'

function getSelectedSlaFromSlaOption(li, slaOption) {
  return li.slas.find(sla => sla.id === slaOption && sla.id === li.selectedSla)
}

export function hasOnlyScheduledDelivery(slas, channel) {
  return (
    slas.filter(sla => isCurrentChannel(channel) && !hasDeliveryWindows(sla))
      .length === 0
  )
}

function checkIfHasDeliveryWindow(selectedSla, actionDeliveryWindow) {
  return (
    selectedSla &&
    selectedSla.availableDeliveryWindows.find(
      deliveryWindow =>
        actionDeliveryWindow &&
        deliveryWindow.startDateUtc === actionDeliveryWindow.startDateUtc &&
        deliveryWindow.endDateUtc === actionDeliveryWindow.endDateUtc
    )
  )
}

export function selectDeliveryWindow(logisticsInfo, action) {
  return logisticsInfo.map(li => {
    const selectedSla = getSelectedSlaFromSlaOption(li, action.slaOption)

    const hasDeliveryWindow = checkIfHasDeliveryWindow(
      selectedSla,
      action.deliveryWindow
    )

    if (selectedSla && action.deliveryWindow && hasDeliveryWindow) {
      return {
        ...li,
        slas: li.slas.map(sla => ({
          ...sla,
          deliveryWindow:
            (sla.id === selectedSla.id && action.deliveryWindow) ||
            sla.deliveryWindow,
        })),
        deliveryWindow: action.deliveryWindow,
      }
    }

    return li
  })
}

function getScheduledDeliverySLA(li) {
  return li.slas.find(sla => isDelivery(sla) && hasDeliveryWindows(sla))
}

function getFirstScheduledDelivery(logisticsInfo, seller, items) {
  let firstScheduledSlaSeller = null

  logisticsInfo.forEach(li => {
    const firstScheduledDelivery = getScheduledDeliverySLA(li)

    if (
      firstScheduledDelivery &&
      !firstScheduledSlaSeller &&
      isFromCurrentSeller({ items, li, seller })
    ) {
      firstScheduledSlaSeller = firstScheduledDelivery
    }
  })

  return firstScheduledSlaSeller
}

function getNewLogisticsInfo(
  logisticsInfo,
  firstScheduledSlaSeller,
  seller,
  items
) {
  return logisticsInfo.map(li => {
    const hasScheduledDelivery = li.slas.find(
      sla => sla.id === firstScheduledSlaSeller.id
    )

    if (
      items[li.itemIndex].seller !== seller.id ||
      !hasScheduledDelivery ||
      isPickup(li)
    ) {
      return li
    }

    return {
      ...li,
      selectedSla: firstScheduledSlaSeller.id,
    }
  })
}

function selectScheduledDeliveryOption(logisticsInfo, items, sellers) {
  if (!logisticsInfo) return

  let newLogisticsInfo = [...logisticsInfo]

  sellers.forEach(seller => {
    const firstScheduledSlaSeller = getFirstScheduledDelivery(
      newLogisticsInfo,
      seller,
      items
    )

    if (firstScheduledSlaSeller) {
      newLogisticsInfo = getNewLogisticsInfo(
        logisticsInfo,
        firstScheduledSlaSeller,
        seller,
        items
      )
    }
  })
  return newLogisticsInfo
}

export function selectScheduledDeliveryHelper(state, items, sellers) {
  const newCheapest =
    state[CHEAPEST] &&
    selectScheduledDeliveryOption(state[CHEAPEST], items, sellers)

  const newCombined =
    state[COMBINED] &&
    selectScheduledDeliveryOption(state[COMBINED], items, sellers)

  const newFastest =
    state[FASTEST] &&
    selectScheduledDeliveryOption(state[FASTEST], items, sellers)

  return {
    ...(newCheapest ? { [CHEAPEST]: newCheapest } : {}),
    ...(newCombined ? { [COMBINED]: newCombined } : {}),
    ...(newFastest ? { [FASTEST]: newFastest } : {}),
  }
}
