import { AVAILABLE, PICKUP_IN_STORE } from '../constants'
import { createSelector } from 'reselect'
import { getOrderFormItems } from './order-form-selectors'
import { getSelectedLeanOption } from './delivery-selectors'
import { hasSLAs } from '../utils/SlasUtils'
import {
  hasOnlyCurrentDeliveryChannel,
  isUnavailable,
} from '../utils/DeliveryChannelsUtils'

const deliverySelector = {
  selectedPackage: state => state.delivery[state.delivery.activeDeliveryOption],
}

export const getUnavailablePickupItems = createSelector(
  getSelectedLeanOption,
  getOrderFormItems,
  (selectedDelivery, items) => {
    const filteredSelectedDelivery = selectedDelivery.filter(
      li =>
        isUnavailable(li) ||
        (hasOnlyCurrentDeliveryChannel(li, PICKUP_IN_STORE) && !hasSLAs(li))
    )

    const hasSlasInSelectedDelivery = selectedDelivery.some(li => hasSLAs(li))

    const hasOneWithOnlyPickupChannel = selectedDelivery.some(
      li => hasOnlyCurrentDeliveryChannel(li, PICKUP_IN_STORE) && !hasSLAs(li)
    )

    if (
      (hasSlasInSelectedDelivery || hasOneWithOnlyPickupChannel) &&
      filteredSelectedDelivery.some(delivery => delivery)
    ) {
      return {
        logisticsInfo: filteredSelectedDelivery,
        items: items.filter(
          (_, index) =>
            !!filteredSelectedDelivery.find(li => li.itemIndex === index)
        ),
      }
    }
  }
)

export const getUnavailableItems = createSelector(
  getUnavailablePickupItems,
  getOrderFormItems,
  (unailablePickupItems, items) => {
    const filteredUnavailableItems = items.filter(
      item => item.availability !== AVAILABLE
    )
    let unavailableItemsWithoutLogisticsInfo = null
    if (filteredUnavailableItems.length > 0) {
      unavailableItemsWithoutLogisticsInfo = {
        id: items
          .filter(item => item)
          .reduce(
            (previousString, currItem) => previousString + currItem.uniqueId,
            ''
          ),
        items: filteredUnavailableItems.map(item => ({
          ...item,
          itemIndex: items.findIndex(
            localItem => localItem.uniqueId === item.uniqueId
          ),
        })),
      }
    }

    return unailablePickupItems || unavailableItemsWithoutLogisticsInfo
  }
)

export const hasUnavailablePickupItems = createSelector(
  deliverySelector.selectedPackage,
  logisticsInfo =>
    logisticsInfo &&
    !!logisticsInfo.find(
      li =>
        (hasSLAs(li) && !li.selectedSla && !li.selectedDeliveryChannel) ||
        (hasOnlyCurrentDeliveryChannel(li, PICKUP_IN_STORE) && !hasSLAs(li))
    )
)

export const hasUnavailableItems = createSelector(
  getOrderFormItems,
  orderFormItems =>
    orderFormItems &&
    !!orderFormItems.find(item => item.availability !== AVAILABLE)
)
