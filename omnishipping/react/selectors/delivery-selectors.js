import {
  CHEAPEST,
  COMBINED,
  DELIVERY,
  FASTEST,
  PICKUP_IN_STORE,
} from '../constants'
import {
  getOrderFormItems,
  getSelectedAddresses,
  getShippingData,
} from './order-form-selectors'

import { createSelector } from 'reselect'
import estimateCalculator from '@vtex/estimate-calculator'
import parcelify from '@vtex/delivery-packages'
import sortBy from 'lodash/sortBy'
import {
  getSelectedSlaInSlas,
  hasSLAs,
  hasDeliveryWindows,
} from '../utils/SlasUtils'
import {
  isCurrentChannel,
  isPickup,
  isDelivery,
} from '../utils/DeliveryChannelsUtils'

export const deliverySelector = {
  this: state => state.delivery,
  CHEAPEST: state => state.delivery[CHEAPEST],
  FASTEST: state => state.delivery[FASTEST],
  COMBINED: state => state.delivery[COMBINED],
  selectedPackage: state =>
    state.delivery && state.delivery[state.delivery.activeDeliveryOption],
}

const componentActivitySelector = {
  activeDeliveryChannel: state =>
    state.componentActivity && state.componentActivity.activeDeliveryChannel,
  isOmniShippingCompleted: state =>
    state.componentActivity && state.componentActivity.isOmniShippingCompleted,
  isAddressListActive: state =>
    state.componentActivity && state.componentActivity.isAddressListActive,
}

const channelFromProps = (_, props) => props.channel

function hasSlasUtil(li) {
  return !!li.find(li => hasSLAs(li))
}

function hasLengthAndSlas(option) {
  return option.length > 0 && hasSlasUtil(option)
}

export const hasAllPackagesCalculated = createSelector(
  deliverySelector.CHEAPEST,
  deliverySelector.FASTEST,
  deliverySelector.COMBINED,
  (cheapest, fastest, combined) =>
    (cheapest ? hasLengthAndSlas(cheapest) : true) &&
    (fastest ? hasLengthAndSlas(fastest) : true) &&
    (combined ? hasLengthAndSlas(combined) : true)
)

export const getSelectedLeanOption = createSelector(
  deliverySelector.this,
  deliveryPackages => deliveryPackages[deliveryPackages.activeDeliveryOption]
)

export const getShippingDataWithSelectedDelivery = createSelector(
  getShippingData,
  getSelectedLeanOption,
  (shippingData, selectedSmartDelivery) => {
    if (selectedSmartDelivery && selectedSmartDelivery.length > 0) {
      return {
        ...shippingData,
        logisticsInfo: selectedSmartDelivery,
      }
    }
    return shippingData && shippingData
  }
)

function getSingleSelectedPackage(
  selectedDelivery,
  items,
  selectedAddresses,
  channel
) {
  const filteredSelectedDelivery =
    selectedDelivery &&
    selectedDelivery.filter(li => !!li.selectedSla || hasSLAs(li))

  if (selectedDelivery && selectedDelivery.find(li => hasSLAs(li))) {
    const filteredItems = items.filter(
      (item, index) =>
        !!filteredSelectedDelivery.find(li => li.itemIndex === index)
    )

    const shippingData = {
      selectedAddresses,
      logisticsInfo: filteredSelectedDelivery,
    }

    const packages = parcelify({
      items: filteredItems,
      shippingData,
    }).filter(
      li =>
        channel
          ? isCurrentChannel(li, channel) && !!li.selectedSla
          : !!li.selectedSla
    )

    const sortedPackagesByEstimate = sortBy(packages, pack =>
      estimateCalculator.getShippingEstimateQuantityInSeconds(
        pack.shippingEstimate
      )
    )

    return (packages.length > 1 && sortedPackagesByEstimate) || packages
  }

  return []
}

export const getAllSelectedPackages = createSelector(
  getSelectedLeanOption,
  getOrderFormItems,
  getSelectedAddresses,
  (selectedDelivery, items, selectedAddresses) =>
    getSingleSelectedPackage(selectedDelivery, items, selectedAddresses)
)

export const getSelectedPackages = createSelector(
  getSelectedLeanOption,
  getOrderFormItems,
  getSelectedAddresses,
  (selectedDelivery, items, selectedAddresses) =>
    getSingleSelectedPackage(
      selectedDelivery,
      items,
      selectedAddresses,
      DELIVERY
    )
)

export const getSelectedPickupPackages = createSelector(
  getSelectedLeanOption,
  getOrderFormItems,
  getSelectedAddresses,
  (selectedDelivery, items, selectedAddresses) =>
    getSingleSelectedPackage(
      selectedDelivery,
      items,
      selectedAddresses,
      PICKUP_IN_STORE
    )
)

export const getChannelItemsAmount = createSelector(
  deliverySelector.selectedPackage,
  channelFromProps,
  (logisticsInfo, channel) =>
    logisticsInfo &&
    logisticsInfo.filter(li => isCurrentChannel(li, channel)).length
)

export const hasSlas = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => logisticsInfo && !!logisticsInfo.find(li => hasSLAs(li))
)

export const hasSelectedSlasAndScheduledDeliveries = createSelector(
  deliverySelector.selectedPackage,
  hasSlas,
  (logisticsInfo, hasSlas) => {
    const hasUnselectedLogisticsInfo =
      logisticsInfo &&
      logisticsInfo.find(li => {
        const selectedSla = li.slas && getSelectedSlaInSlas(li)

        if (selectedSla && hasDeliveryWindows(selectedSla)) {
          return selectedSla.deliveryWindow === null
        }

        return li.selectedSla === null
      })

    if (!hasSlas) return false

    return hasUnselectedLogisticsInfo === undefined
  }
)

export const hasSelectedPickups = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo &&
    !!logisticsInfo.find(li => {
      const selectedSla = getSelectedSlaInSlas(li)
      return selectedSla && isPickup(selectedSla)
    })
)

export const hasDeliverySlaSelected = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => logisticsInfo && !!logisticsInfo.find(li => isDelivery(li))
)

export const hasPickups = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    !!logisticsInfo.find(li => li.slas.find(sla => isPickup(sla)))
)

export const hasPickupsSelected = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => !!logisticsInfo.find(li => isPickup(li))
)

export const hasSelectedSlas = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo.length > 0 &&
    !logisticsInfo.find(
      logisticsInfoItem => logisticsInfoItem.selectedSla === null
    )
)

export const getOrderedAvailableDeliveryChannels = createSelector(
  componentActivitySelector.activeDeliveryChannel,
  hasSlas,
  (activeDeliveryChannel, hasSlas) => {
    const deliveryChannelPickup = [PICKUP_IN_STORE, DELIVERY]
    const deliveryChannelsDelivery = [DELIVERY, PICKUP_IN_STORE]

    const activeDeliveryChannels = isPickup(activeDeliveryChannel)
      ? deliveryChannelPickup
      : deliveryChannelsDelivery

    return activeDeliveryChannels.filter(
      channel =>
        !hasSlas ? isCurrentChannel(channel, activeDeliveryChannel) : true
    )
  }
)

export const getLogisticsInfo = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo => logisticsInfo
)

export const hasLogisticsInfoWithOnlyPickup = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo &&
    logisticsInfo.some(li =>
      li.deliveryChannels.every(channel => channel.id === PICKUP_IN_STORE)
    )
)
