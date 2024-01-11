import get from 'lodash/get'
import * as types from '../actions/action-types'
import { DELIVERY, PICKUP_IN_STORE } from '../constants/index'
import {
  getAvailableAddresses,
  getSelectedAddresses,
  getSelectedAddress,
} from '../utils/AddressFormUtils'
import { hasPickupSlas } from '../utils/SlasUtils'
import { setItem, getItem, removeItem } from '../utils/LocalStorageUtils'
import {
  getDeliveryChannelFromLocalStorage,
  getActiveDeliveryChannel,
} from '../utils/DeliveryChannelsUtils'
import { helpers } from 'vtex.address-form'
const { addValidation, isValidAddress } = helpers

export default (state = initiateComponentActivity(), action) => {
  switch (action.type) {
    case types.UPDATE_SIMULATION_OPTIONS:
    case types.UPDATE_ORDERFORM: {
      const availableAddresses = getAvailableAddresses(action)

      const storageOrderFormId = getItem('orderFormId')

      const canEditData = get(action, 'orderForm.canEditData')

      const actionOrderFormId = get(action, 'orderForm.orderFormId')

      const profileCompleteOnLoading = get(
        action,
        'orderForm.clientProfileData.profileCompleteOnLoading'
      )

      const actionLogisticsInfo = get(
        action,
        'orderForm.shippingData.logisticsInfo'
      )

      const hasOrderForm = !!action.orderForm

      const isOrderFormIdDifferent =
        hasOrderForm &&
        storageOrderFormId &&
        storageOrderFormId !== actionOrderFormId

      setLocalStorageItems({
        activeDeliveryChannel: state.activeDeliveryChannel,
        actionOrderFormId,
        isOrderFormIdDifferent,
        hasPickup: hasPickupSlas(action),
        hasOrderForm,
      })

      if (availableAddresses) {
        const selectedAddresses = getSelectedAddresses(action)

        const selectedAddress = getSelectedAddress(selectedAddresses)

        const selectedAddressValidation =
          action.selectedRules &&
          isValidAddress(addValidation(selectedAddress), action.selectedRules)

        const isAddressActive = shouldSetAddressActive({
          canEditData,
          profileCompleteOnLoading,
          hasActiveAddress: state.editAddressActive || state.newAddressActive,
          state,
          selectedAddress,
          selectedAddressValidation,
        })

        const isAddressListActive = shouldSetAddressListActive({
          profileCompleteOnLoading,
          state,
          canEditData,
          selectedAddress,
          selectedAddressValidation,
        })

        return {
          ...state,
          activeDeliveryChannel:
            (actionLogisticsInfo &&
              getActiveDeliveryChannel(actionLogisticsInfo)) ||
            state.activeDeliveryChannel,
          hasPickup: getItem('hasPickup') || false,
          isAddressListActive,
          isAddressActive,
          ...(profileCompleteOnLoading
            ? { editAddressActive: !!isAddressActive }
            : {}),
        }
      }
      return state
    }

    case types.ENABLE_OMNISHIPPING: {
      return {
        ...state,
        triedCompleteOmnishipping: false,
        isOmniShippingOpen: true,
        isEditingOmnishipping: true,
        isOmniShippingCompleted: false,
      }
    }

    case types.DISABLE_OMNISHIPPING: {
      return {
        ...state,
        triedCompleteOmnishipping: false,
        isOmniShippingCompleted: action.shouldCompleteOmnishipping,
        isOmniShippingOpen: action.shouldCompleteOmnishipping,
        isEditingOmnishipping: false,
      }
    }

    case types.SHOW_ADDRESS_LIST: {
      return {
        ...state,
        isAddressListActive: action.show,
      }
    }

    case types.SHOW_ADDRESS: {
      return {
        ...state,
        isAddressActive: action.show,
      }
    }

    case types.EDIT_ADDRESS: {
      return {
        ...state,
        editAddressActive: action.show,
      }
    }

    case types.NEW_ADDRESS: {
      return {
        ...state,
        newAddressActive: action.show,
      }
    }

    case types.SHOW_OMNISHIPPING_COMPLETED: {
      return {
        ...state,
        triedCompleteOmnishipping: false,
        isSplitActive: action.isAddressValid,
        isOmniShippingCompleted: action.show,
        newAddressActive: action.show ? false : state.newAddressActive,
        editAddressActive: action.show ? false : state.editAddressActive,
      }
    }

    case types.SHOW_SPLIT: {
      return {
        ...state,
        isSplitActive: action.show,
      }
    }

    case types.SHOW_OMNISHIPPING: {
      return {
        ...state,
        isOmniShippingOpen: action.show,
      }
    }

    case types.EDIT_OMNISHIPPING: {
      return {
        ...state,
        isEditingOmnishipping: action.edit,
      }
    }

    case types.CHANGE_ACTIVE_DELIVERY_CHANNEL: {
      setItem('activeDeliveryChannel', action.deliveryChannel)

      return {
        ...state,
        triedCompleteOmnishipping: false,
        activeDeliveryChannel: action.deliveryChannel,
      }
    }

    case types.UPDATE_SHIPPING_FROM_SHIPPING_RATE_PREVIEW: {
      const { activeTab } = action

      const updatedActiveTab =
        activeTab === DELIVERY ? DELIVERY : PICKUP_IN_STORE

      setItem('activeDeliveryChannel', updatedActiveTab)

      return { ...state, activeDeliveryChannel: updatedActiveTab }
    }

    case types.COMPLETE_OMNISHIPPING: {
      return { ...state, triedCompleteOmnishipping: true }
    }

    case types.CHANGE_ACTIVE_TAB:
    case types.CHANGE_ACTIVE_SLA_OPTION:
    case types.CHANGE_ACTIVE_DELIVERY_PACKAGE: {
      return { ...state, triedCompleteOmnishipping: false }
    }

    default:
      return state
  }
}

