export type Section =
  | 'clientProfileData'
  | 'shippingData'
  | 'paymentData'
  | 'logisticsInfo'
  | 'registerFormProfile'
  | 'registerFormShipping'
  | 'summary'
  | 'return'

export type PaymentDataSection = 'list' | 'details'

export type ScreenToGoToCheckout =
  | 'removeUnavailableProducts'
  | 'multiplesPackages'
