import * as types from './action-types'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import { CHEAPEST, COMBINED, FASTEST } from '../constants'
import { filterSelectedAddresses } from '../utils/OrderFormUtils'
import { isPickup, isDelivery } from '../utils/DeliveryChannelsUtils'
import { getOrderFormItems } from '../selectors/order-form-selectors'
import { omnishippingAPIErrorEvent } from './metric-actions'
import { getSelectedLeanOption } from '../selectors/delivery-selectors'
import { setAditionalShippingData } from './component-activity-actions'
import { validatePostalCode, validateAddressForm } from './address-form-actions'
import {
  getAddress,
  getSearchAddress,
} from '../selectors/address-form-selectors'
import { sortSlasById, hasSLAs } from '../utils/SlasUtils'
import { safelyParseJSON, setItem } from '../utils/LocalStorageUtils'
import { helpers } from 'vtex.address-form'
const { removeValidation } = helpers

const $ = window.$

// ACTIONS
export const changeActiveTabAction = ({ channel, address, searchAddress }) => ({
  type: types.CHANGE_ACTIVE_TAB,
  channel,
  address,
  searchAddress,
})

export const selectScheduledDelivery = isScheduledDeliveryActive => ({
  type: types.SELECT_SCHEDULED_DELIVERY,
  isScheduledDeliveryActive,
})

export const changeActiveSLAOptionAction = ({
  slaOption,
  logisticsInfoIndex,
  sellerId,
}) => ({
  type: types.CHANGE_ACTIVE_SLA_OPTION,
  slaOption,
  logisticsInfoIndex,
  sellerId,
})

export const changeActiveDeliveryPackageAction = id => ({
  type: types.CHANGE_ACTIVE_DELIVERY_PACKAGE,
  id,
})

export const selectDeliveryWindowAction = (slaOption, deliveryWindow) => ({
  type: types.SELECT_DELIVERY_WINDOW,
  slaOption,
  deliveryWindow,
})

export const selectDeliveryWindow = (slaOption, deliveryWindow) => (
  dispatch,
  getState
) => {
  dispatch(selectDeliveryWindowAction(slaOption, deliveryWindow))

  const state = getState()

  const shippingData = {
    ...state.orderForm.shippingData,
    logisticsInfo: state.delivery[state.delivery.activeDeliveryOption],
  }

  dispatch(updateShippingData(shippingData, false))
}

const updateOrderFormAction = ({
  orderForm,
  address,
  searchAddress,
  channel,
}) => ({
  type: types.UPDATE_ORDERFORM,
  orderForm,
  address,
  searchAddress,
  channel,
})

export const updateSimulationOptions = (
  cheapestOption,
  fastestOption,
  combinedOption,
  selectedOption
) => ({
  type: types.UPDATE_SIMULATION_OPTIONS,
  cheapestOption,
  fastestOption,
  combinedOption,
  selectedOption,
})

export const selectAddressItemAction = selectedAddress => ({
  type: types.SELECT_ADDRESS_ITEM,
  selectedAddress,
})

export const selectAddressItem = (selectedAddress, alreadySelected = false) => (
  dispatch,
  getState
) => {
  dispatch(selectAddressItemAction(selectedAddress))

  if (alreadySelected) {
    return
  }

  const shippingData = getState().orderForm.shippingData
  dispatch(updateShippingData(shippingData))
}

export const toggleScheduledDelivery = status => ({
  type: types.TOGGLE_SCHEDULED_DELIVERY,
  status,
})

export const updateShippingDataRequest = (loading = true, shippingData) => ({
  type: types.UPDATE_SHIPPING_REQUEST,
  loading,
  shippingData,
})

export const updateShippingDataFailure = error => ({
  type: types.UPDATE_SHIPPING_FAILURE,
  error,
})

export const simulateShippingDataFailure = error => ({
  type: types.SIMULATE_SHIPPING_FAILURE,
  error,
})

export const simulateShippingDataSuccess = () => ({
  type: types.SIMULATE_SHIPPING_SUCCESS,
})

export const simulateShippingDataRequest = (loading = true) => ({
  type: types.SIMULATE_SHIPPING_REQUEST,
  loading,
})

export const removeItemsRequest = () => ({
  type: types.REMOVE_ITEMS_REQUEST,
})

