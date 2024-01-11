import map from 'lodash/map'
import * as types from './action-types'
import { getAllSelectedPackages } from '../selectors/delivery-selectors'
import {
  CHEAPEST,
  FASTEST,
  VTEXBETA,
  VTEXSTABLE,
  VTEXLOCAL,
  INFO,
  IMPORTANT,
  ERROR,
  CRITICAL,
} from '../constants'
import { isPickup } from '../utils/DeliveryChannelsUtils'
import SplunkEvents from 'splunk-events'
import EvidenceClient from '@vtex/evidence-client-js'
import axios from 'axios'
const splunkEvents = new SplunkEvents()
const evidenceClient = new EvidenceClient()
let omnishippingVersion = null

setTimeout(() => {
  omnishippingVersion = getIOAppVersion({
    appName: 'omnishipping',
    vendor: 'vtex',
  })
}, 500)

splunkEvents.config({
  endpoint: 'https://splunk-heavyforwarder-public.vtex.com:8088',
  token: '50fe94b0-30b6-442a-9cb1-a476c97ba917',
  request: axios,
})

evidenceClient.config({
  request: axios,
})

function getIOAppVersion({ appName, vendor }) {
  const IOAppName = Object.keys(window.__RENDER_7_COMPONENTS__).find(
    key => key.indexOf(appName) > 0 && key.indexOf('.x') === -1
  )

  return (
    IOAppName &&
    IOAppName.replace(`${vendor}.${appName}@`, '').replace('/index', '')
  )
}

function sendEvidence(evidence = {}) {
  return evidenceClient.sendEvidence('checkout-ui', JSON.stringify(evidence))
}

export const omnishippingJsError = (error, componentStack, id) => ({
  type: types.OMNISHIPPING_JS_ERROR,
  error,
  componentStack,
  id,
})

export const omnishippingAPIError = (
  errorMessage,
  operationId,
  apiRoute,
  reduxState,
  apiMessage,
  errorStatus,
  requestPayload,
  url,
  id
) => ({
  type: types.OMNISHIPPING_API_ERROR,
  errorMessage,
  operationId,
  apiRoute,
  reduxState,
  apiMessage,
  errorStatus,
  requestPayload,
  url,
  id,
})

export const searchPickupAddressByGeolocation = () => ({
  type: types.SEARCHED_PICKUP_ADDRESS_GEOLOCATION_EVENT,
})

export const hasPickup = () => ({
  type: types.HAS_PICKUP_OPTIONS_EVENT,
})

export const selectedPickupTab = () => ({
  type: types.SELECTED_PICKUP_TAB_EVENT,
})

export const searchedPickupAddress = () => ({
  type: types.SEARCHED_PICKUP_ADDRESS_EVENT,
})

export const omnishippingPageViewEvent = omnishippingVersion => ({
  type: types.OMNISHIPPING_PAGEVIEW_EVENT,
  omnishippingVersion,
})

export const shippingStats = () => ({
  type: types.SHIPPING_STATS_EVENT,
})

export const searchPickupAddressByGeolocationEvent = data => dispatch => {
  dispatch(searchPickupAddressByGeolocation())

  log({
    name: 'searchPickupAddressByGeolocation',
    data: {
      env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
      searchedAddressByGeolocation: data.searchedAddressByGeolocation || false,
      confirmedGeolocationPopUp: data.confirmedGeolocation || false,
      dismissedGeolocation: data.dismissedGeolocation || false,
      deniedGeolocationPopUp: data.deniedGeolocation || false,
      positionUnavailable: data.positionUnavailable || false,
      browserError: data.browserError || false,
    },
  })
}

export const allowe = () => dispatch => {
  dispatch(hasPickup())

  log({
    name: 'searchPickupAddressByGeolocation',
    data: {
      env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
    },
  })
}

export const hasPickupEvent = () => dispatch => {
  dispatch(hasPickup())

  log({
    name: 'hasPickup',
    data: {
      env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
    },
  })
}

export const selectedPickupEvent = () => dispatch => {
  dispatch(selectedPickupTab())

  log({
    name: 'selectedPickupTab',
    data: {
      env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
    },
  })
}

export const searchedPickupAddressEvent = () => dispatch => {
  dispatch(searchedPickupAddress())

  log({
    name: 'searchedPickupAddress',
    data: {
      env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
    },
  })
}

