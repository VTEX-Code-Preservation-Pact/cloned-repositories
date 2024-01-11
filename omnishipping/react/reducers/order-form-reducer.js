import * as types from '../actions/action-types'

import { DELIVERY } from '../constants'
import { changeActiveSlas } from '../utils/OrderFormUtils'

import { isResidential } from '../utils/AddressFormUtils'
import get from 'lodash/get'
import { isPickup, isDelivery } from '../utils/DeliveryChannelsUtils'

const getAvailableAddresses = action => {
  if (get(action, 'orderForm.shippingData')) {
    const {
      availableAddresses,
      selectedAddress,
    } = action.orderForm.shippingData

    const newAvailableAddresses = {
      availableAddresses: selectedAddress,
    }

    const noAddresses = availableAddresses && availableAddresses.length === 0
    return noAddresses ? newAvailableAddresses : {}
  }

  return {}
}

function findFirstPickupSelected(action) {
  return (
    get(action, 'orderForm.shippingData.logisticsInfo') &&
    action.orderForm.shippingData.logisticsInfo.find(
      item => item.selectedSla && isPickup(item)
    )
  )
}

function getAddressId(action, item) {
  return (
    (isDelivery(item)
      ? action.address && action.address.addressId.value
      : action.searchAddress && action.searchAddress.addressId.value) ||
    item.addressId
  )
}

function getNewLogisticsInfo(action) {
  const firstPickupSelected = findFirstPickupSelected(action)

  return (
    get(action, 'orderForm.shippingData.logisticsInfo') &&
    action.orderForm.shippingData.logisticsInfo.map(item => {
      const defaultDeliverySla = item.slas.find(sla => isDelivery(sla))

      if (
        isPickup(item) &&
        item.selectedSla !== firstPickupSelected.selectedSla
      ) {
        return {
          ...item,
          selectedSla: defaultDeliverySla ? defaultDeliverySla.id : null,
          selectedDeliveryChannel: defaultDeliverySla ? DELIVERY : null,
        }
      }
      return {
        ...item,
        addressId: getAddressId(action, item),
      }
    })
  )
}

export default (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_ORDERFORM: {
      const logisticsInfo = getNewLogisticsInfo(action)

      if (action.channel) {
        const {
          canEditData,
          clientProfileData,
          clientPreferencesData,
          giftRegistryData,
          items,
          loggedIn,
          marketingData,
          orderFormId,
          salesChannel,
          sellers,
          shippingData,
          storePreferencesData,
          selectableGifts,
        } = action.orderForm

        return {
          ...state,
          shippingData: {
            ...state.shippingData,
            ...shippingData,
            ...getAvailableAddresses(action),
            logisticsInfo: changeActiveSlas({
              action,
              channel: action.channel,
              items,
              logisticsInfo: shippingData.logisticsInfo,
              sellers,
              canEditData,
            }),
          },
          giftRegistryData,
          orderFormId,
          salesChannel,
          clientProfileData,
          clientPreferencesData,
          storePreferencesData,
          marketingData,
          sellers,
          loggedIn,
          canEditData,
          items,
          selectableGifts,
        }
      }

      if (logisticsInfo) {
        const {
          canEditData,
          clientProfileData,
          clientPreferencesData,
          giftRegistryData,
          items,
          loggedIn,
          marketingData,
          orderFormId,
          salesChannel,
          sellers,
          shippingData,
          storePreferencesData,
          selectableGifts,
        } = action.orderForm

        return {
          ...state,
          giftRegistryData,
          orderFormId,
          salesChannel,
          clientProfileData,
          clientPreferencesData,
          storePreferencesData,
          marketingData,
          sellers,
          loggedIn,
          canEditData,
          selectableGifts,
          items: items === null ? state.items : items,
          shippingData: {
            ...shippingData,
            ...getAvailableAddresses(action),
            logisticsInfo,
          },
        }
      }

      return state
    }

    case types.UPDATE_SHIPPING_REQUEST: {
      const { selectedDeliveryPackage } = action
      const hasSelectedDeliveryPackage = selectedDeliveryPackage.length > 0

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          logisticsInfo: hasSelectedDeliveryPackage
            ? selectedDeliveryPackage
            : state.shippingData.logisticsInfo,
        },
      }
    }

    case types.CHANGE_ACTIVE_TAB: {
      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          logisticsInfo: action.selectedDeliveryPackage,
        },
      }
    }

    case types.UPDATE_ADDRESS_FORM: {
      const logisticsInfo =
        get(state, 'shippingData.logisticsInfo') &&
        state.shippingData.logisticsInfo.map(li => ({
          ...li,
          addressId: isPickup(li)
            ? action.address.addressId.value
            : action.searchAddress.addressId.value,
        }))
      const newState = {
        ...state,
        shippingData: {
          ...state.shippingData,
          logisticsInfo,
        },
      }

      return newState
    }

    case types.UPDATE_SIMULATION_OPTIONS: {
      const updatedOrderForm = {
        ...state,
        shippingData: {
          ...state.shippingData,
          logisticsInfo: action.selectedOption,
        },
      }

      return updatedOrderForm
    }

    case types.UPDATE_SHIPPING_FROM_SHIPPING_RATE_PREVIEW: {
      const {
        orderFormLogisticsInfo,
        shippingOptionsLogisticsInfos,
        activeTab,
        activeDeliveryOption,
      } = action

      const logisticsInfo =
        (shippingOptionsLogisticsInfos &&
          shippingOptionsLogisticsInfos[activeTab] &&
          shippingOptionsLogisticsInfos[activeTab][activeDeliveryOption]) ||
        orderFormLogisticsInfo

      const updatedOrderForm = {
        ...state,
        shippingData: {
          ...state.shippingData,
          logisticsInfo,
        },
      }

      return updatedOrderForm
    }

    case types.SELECT_ADDRESS_ITEM: {
      const selectedAddresses = state.shippingData.selectedAddresses.map(
        address => (isResidential(address) ? action.selectedAddress : address)
      )

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          selectedAddresses,
        },
      }
    }

    default:
      return state
  }
}
