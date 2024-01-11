import * as types from '../actions/action-types'

import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { hasLIWithOnlyScheduledDelivery } from '../selectors/scheduled-delivery-selectors'
import { CHEAPEST, COMBINED, FASTEST, PICKUP_IN_STORE } from '../constants'
import {
  changeActiveSlas,
  findPickupSla,
  findFirstItemWithPickup,
  setSelectedSlaFromSlaOption,
} from '../utils/OrderFormUtils'

import {
  isDelivery,
  getActiveDeliveryChannel,
} from '../utils/DeliveryChannelsUtils'
import {
  selectDeliveryWindow,
  selectScheduledDeliveryHelper,
} from '../utils/ScheduledDeliveryUtils'
import { getItem, setItem } from '../utils/LocalStorageUtils'
import { DELIVERY_SELECTED } from '../constants/checkout-events'
import { modules } from 'vtex.lean-shipping-calculator'
import { hasDeliveryWindows } from '../utils/SlasUtils'

const {
  getLeanShippingOptions,
  getOptionsDetails,
  getSelectedDeliveryOption,
} = modules

const $ = window.$

const defaultState = {
  [CHEAPEST]: [],
  [COMBINED]: [],
  [FASTEST]: [],
  logisticsInfo: [],
  activeDeliveryOption: CHEAPEST,
  simulateRequested: false,
  selectedDeliveryPackageSlider: 0,
  shouldUpdateUi: false,
  shouldDisableToggle: false,
  optionsDetails: null,
  shouldUpdateLeanOptionsState: false,
  isScheduledDeliveryActive: false,
  activeScheduledDelivery: null,
}

function hasAnySla(logistics) {
  return logistics && logistics.some(item => item.slas && item.slas.length > 0)
}

