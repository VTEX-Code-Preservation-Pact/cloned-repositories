interface Window extends Window {
  __trusted: {
    appKey: string
    days: number
    defaultAddressState: string
  }
}

interface Params {
  appKey: string
  email: string
  firstName: string
  orderId: string
  shippingCounty: string
  days: number
}
