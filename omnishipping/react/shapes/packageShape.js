import PropTypes from 'prop-types'
import { itemShape } from './itemShape'

const { array, arrayOf, any, number, string, shape, bool, object } = PropTypes

export const addressShape = shape({
  addressId: string,
  addressQuery: string,
  addressType: string,
  city: string,
  complement: string,
  country: string,
  geoCoordinates: array,
  neighborhood: string,
  number: string,
  postalCode: string,
  receiverName: string,
  reference: string,
  state: string,
  street: string,
})

export const pickupStoreInfoShape = shape({
  additionalInfo: any,
  address: any,
  distance: any,
  dockId: any,
  friendlyName: any,
  isPickupStore: bool,
})

export const deliveryIdsShape = shape({
  courierId: string,
  courierName: string,
  dockId: string,
  quantity: number,
  warehouseId: string,
})

export const slaShape = shape({
  availableDeliveryWindows: array,
  deliveryChannel: string,
  deliveryIds: arrayOf(deliveryIdsShape),
  deliveryWindow: object,
  id: string,
  listPrice: number,
  lockTTL: string,
  name: string,
  pickupPointId: string,
  pickupStoreInfo: pickupStoreInfoShape,
  price: number,
  shippingEstimate: string,
  shippingEstimateDate: string,
  tax: number,
})

export const packageShape = shape({
  address: addressShape,
  deliveryChannel: string,
  item: any,
  items: arrayOf(itemShape).isRequired,
  package: string,
  pickupFriendlyName: string,
  selectedSla: string,
  seller: string,
  shippingEstimate: string,
  shippingEstimateDate: string,
  slas: arrayOf(slaShape),
})
