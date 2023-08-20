interface PaymentMethodsInput {
  type: string
  isActive: boolean
  paymentMethodName: string
  accountName: string
}

interface PaymentMethods {
  id: ID
  type: string
  isActive: boolean
  paymentMethodName: string
  accountName: string
}

interface PaymentDataInput {
  cardId?: string
  gateway: string
  paymentMethod: string
  token?: string
  franchise?: string
  number?: string
  bin?: string
  holderName?: string
  holderDocument?: string
  cvv?: string
  expirationDate?: string
  cardNumber?: string
  additionalData: Array<{ key: string; value: string }> | Record<string, string>
}

interface Payments {
  id: string
  email: User['email']
  franchise: string
  number: string
  ccToken: string
  bin?: string
  card: { cardContent: unknown }
}

interface IPayments {
  deletePayment(id: Payments['id'], auth: string): Promise<unknown>
}
