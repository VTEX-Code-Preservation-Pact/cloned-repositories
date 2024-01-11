import * as types from './action-types'
import { DENIED, VTEXLOCAL } from '../constants'

export const changeActivePickupOptions = pickupOptions => ({
  type: types.CHANGE_ACTIVE_PICKUP_OPTIONS,
  pickupOptions,
})

export const changeActivePickupDetails = ({
  pickupPoint,
  activePickupPoint,
  askForGeolocation,
}) => ({
  type: types.CHANGE_ACTIVE_PICKUP_DETAILS,
  pickupPoint,
  activePickupPoint,
  askForGeolocation,
})

export const closePickupModal = () => ({
  type: types.CLOSE_PICKUP_MODAL,
})

export const openPickupModal = ({ askForGeolocation }) => ({
  type: types.OPEN_PICKUP_MODAL,
  askForGeolocation,
})

export const closePickupDetails = () => ({
  type: types.CLOSE_PICKUP_DETAILS,
})

export const changeActivePickupSeller = sellerId => ({
  type: types.CHANGE_ACTIVE_PICKUP_SELLER,
  sellerId,
})

export const hasGeolocation = hasGeolocation => ({
  type: types.HAS_GEOLOCATION,
  hasGeolocation,
})

export const checkIfHasDeniedGeolocation = () => dispatch => {
  if (!navigator.permissions) {
    dispatch(hasGeolocation(!!navigator.geolocation))
  } else {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(permission =>
        dispatch(
          hasGeolocation(
            permission.state !== DENIED ||
              window.location.host.includes(VTEXLOCAL)
          )
        )
      )
  }
}