// THUNKS
export const updateShippingData = (
  shippingData,
  loading,
  shouldHaveSelectedAddresses = true
) => (dispatch, getState) => {
  const state = getState()
  const canEditData = state.orderForm && state.orderForm.canEditData
  const items = getOrderFormItems(state)
  const deliveryAddress = getAddress(state)
  let searchAddress = getSearchAddress(state)
  const addressForm = state.addressForm

  searchAddress = searchAddress && {
    ...searchAddress,
    receiverName:
      canEditData && !!searchAddress ? searchAddress.receiverName : null,
  }

  const selectedAddresses = filterSelectedAddresses({
    canEditData,
    deliveryAddress,
    searchAddress,
  })

  const requestPayload = {
    logisticsInfo: getLogisticsInfoForRequest({
      addressForm,
      deliveryAddress,
      searchAddress,
      items,
      logisticsInfo: shippingData.logisticsInfo,
    }),
    ...(shouldHaveSelectedAddresses ? { selectedAddresses } : {}),
  }

  dispatch(updateShippingDataRequest(loading, requestPayload))

  return (
    window.vtexjs &&
    window.vtexjs.checkout &&
    window.vtexjs.checkout
      .sendAttachment('shippingData', requestPayload)
      .fail((response, status, error) => {
        if (
          !error ||
          !status ||
          response.statusText === 'abort' ||
          status === 'abort'
        ) {
          return
        }
        dispatch(updateShippingDataFailure(error))

        const errorObj =
          response.responseText && safelyParseJSON(response.responseText)

        const errorEventObject = {
          apiMessage: get(errorObj, 'error.message'),
          apiRoute: 'sendAttachment',
          errorMessage: error,
          errorStatus: status,
          operationId: errorObj && errorObj.operationId,
          reduxState: state && JSON.stringify(state),
          requestPayload: JSON.stringify(requestPayload),
          url: window.location.href,
        }

        $(window).trigger('checkout-ui-api-error', errorEventObject)

        dispatch(omnishippingAPIErrorEvent(errorEventObject))
      })
  )
}

export const removeItemsFromCart = ({ logisticsInfo, items }) => dispatch => {
  dispatch(removeItemsRequest())

  if (logisticsInfo) {
    return (
      get(window, 'vtexjs.checkout') &&
      window.vtexjs.checkout.removeItems(
        logisticsInfo.map(li => ({
          index: li.itemIndex,
          quantity: 0,
        }))
      )
    )
  }

  if (items) {
    return (
      get(window, 'vtexjs.checkout') &&
      window.vtexjs.checkout.removeItems(
        items.map(li => ({
          index: li.itemIndex,
          quantity: 0,
        }))
      )
    )
  }
}

export const changeActiveTab = ({
  channel,
  shouldUpdate = true,
  loading = true,
}) => (dispatch, getState) => {
  const state = getState()
  const address = getAddress(state)
  const searchAddress = getSearchAddress(state)

  dispatch(changeActiveTabAction({ channel, address, searchAddress }))

  if (!state.componentActivity.isOmniShippingCompleted && shouldUpdate) {
    const state = getState()
    const activeDeliveryPackage = getSelectedLeanOption(state)

    const isDeliveryAddressPostalCodeValid =
      address && address.postalCode && address.postalCode.valid

    const isSearchAddressPostalCodeValid =
      searchAddress &&
      searchAddress.postalCode &&
      searchAddress.postalCode.value &&
      searchAddress.postalCode.value.length > 0

    const isSearchAddressHasGeocoordinates =
      searchAddress &&
      searchAddress.geoCoordinates &&
      searchAddress.geoCoordinates.value &&
      searchAddress.geoCoordinates.value.length > 0

    const shouldHaveShippingData =
      (isDelivery(channel)
        ? isDeliveryAddressPostalCodeValid
        : isSearchAddressHasGeocoordinates || isSearchAddressPostalCodeValid) ||
      !state.orderForm.canEditData

    dispatch(
      updateShippingData(
        {
          ...(shouldHaveShippingData ? state.orderForm.shippingData : {}),
          logisticsInfo: activeDeliveryPackage,
        },
        loading,
        shouldHaveShippingData
      )
    )
  }
}

