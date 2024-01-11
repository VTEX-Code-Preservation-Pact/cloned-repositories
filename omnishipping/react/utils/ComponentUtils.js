import { PAYMENT_HASH } from '../constants'

export function createKey(somePackage, index) {
  const {
    itemIndex,
    selectedDeliveryChannel,
    selectedSla,
    addressId,
  } = somePackage.firstLogisticsInfo

  return itemIndex + selectedDeliveryChannel + selectedSla + addressId || index
}

export function isPaymentHash() {
  return window.location.hash === PAYMENT_HASH
}