function initiateComponentActivity() {
  const isShippingHash = window.location.hash === '#/shippping'

  return {
    isAddressListActive: false,
    isAddressActive: false,
    isOmniShippingCompleted: false,
    isOmniShippingOpen: isShippingHash,
    activeDeliveryChannel: getDeliveryChannelFromLocalStorage() || DELIVERY,
    editAddressActive: false,
    newAddressActive: false,
    isEditingOmnishipping: false,
    hasPickup: false,
    isSplitActive: false,
    triedCompleteOmnishipping: false,
  }
}

function shouldSetAddressActive({
  canEditData,
  profileCompleteOnLoading,
  hasActiveAddress,
  state,
  selectedAddress,
  selectedAddressValidation,
}) {
  return (
    (canEditData && !profileCompleteOnLoading) ||
    hasActiveAddress ||
    (canEditData &&
      profileCompleteOnLoading &&
      (state.editAddressActive || state.newAddressActive) &&
      selectedAddress &&
      selectedAddressValidation &&
      !selectedAddressValidation.valid)
  )
}

function shouldSetAddressListActive({
  profileCompleteOnLoading,
  state,
  canEditData,
  selectedAddress,
  selectedAddressValidation,
}) {
  return (
    profileCompleteOnLoading &&
    ((!state.editAddressActive && !state.newAddressActive) ||
      (!canEditData &&
        selectedAddress &&
        selectedAddressValidation &&
        selectedAddressValidation.valid))
  )
}

function setLocalStorageItems({
  activeDeliveryChannel,
  actionOrderFormId,
  isOrderFormIdDifferent,
  hasPickup,
  hasOrderForm,
}) {
  if (isOrderFormIdDifferent) {
    removeItem('orderFormId')
    removeItem('hasPickup')
    removeItem('aditionalShippingData')
    setItem('activeDeliveryChannel', DELIVERY)
    setItem('orderFormId', actionOrderFormId)
  } else {
    setItem('activeDeliveryChannel', activeDeliveryChannel)
  }

  if (hasPickup && hasOrderForm) {
    setItem('hasPickup', true)
  }
}