export const changeActiveSLAOption = ({
  slaOption,
  logisticsInfoIndex,
  sellerId,
}) => (dispatch, getState) => {
  dispatch(
    changeActiveSLAOptionAction({
      slaOption,
      logisticsInfoIndex,
      sellerId,
    })
  )
  const state = getState()

  const shippingData = {
    ...state.orderForm.shippingData,
    logisticsInfo: getSelectedLeanOption(state),
  }

  dispatch(updateShippingData(shippingData))
}

export const changeActiveDeliveryPackage = id => dispatch => {
  dispatch(
    setAditionalShippingData({
      selectedLeanShippingOption: id,
    })
  )

  setItem('activeDeliveryOption', id)

  dispatch(changeActiveDeliveryPackageAction(id))
}

function checkIfAllAddressesOk(addresses) {
  return (
    addresses.filter(address => {
      return address.postalCode || address.geoCoordinates.length
    }).length === addresses.length
  )
}

export const simulateShippingData = (
  logisticsInfo,
  loading,
  shouldSimulateRequest = true
) => (dispatch, getState) => {
  if (!logisticsInfo) return

  const state = getState()
  const deliveryAddress = getAddress(state)
  const searchAddress = getSearchAddress(state)
  const items = getOrderFormItems(state)
  const hasNoItems = items.length === 0

  if (
    !checkIfAllAddressesOk(state.orderForm.shippingData.selectedAddresses) ||
    hasNoItems ||
    state.componentActivity.isOmniShippingCompleted
  ) {
    return
  }

  if (shouldSimulateRequest) {
    dispatch(simulateShippingDataRequest(loading))
  }

  const localLogisticsInfo = getLogisticsInfoForRequest({
    items,
    logisticsInfo,
    deliveryAddress,
    searchAddress,
    isSimulation: true,
  })

  const selectedAddresses = filterSelectedAddresses({
    canEditData: state.orderForm.canEditData,
    deliveryAddress,
    searchAddress,
  })

  const dataRequest = {
    shippingData: {
      logisticsInfo: logisticsInfo ? localLogisticsInfo : [],
      ...(state.orderForm.canEditData ? { selectedAddresses } : {}),
    },
    orderFormId: state.orderForm.orderFormId,
  }

  const salesChannel = state.orderForm.salesChannel || '1'

  return $.ajax({
    url: `/api/checkout/pub/orderForms/simulation?sc=${salesChannel}`,
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(dataRequest),
    error(response, status, error) {
      if (!error) return

      const errorObj =
        response.responseText && safelyParseJSON(response.responseText)

      const errorEventObject = {
        apiMessage: get(errorObj, 'error.message'),
        apiRoute: 'simulation',
        errorMessage: error,
        errorStatus: response.status,
        operationId: errorObj && errorObj.operationId,
        reduxState: state && JSON.stringify(state),
        requestPayload: JSON.stringify(dataRequest),
        url: window.location.href,
      }

      $(window).trigger('checkout-ui-api-error', errorEventObject)

      dispatch(omnishippingAPIErrorEvent(errorEventObject))
    },
  })
}

function isLogisticsInfoTheSameAsActiveOption(getState, orderForm) {
  const { delivery } = getState()
  const activeOptionLogisticsInfo = delivery[delivery.activeDeliveryOption]

  if (activeOptionLogisticsInfo && activeOptionLogisticsInfo.length > 0) {
    const activeOptionLogisticsInfoUpdated = activeOptionLogisticsInfo.map(
      option => omit(option, ['quantity', 'deliveryWindow'])
    )

    return isEqual(
      sortSlasById(orderForm.shippingData.logisticsInfo),
      sortSlasById(activeOptionLogisticsInfoUpdated)
    )
  }

  return false
}

function changedCanEditData(getState, orderForm) {
  const { orderForm: stateOrderForm } = getState()
  return stateOrderForm.canEditData !== orderForm.canEditData
}

function shouldValidatePostalCode(address, state) {
  return (
    address &&
    get(address, 'postalCode.value') &&
    !state.componentActivity.isOmnishippingCompleted
  )
}

