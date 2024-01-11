import * as types from './action-types'
import { setItem } from '../utils/LocalStorageUtils'
import { OMNISHIPPING } from '../constants'
import { SHIPPING_INFO_UPDATED } from '../constants/checkout-events'
import {
  changeActiveTab,
  updateShippingData,
} from '../actions/order-form-actions'
import { isPickup } from '../utils/DeliveryChannelsUtils'
import {
  selectedPickupEvent,
  shippingStatsEvent,
} from '../actions/metric-actions'
import { validateAddressFormFields } from './address-form-actions'
import { shouldCompleteOmnishipping } from '../selectors/omnishipping-selectors'
import { getShippingDataWithSelectedDelivery } from '../selectors/delivery-selectors'
import { isValidAddress } from '../selectors/address-form-selectors'

const $ = window.$

export const selectDeliveryChannel = channel => (dispatch, getState) => {
  const state = getState()

  const activeDeliveryChannel = state.componentActivity.activeDeliveryChannel

  if (channel === activeDeliveryChannel) return

  dispatch(changeActiveDeliveryChannel(channel))
  dispatch(
    setAditionalShippingData({
      activeTab: channel,
    })
  )
  dispatch(
    changeActiveTab({
      channel: channel,
      loading: false,
      shouldUpdate: true,
    })
  )

  if (isPickup(channel)) {
    dispatch(selectedPickupEvent())
  }
}

export const enableOmnishipping = () => ({
  type: types.ENABLE_OMNISHIPPING,
})

export const disableOmnishipping = () => ({
  type: types.DISABLE_OMNISHIPPING,
})

export const showAddressList = show => ({
  type: types.SHOW_ADDRESS_LIST,
  show,
})

export const showAddress = show => ({
  type: types.SHOW_ADDRESS,
  show,
})

export const showSplit = show => ({
  type: types.SHOW_SPLIT,
  show,
})

export const showOmniShippingCompleted = show => ({
  type: types.SHOW_OMNISHIPPING_COMPLETED,
  show,
})

export const showOmniShipping = show => ({
  type: types.SHOW_OMNISHIPPING,
  show,
})

export const editOmnishipping = edit => ({
  type: types.EDIT_OMNISHIPPING,
  edit,
})

export const editAddress = show => ({
  type: types.EDIT_ADDRESS,
  show,
})

export const newAddressEvent = show => ({
  type: types.NEW_ADDRESS,
  show,
})

export const changeActiveDeliveryChannel = deliveryChannel => ({
  type: types.CHANGE_ACTIVE_DELIVERY_CHANNEL,
  deliveryChannel,
})

export const setAditionalShippingDataAction = () => ({
  type: types.SET_ADITIONAL_SHIPPING_DATA,
})

export const completeOmnishippingAction = () => ({
  type: types.COMPLETE_OMNISHIPPING,
})

export const completeOmnishipping = rules => (dispatch, getState) => {
  const state = getState()
  const shouldComplete = shouldCompleteOmnishipping(state)
  const shippingData = getShippingDataWithSelectedDelivery(state)

  dispatch(completeOmnishippingAction())
  if (!isValidAddress(state)) {
    dispatch(validateAddressFormFields(rules))
  }

  if (shouldComplete) {
    dispatch(showOmniShippingCompleted(true))
    dispatch(editOmnishipping(false))
    dispatch(updateShippingData(shippingData))
    dispatch(shippingStatsEvent())
  }
}

export const setAditionalShippingData = ({
  activeTab,
  selectedLeanShippingOption,
  isScheduledDeliveryActive,
}) => (dispatch, getState) => {
  const state = getState()

  const localActiveTab =
    activeTab || state.componentActivity.activeDeliveryChannel
  const localSelectedLeanShippingOption =
    selectedLeanShippingOption || state.delivery.activeDeliveryOption
  const localIsScheduledDeliveryActive =
    isScheduledDeliveryActive || state.delivery.isScheduledDeliveryActive

  const aditionalShippingData = {
    activeTab: localActiveTab,
    selectedLeanShippingOption: localSelectedLeanShippingOption,
    isScheduledDeliveryActive: localIsScheduledDeliveryActive,
    originComponent: OMNISHIPPING,
  }

  dispatch(setAditionalShippingDataAction(aditionalShippingData))

  setItem('aditionalShippingData', JSON.stringify(aditionalShippingData))

  $ && $(window).trigger(SHIPPING_INFO_UPDATED)
}
