import * as types from '../actions/action-types'
import get from 'lodash/get'
import { hasSLAs } from '../utils/SlasUtils'
import { findFirstItemWithPickup, findPickupSla } from '../utils/OrderFormUtils'
import { getPickupOptions } from '../utils/PickupUtils'

const defaultState = {
  isModalActive: false,
  isPickupDetailsActive: false,
  pickupOptions: [],
  pickupPoint: null,
  activePickupPoint: null,
  activeSellerId: '',
  askForGeolocation: null,
  isSearching: false,
  hasGeolocation: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_ORDERFORM: {
      const logisticsInfo = get(action, 'orderForm.shippingData.logisticsInfo')
      const items = action.orderForm && action.orderForm.items

      const hasSlas = logisticsInfo && logisticsInfo.find(li => hasSLAs(li))

      if (logisticsInfo && items) {
        const firstItemWithPickup = findFirstItemWithPickup({
          logisticsInfo,
          items,
        })

        const firstPickupSla =
          firstItemWithPickup && findPickupSla(firstItemWithPickup)

        const pickupOptions = getPickupOptions(logisticsInfo)

        return {
          ...state,
          ...(!hasSlas ? { isSearching: false } : {}),
          ...(!state.activePickupPoint && firstPickupSla
            ? { activePickupPoint: firstPickupSla }
            : {}),
          isPickupDetailsActive: false,
          pickupOptions,
        }
      }

      return state
    }

    case types.SIMULATE_SHIPPING_FAILURE:
    case types.UPDATE_SHIPPING_FAILURE:
    case types.UPDATE_SIMULATION_OPTIONS: {
      return {
        ...state,
        isSearching: false,
      }
    }

    case types.UPDATE_SHIPPING_REQUEST: {
      return {
        ...state,
        isSearching: true,
      }
    }

    case types.CHANGE_ACTIVE_PICKUP_OPTIONS: {
      return {
        ...state,
        isModalActive: true,
        askForGeolocation: false,
        isSearching: false,
        pickupOptions: action.pickupOptions,
      }
    }

    case types.OPEN_PICKUP_MODAL: {
      return {
        ...state,
        askForGeolocation: action.askForGeolocation,
        isModalActive: true,
      }
    }

    case types.CLOSE_PICKUP_MODAL: {
      return { ...state, isModalActive: false }
    }

    case types.CHANGE_ACTIVE_PICKUP_DETAILS: {
      return {
        ...state,
        isPickupDetailsActive: !!action.pickupPoint,
        pickupPoint: action.pickupPoint || null,
        activePickupPoint:
          action.pickupPoint || state.activePickupPoint || null,
        askForGeolocation: action.askForGeolocation || null,
      }
    }

    case types.CLOSE_PICKUP_DETAILS: {
      return { ...state, isPickupDetailsActive: false }
    }

    case types.HAS_GEOLOCATION: {
      return { ...state, hasGeolocation: action.hasGeolocation }
    }

    case types.CHANGE_ACTIVE_PICKUP_SELLER: {
      return {
        ...state,
        activeSellerId: action.sellerId || '',
        isModalActive: true,
      }
    }

    default:
      return state
  }
}
