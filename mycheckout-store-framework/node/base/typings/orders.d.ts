interface OrderInput {
  items: [ItemInput]
  payment: PaymentDataInput
  profile: ProfileInput
  shipping: ShippingInput
  account: AccountInput
  channel: string
  oms: string
  customApps: CustomDataInput
}

interface CustomDataInput {
  customApps: [CustomAppsInput]
}

interface CustomAppsInput {
  id: string
  major: number
  fields: [CustomFieldsInput]
}

interface CustomFieldsInput {
  key: string
  value: string
}

interface ShippingInput {
  addressId: string
  externalAddress: unknown
  logisticsInfo: [LogisticInfoInput]
}

interface ItemInput {
  id: string
  quantity: number
  seller: string
}

interface LogisticInfoInput {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
}
