import get from 'lodash/get'
import orderFormReducer from './order-form-reducer.js'
import pickup from './pickup-reducer.js'
import addressForm from './address-form-reducer.js'
import accountInfo from './account-info-reducer.js'
import componentActivity from './component-activity-reducer.js'
import delivery from './delivery-reducer'

import { findAddressByType } from '../utils/AddressFormUtils.js'
import { getSelectedLeanOption } from '../selectors/delivery-selectors'
import { shouldCompleteOmnishipping } from '../selectors/omnishipping-selectors'
import {
  DELIVERY,
  RESIDENTIAL,
  COMMERCIAL,
  SEARCH,
} from '../constants/index.js'
import { getItem } from '../utils/LocalStorageUtils.js'

const rootReducer = (state = {}, action) => {
  const orderForm = get(state, 'orderForm')
  const sellers = get(orderForm, 'sellers')
  const items = get(orderForm, 'items')
  const canEditData = get(orderForm, 'canEditData')
  const orderFormId = get(orderForm, 'orderFormId')

  const selectedDeliveryPackage = state.delivery && getSelectedLeanOption(state)

  const isOmniShippingCompleted = get(
    state,
    'componentActivity.isOmniShippingCompleted'
  )
  const isOmniShippingOpen = get(state, 'componentActivity.isOmniShippingOpen')

  const activeDeliveryChannel = getItem('activeDeliveryChannel') || DELIVERY

  const pickupOptions = get(state, 'pickup.pickupOptions')

  const addressFormInState = get(state, 'addressForm')

  const activePickupPoint = get(state, 'pickup.activePickupPoint')

  const isAddressValid = get(state, 'addressForm.valid')

  const address =
    findAddressByType(addressFormInState, RESIDENTIAL) ||
    findAddressByType(addressFormInState, COMMERCIAL)
  const searchAddress = findAddressByType(addressFormInState, SEARCH)

  return {
    orderForm: orderFormReducer(state.orderForm, {
      ...action,
      selectedDeliveryPackage,
      address,
      searchAddress,
    }),
    pickup: pickup(state.pickup, action),
    addressForm: addressForm(state.addressForm, {
      ...action,
      isOmniShippingCompleted,
      pickupOptions,
      canEditData,
    }),
    accountInfo: accountInfo(state.accountInfo, action),
    componentActivity: componentActivity(state.componentActivity, {
      ...action,
      isAddressValid,
      shouldCompleteOmnishipping:
        state.delivery &&
        state.componentActivity &&
        shouldCompleteOmnishipping(state),
      ...(action.orderForm ? {} : { orderForm }),
    }),
    delivery: delivery(state.delivery, {
      ...action,
      items,
      sellers,
      activeDeliveryChannel,
      canEditData,
      isOmniShippingCompleted,
      isOmniShippingOpen,
      address,
      searchAddress,
      orderFormId,
      activePickupPoint,
    }),
  }
}

export default rootReducer