function getSummarizedLogisticsInfo(logisticsInfo) {
  return (
    logisticsInfo &&
    logisticsInfo.map(li => ({
      itemIndex: li.itemIndex,
      selectedSla: li.selectedSla,
      slas: li.slas.map(sla => ({
        id: sla.id,
      })),
    }))
  )
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_ORDERFORM: {
      let actionLogisticsInfo = get(
        action,
        'orderForm.shippingData.logisticsInfo'
      )
      const items = get(action, 'orderForm.items')

      const logisticsInfoChangedLength =
        state[state.activeDeliveryOption] &&
        !isEqual(
          getSummarizedLogisticsInfo(state[state.activeDeliveryOption]),
          getSummarizedLogisticsInfo(actionLogisticsInfo)
        )

      if (
        action.channel ||
        (action.activeDeliveryChannel && actionLogisticsInfo)
      ) {
        const firstItemWithPickup =
          actionLogisticsInfo &&
          findFirstItemWithPickup({
            logisticsInfo: actionLogisticsInfo,
            items,
          })

        const firstPickupSla =
          firstItemWithPickup && findPickupSla(firstItemWithPickup)

        const slaOption =
          (firstPickupSla && firstPickupSla.id) ||
          (action.activePickupPoint && action.activePickupPoint.id)

        const channel = getActiveDeliveryChannel(actionLogisticsInfo)

        actionLogisticsInfo = changeActiveSlas({
          items: action.orderForm.items,
          sellers: action.orderForm.sellers,
          logisticsInfo: actionLogisticsInfo,
          action,
          channel,
          canEditData: action.orderForm.canEditData,
          ...(channel === PICKUP_IN_STORE ? { slaOption } : {}),
        })
      }

      let cheapestOption = state[CHEAPEST]
      let combinedOption = state[COMBINED]
      let fastestOption = state[FASTEST]
      let leanShippingOptions = null

      if (
        actionLogisticsInfo &&
        actionLogisticsInfo.length > 0 &&
        (!state.shouldUpdateLeanOptionsState || logisticsInfoChangedLength)
      ) {
        leanShippingOptions = getLeanShippingOptions({
          logisticsInfo: actionLogisticsInfo,
          activeChannel: action.activeDeliveryChannel,
          isScheduledDeliveryActive: getScheduledDeliveryActiveFromStorage(),
        })

        cheapestOption = leanShippingOptions.cheapest
        fastestOption = leanShippingOptions.fastest
        combinedOption = leanShippingOptions.combined
      }

      const optionsDetails = getOptionsDetails({
        [CHEAPEST]: cheapestOption,
        [COMBINED]: combinedOption,
        [FASTEST]: fastestOption,
      })

      const activeDeliveryOption = getSelectedDeliveryOption({
        optionsDetails,
        activeDeliveryOption: state.activeDeliveryOption,
      })

      if (
        action.isOmniShippingOpen &&
        !isOriginComponentOmnishipping(action.orderFormId)
      ) {
        $(window).trigger(
          'omniShipping.changedActiveDeliveryOption',
          activeDeliveryOption
        )
      }

      return {
        ...state,
        activeDeliveryOption,
        logisticsInfo: actionLogisticsInfo,
        ...(cheapestOption
          ? { [CHEAPEST]: cheapestOption }
          : { [CHEAPEST]: undefined }),
        ...(combinedOption
          ? { [COMBINED]: combinedOption }
          : { [COMBINED]: undefined }),
        ...(fastestOption
          ? { [FASTEST]: fastestOption }
          : { [FASTEST]: undefined }),
        ...(!hasAnySla(actionLogisticsInfo)
          ? { shouldDisableToggle: false }
          : {}),
      }
    }

    case types.UPDATE_SIMULATION_OPTIONS: {
      const newCheapest = action.cheapestOption && {
        [CHEAPEST]: getNewUpdatedLogisticsInfo(
          action.cheapestOption,
          state[CHEAPEST]
        ),
      }

      const newCombined = action.combinedOption && {
        [COMBINED]: getNewUpdatedLogisticsInfo(
          action.combinedOption,
          state[COMBINED]
        ),
      }

      const newFastest = action.fastestOption && {
        [FASTEST]: getNewUpdatedLogisticsInfo(
          action.fastestOption,
          state[FASTEST]
        ),
      }

      const newState = {
        ...state,
        ...(newCheapest || {}),
        ...(newCombined || {}),
        ...(newFastest || {}),
      }

      const optionsDetails = getOptionsDetails(newState)

      const activeDeliveryOption = getSelectedDeliveryOption({
        optionsDetails,
        activeDeliveryOption: state.activeDeliveryOption,
      })

      const hasItemWithMandatoryScheduledDelivery = newState[
        activeDeliveryOption
      ].some(li => li.slas.every(sla => hasDeliveryWindows(sla)))

      const selectedScheduledDeliveryLI = newState[activeDeliveryOption].find(
        li =>
          li.slas.find(
            sla => sla.id === li.selectedSla && hasDeliveryWindows(sla)
          )
      )

      const isScheduledDeliveryActive = hasItemWithMandatoryScheduledDelivery
        ? true
        : state.isScheduledDeliveryActive

      if (newState[activeDeliveryOption] && action.isOmniShippingOpen) {
        $(window).trigger(DELIVERY_SELECTED, [
          newState[activeDeliveryOption],
          { skipSendAttachment: true },
        ])

        const aditionalShippingData = getItem('aditionalShippingData')

        setItem(
          'aditionalShippingData',
          JSON.stringify({
            ...aditionalShippingData,
            selectedLeanShippingOption: activeDeliveryOption,
            isScheduledDeliveryActive,
          })
        )
      }

      return {
        ...newState,
        activeScheduledDelivery:
          (selectedScheduledDeliveryLI &&
            selectedScheduledDeliveryLI.selectedSla) ||
          state.activeScheduledDelivery,
        isScheduledDeliveryActive,
        shouldDisableToggle: false,
        shouldUpdateUi: true,
        shouldUpdateLeanOptionsState: true,
        activeDeliveryOption,
        optionsDetails,
      }
    }

    case types.EDIT_ADDRESS: {
      return {
        ...state,
        shouldDisableToggle: false,
      }
    }

    case types.TOGGLE_SCHEDULED_DELIVERY: {
      const selectedScheduledDeliveryLI = state[
        state.activeDeliveryOption
      ].find(li =>
        li.slas.find(
          sla => sla.id === li.selectedSla && hasDeliveryWindows(sla)
        )
      )

      return {
        ...state,
        isScheduledDeliveryActive: action.status,
        activeScheduledDelivery:
          selectedScheduledDeliveryLI &&
          selectedScheduledDeliveryLI.selectedSla,
      }
    }

    case types.CHANGE_ACTIVE_TAB: {
      const updatedLogisticsInfo = changeActiveSlas({
        action,
        logisticsInfo: state.logisticsInfo,
        items: action.items,
        sellers: action.sellers,
        channel: action.channel,
        canEditData: action.canEditData,
        slaOption: action.activePickupPoint && action.activePickupPoint.id,
      })

      const leanShippingOptions = getLeanShippingOptions({
        logisticsInfo: updatedLogisticsInfo,
        activeChannel: action.activeDeliveryChannel,
      })

      let newState = {
        ...state,
        logisticsInfo: updatedLogisticsInfo,
        shouldUpdateLeanOptionsState: false,
        selectedDeliveryPackageSlider: 0,
        ...(leanShippingOptions.cheapest
          ? { [CHEAPEST]: leanShippingOptions.cheapest }
          : { [CHEAPEST]: undefined }),
        ...(leanShippingOptions.combined
          ? { [COMBINED]: leanShippingOptions.combined }
          : { [COMBINED]: undefined }),
        ...(leanShippingOptions.fastest
          ? { [FASTEST]: leanShippingOptions.fastest }
          : { [FASTEST]: undefined }),
      }
      const optionsDetails = getOptionsDetails(newState)

      newState = {
        ...newState,
        optionsDetails,
        activeDeliveryOption: getSelectedDeliveryOption({
          optionsDetails: optionsDetails,
          newCombined: leanShippingOptions.combined,
          newFastest: leanShippingOptions.fastest,
          newCheapest: leanShippingOptions.cheapest,
          activeDeliveryOption: state.activeDeliveryOption,
        }),
      }

      $(window).trigger(DELIVERY_SELECTED, [
        newState[newState.activeDeliveryOption],
        { skipSendAttachment: true },
      ])

      return {
        ...newState,
        isScheduledDeliveryActive: hasLIWithOnlyScheduledDelivery({
          delivery: newState,
        }),
      }
    }

    case types.CHANGE_ACTIVE_SLA_OPTION: {
      let updatedLogisticsInfo = []

      if (state.isScheduledDeliveryActive) {
        updatedLogisticsInfo = setSelectedSlaFromSlaOption({
          action,
          logisticsInfo: state.logisticsInfo,
          items: action.items,
          sellers: action.sellers,
          channel: action.activeDeliveryChannel,
          canEditData: action.canEditData,
          slaOption: action.slaOption,
        })
      } else {
        updatedLogisticsInfo = changeActiveSlas({
          action,
          logisticsInfo: state.logisticsInfo,
          items: action.items,
          sellers: action.sellers,
          channel: action.activeDeliveryChannel,
          canEditData: action.canEditData,
          slaOption: action.slaOption,
        })
      }

      const leanShippingOptions = getLeanShippingOptions({
        logisticsInfo: updatedLogisticsInfo,
        activeChannel: action.activeDeliveryChannel,
        isScheduledDeliveryActive: state.isScheduledDeliveryActive,
      })

      const newState = {
        ...state,
        logisticsInfo: updatedLogisticsInfo,
        activeScheduledDelivery: state.isScheduledDeliveryActive
          ? action.slaOption
          : state.activeScheduledDelivery,
        ...(leanShippingOptions.cheapest
          ? { [CHEAPEST]: leanShippingOptions.cheapest }
          : { [CHEAPEST]: undefined }),
        ...(leanShippingOptions.combined
          ? { [COMBINED]: leanShippingOptions.combined }
          : { [COMBINED]: undefined }),
        ...(leanShippingOptions.fastest
          ? { [FASTEST]: leanShippingOptions.fastest }
          : { [FASTEST]: undefined }),
      }

      $(window).trigger(DELIVERY_SELECTED, [
        newState[state.activeDeliveryOption],
        { skipSendAttachment: true },
      ])

      const optionsDetails = getOptionsDetails(newState)

      return {
        ...newState,
        activeDeliveryOption: getSelectedDeliveryOption({
          optionsDetails: optionsDetails,
          newCombined: leanShippingOptions.combined,
          newFastest: leanShippingOptions.fastest,
          newCheapest: leanShippingOptions.cheapest,
          activeDeliveryOption: state.activeDeliveryOption,
        }),
        optionsDetails,
      }
    }

    case types.SELECT_DELIVERY_WINDOW: {
      const newState = {
        ...state,
        ...(state[CHEAPEST]
          ? { [CHEAPEST]: selectDeliveryWindow(state[CHEAPEST], action) }
          : {}),
        ...(state[COMBINED]
          ? { [COMBINED]: selectDeliveryWindow(state[COMBINED], action) }
          : {}),
        ...(state[FASTEST]
          ? { [FASTEST]: selectDeliveryWindow(state[FASTEST], action) }
          : {}),
      }

      $(window).trigger(DELIVERY_SELECTED, [
        newState[state.activeDeliveryOption],
        { skipSendAttachment: true },
      ])

      return newState
    }

    case types.UPDATE_SHIPPING_FROM_SHIPPING_RATE_PREVIEW: {
      const {
        shippingOptionsLogisticsInfos,
        activeDeliveryOption,
        isScheduledDeliveryActive,
      } = action

      const updatedLogisticsInfo = {
        cheapest: shippingOptionsLogisticsInfos.delivery[CHEAPEST],
        fastest: shippingOptionsLogisticsInfos.delivery[FASTEST],
      }

      const hasLogisticsInfo = {
        cheapest:
          updatedLogisticsInfo.cheapest &&
          updatedLogisticsInfo.cheapest.length > 0,
        fastest:
          updatedLogisticsInfo.fastest &&
          updatedLogisticsInfo.fastest.length > 0,
      }

      const leanOptions = {
        ...(hasLogisticsInfo.cheapest
          ? { [CHEAPEST]: updatedLogisticsInfo.cheapest }
          : {}),
        ...(hasLogisticsInfo.fastest
          ? { [FASTEST]: updatedLogisticsInfo.fastest }
          : {}),
      }

      const newState = {
        ...omit(state, [CHEAPEST, FASTEST]),
        activeDeliveryOption,
        ...leanOptions,
        isScheduledDeliveryActive,
      }

      return newState
    }

    case types.SELECT_SCHEDULED_DELIVERY: {
      // This 'if' mitigates bugs with triggering 'deliverySelected.vtex'
      // too often, which among other things, changes shipping estimates
      // multiple times after success. To investigate what is causing
      // that, but this shouldn't hurt either
      if (
        state.isScheduledDeliveryActive === action.isScheduledDeliveryActive &&
        !action.isScheduledDeliveryActive
      ) {
        return state
      }

      let scheduledDeliveryState = null

      if (action.isScheduledDeliveryActive) {
        scheduledDeliveryState = selectScheduledDeliveryHelper(
          state,
          action.items,
          action.sellers
        )
      } else {
        scheduledDeliveryState = getLogisticsInfoWithSelectedSlas(
          state,
          action,
          action.activeDeliveryChannel
        )
      }

      const newState = {
        ...state,
        ...scheduledDeliveryState,
        isScheduledDeliveryActive: true,
      }

      $(window).trigger(DELIVERY_SELECTED, [
        newState[state.activeDeliveryOption],
        { skipSendAttachment: true },
      ])

      const optionsDetails = getOptionsDetails(newState)

      const shippingOptions = getSelectedDeliveryOption({
        delivery: newState,
        activeDeliveryOption: state.activeDeliveryOption,
      })

      const isSingleOption = shippingOptions && shippingOptions.length === 1

      const activeDeliveryOption = isSingleOption
        ? shippingOptions[0].id
        : state.activeDeliveryOption

      return {
        ...newState,
        optionsDetails,
        activeDeliveryOption,
      }
    }

    case types.UPDATE_SHIPPING_FAILURE: {
      return {
        ...state,
        shouldUpdateUi: true,
        shouldDisableToggle: false,
      }
    }

    case types.SIMULATE_SHIPPING_FAILURE: {
      return {
        ...state,
        optionsDetails: getOptionsDetails(state),
        shouldUpdateUi: true,
        shouldDisableToggle: false,
      }
    }

    case types.UPDATE_SHIPPING_REQUEST: {
      return {
        ...state,
        shouldUpdateUi: false,
        shouldDisableToggle: action.loading,
      }
    }

    case types.SIMULATE_SHIPPING_REQUEST: {
      return {
        ...state,
        simulateRequested: true,
      }
    }

    case types.SIMULATE_SHIPPING_SUCCESS: {
      return {
        ...state,
        simulateRequested: false,
      }
    }

    case types.CHANGE_ACTIVE_DELIVERY_PACKAGE: {
      return {
        ...state,
        activeDeliveryOption: action.id,
        selectedDeliveryPackageSlider: 0,
      }
    }

    case types.UPDATE_SELECTED_PACKAGE_SLIDER: {
      return {
        ...state,
        selectedDeliveryPackageSlider: action.packageIndex,
      }
    }

    case types.SELECT_ADDRESS_ITEM: {
      const newCheapest =
        state[CHEAPEST] &&
        state[CHEAPEST].map(
          li =>
            isDelivery(li)
              ? { ...li, addressId: action.selectedAddress.addressId }
              : li
        )
      const newCombined =
        state[COMBINED] &&
        state[COMBINED].map(
          li =>
            isDelivery(li)
              ? { ...li, addressId: action.selectedAddress.addressId }
              : li
        )
      const newFastest =
        state[FASTEST] &&
        state[FASTEST].map(
          li =>
            isDelivery(li)
              ? { ...li, addressId: action.selectedAddress.addressId }
              : li
        )
      return {
        ...state,
        ...(newCheapest ? { [CHEAPEST]: newCheapest } : {}),
        ...(newCombined ? { [COMBINED]: newCombined } : {}),
        ...(newFastest ? { [FASTEST]: newFastest } : {}),
      }
    }

    case types.SHOW_OMNISHIPPING_COMPLETED: {
      return {
        ...state,
        shouldUpdateUi: !action.show ? true : state.shouldDisableToggle,
        shouldDisableToggle: !action.show ? false : state.shouldDisableToggle,
      }
    }

    default:
      return state
  }
}

