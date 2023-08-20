/* ---- Checkout ---- */

export { createUser, updateUser } from './checkout/user'

export {
  createAddress,
  externalAddress,
  deleteAddress,
  updateAddress,
} from './checkout/address'

export { deletePayment } from './checkout/payments'

export { createOrder } from './checkout/orders'

export { ecommerce } from './checkout/ecommerce'

/* ---- admin ---- */

export { saveToken } from './admin/saveToken'

export { createLink } from './admin/createLink'

export { updateLink } from './admin/updateLink'

export { deleteLink } from './admin/deleteLink'

export { handleVisualization } from './admin/handleVisualization'

export { createPaymentMethod } from './admin/createPaymentsMethods'

export { updateStyles } from './admin/updateStyles'
