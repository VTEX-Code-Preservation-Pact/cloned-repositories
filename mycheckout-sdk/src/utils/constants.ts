export default {
  JQUERY_SCRIPT: ['https://code.jquery.com/jquery-1.11.3.min.js', 'script'],
  PCI_PROXY_SCRIPT: [
    'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.js',
    'script',
  ],
  PCI_PROXY_SCRIPT_DEV: [
    'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.js',
    'script',
  ],
  PAYMENTEZ_SCRIPT: [
    'https://cdn.paymentez.com/ccapi/sdk/payment_stable.min.js',
    'script',
  ],
  PAYMENTEZ_LINK: [
    'https://cdn.paymentez.com/ccapi/sdk/payment_stable.min.css',
    'link',
  ],
  PAYMENTEZ_CREDENTIALS: {
    stg: ['stg', '', ''],
    prod: ['prod', '', ''],
  },
  MERCADOPAGO_SCRIPT: ['https://sdk.mercadopago.com/js/v2', 'script'],
  salesChannel: '1',
  currencyCode: 'COP',
  countryCode: 'COL',
  lastStep: 5,
  prefix: '+57',
  documentType: 'CC',
  mercadoPagoPublicKey: '',
  gateway: 'Mercadopago',
  merchantID: '',
  merchantIDDev: '',
  serverErrorMessage:
    'A communication error occurred with the MyCheckout server',
  accountNotConfiguredMessage: 'Account is not setup yet',
  MYCHECKOUT_CSS: ['/arquivos/mycheckout.css', 'link'],
  ORDER_PLACED_LINK: `https://${window?.location?.hostname}/checkout/gatewayCallback/`,
}
export const KEYS_NOT_SET_TYPING = [
  'Tab',
  'ArrowRight',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'Meta',
  'Alt',
  'Control',
  'Shift',
  ' ',
  'CapsLock',
  'Backspace',
]
export const ENTER_EMAIL = 'EnterEmail'
export const PERSONAL_DATA = 'PersoanlData'
export const SHIPPING_DATA = 'ShippingData'
export const SHIPPING_TYPE_DATA = 'ShippingTypeData'
export const COUPON = 'Coupon'
export const PAYMENT = 'Payment'
export const BUY_COMPLETED = 'BuyCompleted'
export const COOKIE_NAME_GTM = 'checkoutless_gtm'
export const stepByName = {
  EnterEmail: 1,
  PersoanlData: 2,
  ShippingData: 3,
  ShippingTypeData: 4,
  Coupon: 5,
  Payment: 6,
  BuyCompleted: 7,
}