function getLogisticsInfoWithSelectedSlas(state, action, channel) {
  const updatedLogisticsInfo = changeActiveSlas({
    action,
    logisticsInfo: state.logisticsInfo,
    items: action.items,
    sellers: action.sellers,
    channel,
    canEditData: action.canEditData,
    slaOption: action.activePickupPoint && action.activePickupPoint.id,
  })
  const leanShippingOptions = getLeanShippingOptions({
    logisticsInfo: updatedLogisticsInfo,
    activeChannel: channel,
  })

  return {
    ...state,
    logisticsInfo: updatedLogisticsInfo,
    ...(leanShippingOptions.cheapest
      ? { [CHEAPEST]: leanShippingOptions.cheapest }
      : { [CHEAPEST]: undefined }),
    ...(leanShippingOptions.combined
      ? { [COMBINED]: leanShippingOptions.combined }
      : { [COMBINED]: undefined }),
    ...(leanShippingOptions.fastest
      ? { [FASTEST]: leanShippingOptions.fastest }
      : { [FASTEST]: undefined }),
  }
}

function getNewUpdatedLogisticsInfo(updatedLogisticsInfo, logisticsInfo) {
  if (logisticsInfo) {
    return logisticsInfo.map(li => {
      const currentUpdatedLi = updatedLogisticsInfo.find(
        localLi => localLi.itemIndex === li.itemIndex
      )
      return {
        ...li,
        ...currentUpdatedLi,
        slas: li.slas.map(sla => {
          const currentUpdatedSla = currentUpdatedLi.slas.find(
            localSla => localSla.id === sla.id
          )
          return {
            ...sla,
            ...currentUpdatedSla,
            deliveryWindow: sla.deliveryWindow,
          }
        }),
      }
    })
  }

  return []
}

function isOriginComponentOmnishipping() {
  const aditionalShippingData = getItem('aditionalShippingData')

  return get(aditionalShippingData, 'originComponent') === 'omnishipping'
}

function getScheduledDeliveryActiveFromStorage() {
  const aditionalShippingData = getItem('aditionalShippingData')

  return get(aditionalShippingData, 'isScheduledDeliveryActive')
}
