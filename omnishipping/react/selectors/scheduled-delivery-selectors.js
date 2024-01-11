import { createSelector } from 'reselect'
import { deliverySelector } from './delivery-selectors'
import { componentActivitySelector } from './component-activity-selectors'
import { isFromCurrentSeller } from '../utils/SellerUtils'
import { orderFormSelector } from './order-form-selectors'
import {
  getSelectedSlaInSlas,
  hasSLAs,
  hasDeliveryWindows,
  getSlaPrice,
} from '../utils/SlasUtils'
import {
  isCurrentChannel,
  isDelivery,
  isPickup,
} from '../utils/DeliveryChannelsUtils'
import uniqBy from 'lodash/uniqBy'
import isNumber from 'lodash/isNumber'
import intersection from 'lodash/intersection'

const channelFromProps = (_, props) => props && props.channel

function hasChannelAndDeliveryWindows(sla, channel) {
  return channel
    ? isCurrentChannel(sla, channel) && hasDeliveryWindows(sla)
    : hasDeliveryWindows(sla)
}

function findScheduledDeliverySla(slas, channel) {
  return slas.find(sla => hasChannelAndDeliveryWindows(sla, channel))
}

function filterScheduledDeliverySla(slas, channel) {
  return slas.filter(sla => hasChannelAndDeliveryWindows(sla, channel))
}

function getSelectedSla(li) {
  return li.slas.find(sla => sla.id === li.selectedSla)
}

function getSelectedScheduledDeliveries(logisticsInfo, channel, seller, items) {
  const selectedScheduledDelivery = []

  logisticsInfo
    .filter(
      li =>
        li &&
        isFromCurrentSeller({ items, li, seller }) &&
        isCurrentChannel(li, channel)
    )
    .forEach(li => {
      if (
        li &&
        items[li.itemIndex] &&
        items[li.itemIndex].seller !== seller.id
      ) {
        return false
      }

      const selectedSla = getSelectedSla(li)
      if (
        selectedSla &&
        !selectedScheduledDelivery.some(sd => sd.id === selectedSla.id)
      ) {
        selectedScheduledDelivery.push(selectedSla)
      }
    })

  return selectedScheduledDelivery
}

function getScheduledDeliverySLAs(logisticsInfo, channel, items, seller) {
  let localScheduledDeliverySLAs = []

  logisticsInfo.forEach(li => {
    if (
      !li ||
      (li &&
        hasSLAs(li) &&
        isFromCurrentSeller({ items, li, seller }) &&
        li.selectedDeliveryChannel !== channel)
    ) {
      return
    }

    localScheduledDeliverySLAs = [
      ...localScheduledDeliverySLAs,
      ...li.slas.filter(sla => hasDeliveryWindows(sla)),
    ]
  })

  const filteredSlas = uniqBy(localScheduledDeliverySLAs, 'id')

  const filteredSlasWithUpdatedPrice = getUpdatedPrices(
    filteredSlas,
    logisticsInfo
  )

  return filteredSlasWithUpdatedPrice
}

function getUpdatedPrices(slas, logisticsInfo) {
  return slas.map(sla => {
    const itemsPrice = getSlaPrice(logisticsInfo, sla)

    const selectedDeliveryWindowPrice =
      sla.deliveryWindow && sla.deliveryWindow.price

    const cheapestDeliveryWindowPrice =
      sla.availableDeliveryWindows.length > 0 &&
      sla.availableDeliveryWindows.reduce(
        (cheapestDeliveryWindow, currDeliveryWindow) => {
          if (isNumber(cheapestDeliveryWindow)) {
            return currDeliveryWindow.price < cheapestDeliveryWindow
              ? currDeliveryWindow.price
              : cheapestDeliveryWindow
          }
          return currDeliveryWindow.price < cheapestDeliveryWindow.price
            ? currDeliveryWindow.price
            : cheapestDeliveryWindow.price
        }
      )

    return {
      ...sla,
      price:
        itemsPrice +
        (selectedDeliveryWindowPrice || cheapestDeliveryWindowPrice),
    }
  })
}

export const hasScheduledDelivery = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    !!logisticsInfo.find(li => li.slas.find(sla => hasDeliveryWindows(sla)))
)

export const hasDeliveryScheduledDelivery = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo
      .filter(li => isDelivery(li))
      .some(li =>
        li.slas.some(sla => isDelivery(sla) && hasDeliveryWindows(sla))
      )
)

export const getScheduledDeliveries = createSelector(
  deliverySelector.selectedPackage,
  orderFormSelector.items,
  orderFormSelector.sellers,
  channelFromProps,
  (logisticsInfo, items, sellers, channel) => {
    return sellers.map(seller => {
      const scheduledDeliverySLAs = getScheduledDeliverySLAs(
        logisticsInfo,
        channel,
        items,
        seller
      )

      const selectedScheduledDeliveries = getSelectedScheduledDeliveries(
        logisticsInfo,
        channel,
        seller,
        items
      )

      return {
        slas: scheduledDeliverySLAs,
        selectedScheduledDeliveries: selectedScheduledDeliveries.map(
          (scheduledDelivery, index) => {
            const previousHasSelectedWindow =
              !!selectedScheduledDeliveries[index - 1] &&
              !!selectedScheduledDeliveries[index - 1].deliveryWindow
            const isFirstAndNotSelectedWindow =
              index === 0 && !scheduledDelivery.deliveryWindow

            return {
              seller,
              previousHasSelectedWindow:
                previousHasSelectedWindow || isFirstAndNotSelectedWindow,
              selectedScheduledDelivery: {
                ...scheduledDelivery,
                price: getSlaPrice(logisticsInfo, scheduledDelivery),
              },
              items: items.filter((item, index) => {
                const isFromCurrentSeller = item.seller === seller.id

                const hasSelectedDeliveryScheduledDelivery =
                  logisticsInfo[index] &&
                  logisticsInfo[index].selectedSla === scheduledDelivery.id

                const isFromCurrentChannel = isDelivery(channel)
                  ? !isPickup(logisticsInfo[index])
                  : !isDelivery(logisticsInfo[index])

                return (
                  isFromCurrentSeller &&
                  hasSelectedDeliveryScheduledDelivery &&
                  isFromCurrentChannel
                )
              }),
            }
          }
        ),
      }
    })
  }
)

