interface Window extends Window {
  _kkstrack: {
    merchantInfo: Array<{ country: string; merchantId: string }>
    orderValue: string
    orderId: string
  }
}