export const updateOrderForm = (
  { orderForm, channel },
  shouldSimulate = true,
  rules
) => (dispatch, getState) => {
  const state = getState()
  const delivery = state.delivery
  const searchAddress = getSearchAddress(state)
  const address = getAddress(state)
  const clientProfileIsEqual = isEqual(
    orderForm.clientProfileData,
    state.orderForm.clientProfileData
  )

  if (
    isLogisticsInfoTheSameAsActiveOption(getState, orderForm) &&
    clientProfileIsEqual
  ) {
    if (changedCanEditData(getState, orderForm)) {
      // When login is made to change data, should update orderForm
      dispatch(
        updateOrderFormAction({
          orderForm,
        })
      )
    }

    dispatch(simulateShippingDataSuccess())

    dispatch(
      updateSimulationOptions(
        delivery[CHEAPEST],
        delivery[FASTEST],
        delivery[COMBINED],
        delivery[delivery.activeDeliveryOption]
      )
    )

    const state = getState()
    const address = getAddress(state)
    if (shouldValidatePostalCode(address, state)) {
      dispatch(validatePostalCode(rules))
      dispatch(validateAddressForm(rules))
    }

    return
  }

  dispatch(
    updateOrderFormAction({
      orderForm,
      address,
      searchAddress,
      channel,
    })
  )

  const updatedState = getState()

  const logisticsInfo = get(orderForm, 'shippingData.logisticsInfo')
  if (
    logisticsInfo &&
    !!logisticsInfo.some(li => hasSLAs(li)) &&
    shouldSimulate &&
    !updatedState.componentActivity.isOmniShippingCompleted
  ) {
    simulateShippingDataOptions(updatedState, dispatch)
  }

  dispatch(validatePostalCode(rules))
  dispatch(validateAddressForm(rules))
}

function simulateShippingDataOptions(state, dispatch, loading) {
  $.when(
    state.delivery[CHEAPEST] &&
      dispatch(simulateShippingData(state.delivery[CHEAPEST], loading)),
    state.delivery[FASTEST] &&
      dispatch(simulateShippingData(state.delivery[FASTEST], loading)),
    state.delivery[COMBINED] &&
      dispatch(simulateShippingData(state.delivery[COMBINED], loading))
  )
    .done((cheapestData, fastestData, combinedData) => {
      const correctCheapest = cheapestData && cheapestData[0].logisticsInfo
      const correctFastest = fastestData && fastestData[0].logisticsInfo
      const correctCombined = combinedData && combinedData[0].logisticsInfo
      const selectedOption = state.delivery[state.delivery.activeDeliveryOption]

      dispatch(simulateShippingDataSuccess())

      if (correctCheapest || correctFastest || correctCombined) {
        dispatch(
          updateSimulationOptions(
            correctCheapest,
            correctFastest,
            correctCombined,
            selectedOption
          )
        )
      }
    })
    .fail(error => {
      dispatch(simulateShippingDataFailure(error))
    })
}

function getAddressIdForRequest(deliveryAddress, searchAddress, logisticsInfo) {
  if (isPickup(logisticsInfo)) {
    return searchAddress && searchAddress.addressId
  }

  if (isDelivery(logisticsInfo)) {
    return deliveryAddress && deliveryAddress.addressId
  }

  return null
}

export function getLogisticsInfoForRequest({
  items,
  logisticsInfo,
  deliveryAddress,
  searchAddress,
  isSimulation = false,
}) {
  const deliveryAddressWithoutValidation =
    deliveryAddress && removeValidation(deliveryAddress)
  const searchAddressWithoutValidation =
    searchAddress && removeValidation(searchAddress)

  return items.map((_, index) => {
    const logisticsInfoByIndex =
      !!logisticsInfo && logisticsInfo.find(li => li.itemIndex === index)

    const selectedSlaKey = isSimulation ? 'selectedSLAId' : 'selectedSla'

    if (logisticsInfoByIndex) {
      const deliveryWindowInfo = {
        deliveryWindow: logisticsInfoByIndex.deliveryWindow,
      }

      const addressId = getAddressIdForRequest(
        deliveryAddressWithoutValidation,
        searchAddressWithoutValidation,
        logisticsInfoByIndex
      )

      return {
        ...(!isSimulation ? deliveryWindowInfo : {}),
        ...(addressId ? { addressId } : {}),
        itemIndex: logisticsInfoByIndex.itemIndex,
        selectedDeliveryChannel: logisticsInfoByIndex.selectedDeliveryChannel,
        [selectedSlaKey]: logisticsInfoByIndex.selectedSla,
      }
    }

    return {
      addressId: deliveryAddress && deliveryAddress.addressId,
      itemIndex: index,
    }
  })
}
