/* ---- Checkout ---- */

export { getUser } from './checkout/user'

export { login, verifyCode } from './checkout/auth'

export { getAddress } from './checkout/address'

export { getPayments } from './checkout/payments'

export {
  getCountries,
  getCountry,
  getStateCities,
  getCities,
} from './checkout/countries'

export { getDocumentTypes } from './checkout/documents'

export { accounts } from './checkout/accounts'

export { validateCredit } from './checkout/credit'

/* ---- Admin ---- */

export { token } from './admin/token'

export { getLinksByAccount } from './admin/getLinksByAccount'

export { getAccount } from './admin/getAccount'

export { getCategories } from './admin/getCategories'

export { getPaymentsMethods } from './admin/getPaymentsMethods'

export {
  ticketAverage,
  checkout,
  button,
  conversionRate,
} from './admin/metrics'

export { getPaymentProcessStatus } from './checkout/orders'
export { getStyles } from './admin/getStyles'

/* ---- Orion ---- */
export * from './orion/queries'
