export interface IPaymentSystem {
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
  isActive: boolean
  type: string
  accountName: string
}

export interface PaymentListContext {
  onChangeState: (index: any) => void
  disabledChange: boolean
  onShowAlert: () => void
}
