import * as types from './action-types'
import {
  getAccountName,
  getLocale,
  getUserEmail,
} from '../selectors/order-form-selectors'
import { AUTHENTICATED_USER } from '../constants/checkout-events'
const $ = window.$

export const vtexIdStarted = () => ({
  type: types.VTEX_ID_STARTED,
})

export const closedVtexId = () => ({
  type: types.VTEX_ID_CLOSED,
})

export const startVtexID = callback => (dispatch, getState) => {
  const state = getState()

  dispatch(vtexIdStarted())

  window.vtexid &&
    window.vtexid.start({
      returnUrl: window.location.href,
      accountName: getAccountName(state) || window.vtex.accountName,
      locale: getLocale(state),
      email: getUserEmail(state),
    })

  const authCallback = () => callback && callback(true)
  if ($) {
    $(window).one(AUTHENTICATED_USER, authCallback)
    $(window).one('closed.vtexid', () => {
      dispatch(closedVtexId())
      $(window).off(AUTHENTICATED_USER, authCallback)
    })
  }
}
