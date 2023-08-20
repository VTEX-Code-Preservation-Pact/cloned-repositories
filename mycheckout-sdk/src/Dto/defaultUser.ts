import type { ClientProfileData, PaymentData } from '../interfaces'

export const CLIENT_DATA_DEFAULT: ClientProfileData = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
  documentType: null,
  document: null,
  prefix: null,
  phone: null,
  completed: null,
  loadData: null,
  habeasData: null,
}

export const SHIPPING_DATA_DEFAULT: any = {
  availableAddresses: [],
  selectedAddress: null,
  completed: null,
}

export const PAYMENT_DATA_DEFAULT: PaymentData = {
  availablePaymentMethods: [],
  selectedPaymentMethod: null,
}