export const getScheduledDeliveryLI = createSelector(
  deliverySelector.selectedPackage,
  channelFromProps,
  (logisticsInfo, channel) =>
    logisticsInfo &&
    logisticsInfo.filter(li => findScheduledDeliverySla(li.slas, channel))
)

export const hasAllItemsSelectedScheduledDeliveries = createSelector(
  deliverySelector.selectedPackage,
  channelFromProps,
  (logisticsInfo, channel) => {
    return (
      logisticsInfo &&
      !logisticsInfo.some(li => {
        const selectedSla = getSelectedSla(li)

        const hasChannelAndIsCurrentChannel = channel
          ? isCurrentChannel(li, channel)
          : true

        return (
          selectedSla &&
          hasChannelAndIsCurrentChannel &&
          !hasDeliveryWindows(selectedSla)
        )
      })
    )
  }
)

export const hasSelectedDeliveryWindow = createSelector(
  getScheduledDeliveryLI,
  channelFromProps,
  (logisticsInfo, channel) =>
    logisticsInfo &&
    logisticsInfo.filter(li => isCurrentChannel(li, channel)).some(li => {
      const selectedSla = getSelectedSla(li)
      return selectedSla && selectedSla.deliveryWindow
    })
)

export const getScheduledDeliveryAmount = createSelector(
  getScheduledDeliveries,
  scheduledDeliveries => scheduledDeliveries.length
)

export const getScheduledDeliveryCheapestPrice = createSelector(
  getScheduledDeliveryLI,
  channelFromProps,
  (scheduledDeliveryLogisticsInfo, channel) => {
    let scheduledDeliverySLAs = []

    scheduledDeliveryLogisticsInfo &&
      scheduledDeliveryLogisticsInfo.forEach(li => {
        scheduledDeliverySLAs = [
          ...scheduledDeliverySLAs,
          ...filterScheduledDeliverySla(li.slas, channel),
        ]
      })

    const cheapestSLA =
      hasSLAs(scheduledDeliverySLAs) &&
      scheduledDeliverySLAs.reduce(
        (prevSLA, currSLA) =>
          prevSLA && prevSLA.price < currSLA.price ? prevSLA : currSLA
      )

    return cheapestSLA && cheapestSLA.price
  }
)

export const hasSelectedScheduledDelivery = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => {
    return (
      logisticsInfo &&
      !!logisticsInfo.find(logisticsInfoItem => {
        const selectedSla = getSelectedSlaInSlas(logisticsInfoItem)
        return selectedSla && hasDeliveryWindows(selectedSla)
      })
    )
  }
)

export const hasSelectedDeliveryScheduledDelivery = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => {
    return (
      !!logisticsInfo &&
      logisticsInfo.some(logisticsInfoItem => {
        const selectedSla = getSelectedSlaInSlas(logisticsInfoItem)
        return (
          isDelivery(logisticsInfoItem) &&
          selectedSla &&
          hasDeliveryWindows(selectedSla)
        )
      })
    )
  }
)

export const hasLIWithOnlyScheduledDelivery = createSelector(
  deliverySelector.selectedPackage,
  channelFromProps,
  (logisticsInfo, channel) => {
    const filteredLogisticsInfo = channel
      ? logisticsInfo.filter(li => isCurrentChannel(li, channel))
      : logisticsInfo

    return (
      filteredLogisticsInfo &&
      filteredLogisticsInfo.some(li => {
        const filteredSlas = channel
          ? li.slas.filter(sla => isCurrentChannel(sla, channel))
          : li.slas

        return filteredSlas.every(sla => hasDeliveryWindows(sla))
      })
    )
  }
)

export const shouldShowScheduledDeliveryOptions = createSelector(
  deliverySelector.selectedPackage,
  componentActivitySelector.activeDeliveryChannel,
  (logisticsInfo, activeDeliveryChannel) => {
    const filteredLogisticsInfo = logisticsInfo.filter(li => li.slas.length > 0)

    if (filteredLogisticsInfo.length === 1) {
      const filteredSlas = filteredLogisticsInfo[0].slas.filter(
        sla =>
          isCurrentChannel(sla, activeDeliveryChannel) &&
          hasDeliveryWindows(sla)
      )

      return filteredSlas.length > 1
    }

    const deliveries = filteredLogisticsInfo.map(li => {
      const localDeliveries = []

      li.slas.forEach(sla => {
        if (
          isCurrentChannel(sla, activeDeliveryChannel) &&
          hasDeliveryWindows(sla)
        ) {
          localDeliveries.push(sla.id)
        }
      })

      return localDeliveries
    })

    const commonScheduledDeliveries = intersection(...deliveries)

    return commonScheduledDeliveries.length > 0
  }
)
