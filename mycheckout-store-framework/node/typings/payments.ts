export interface IPaymentSystem {
  id: string
  name: string
}

export interface ISalesChannels {
  id: string
}

export interface IPaymentRules {
  enabled: boolean
  id: string
  name: string
  paymentSystem: IPaymentSystem
  salesChannels: ISalesChannels[]
}

export interface IPayment {
  id: string
  paymentMethodName: string
  payment: string
  isActive: boolean
  type: string
  accountName: string
}