export const omnishippingJsErrorEvent = ({
  error,
  componentStack,
  errorId,
  reduxState,
}) => (dispatch, getState) => {
  dispatch(omnishippingJsError(error, componentStack, errorId))
  const evidenceHash = sendEvidence(reduxState)
  const accountName = getState().accountInfo.accountName

  logSplunk({
    level: CRITICAL,
    type: ERROR,
    workflowType: 'shipping',
    workflowInstance: 'js-error',
    event: {
      errorMessage: error.message,
      errorStack: error.stack,
      componentStack,
      errorId,
      evidenceHash,
      accountName,
      version: omnishippingVersion,
    },
  })

  log({
    name: 'omnishippingJsError',
    data: {
      errorMessage: error.message,
      errorStack: error.stack,
      componentStack,
      errorId,
      evidenceHash,
    },
  })
}

export const omnishippingPageView = () => dispatch => {
  dispatch(omnishippingPageViewEvent(omnishippingVersion))

  log({
    name: 'omnishippingVersion',
    data: {
      omnishippingVersion,
    },
  })
}

export const omnishippingAPIErrorEvent = ({
  apiMessage,
  apiRoute,
  errorMessage,
  errorStatus,
  operationId,
  reduxState,
  requestPayload,
  url,
}) => (dispatch, getState) => {
  dispatch(
    omnishippingAPIError(
      apiMessage,
      apiRoute,
      errorMessage,
      errorStatus,
      operationId,
      reduxState,
      requestPayload,
      url
    )
  )

  const evidenceHash = sendEvidence(reduxState)
  const accountName = getState().accountInfo.accountName

  logSplunk({
    level: CRITICAL,
    type: ERROR,
    workflowType: 'shipping',
    workflowInstance: 'omnishipping-api-error',
    event: {
      apiMessage,
      apiRoute,
      errorMessage,
      errorStatus,
      operationId,
      evidenceHash,
      requestPayload,
      url,
      accountName,
      version: omnishippingVersion,
    },
  })

  log({
    name: 'omnishippingAPIError',
    data: {
      apiMessage,
      apiRoute,
      errorStatus,
      errorMessage,
      operationId,
      evidenceHash,
      requestPayload,
      url,
    },
  })
}

export const shippingStatsEvent = () => (dispatch, getState) => {
  const state = getState()
  const packages = getAllSelectedPackages(state)
  const activeDeliveryOption = state.delivery.activeDeliveryOption
  const hasCheapestOption = !!state.delivery[CHEAPEST]
  const hasFastestOption = !!state.delivery[FASTEST]

  dispatch(shippingStats())

  map(packages, liPackage => {
    logSplunk({
      level: IMPORTANT,
      type: INFO,
      workflowType: 'shipping',
      workflowInstance: 'shipping-stats',
      event: {
        hasPickupAndChosePickup: isPickup(liPackage),
        selectedDeliveryChannel: liPackage.deliveryChannel,
        packages: packages.length,
        pickupSelectionSource: isPickup(liPackage) ? 'map' : null,
        chosenOption: activeDeliveryOption,
        isSingleOption: !(hasCheapestOption && hasFastestOption),
        hasChosenScheduledDelivery: liPackage.deliveryWindow !== null,
        version: omnishippingVersion,
      },
    })

    log({
      name: 'shippingStats',
      data: {
        env: isEnv(VTEXBETA) ? VTEXBETA : VTEXSTABLE,
        hasPickupAndChosePickup: isPickup(liPackage),
        selectedDeliveryChannel: liPackage.deliveryChannel,
        packages: packages.length,
        pickupSelectionSource: isPickup(liPackage) ? 'map' : null,
        chosenOption: activeDeliveryOption,
        isSingleOption: !(hasCheapestOption && hasFastestOption),
        hasChosenScheduledDelivery: liPackage.deliveryWindow !== null,
      },
    })
  })
}

function logSplunk(config) {
  const { level, type, workflowType, workflowInstance, event, account } = config

  /* istanbul ignore else */
  if (!isEnv(VTEXLOCAL)) {
    splunkEvents.logEvent(
      level,
      type,
      workflowType,
      workflowInstance,
      event,
      account
    )
  } else {
    console.log('Log', config)
  }
}

function log(data) {
  /* istanbul ignore else */
  if (!isEnv(VTEXLOCAL)) {
    window.checkoutLogger && window.checkoutLogger(data)
  } else {
    console.log('Log', data)
  }
}

function isEnv(env) {
  return window.location.href.indexOf(env) !== -1
}
