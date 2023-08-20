interface PaymentMethodsInput {
  type: string
  isActive: boolean
  paymentMethodName: string
}

export function createPaymentMethod(
  _: unknown,
  args: PaymentMethodsInput,
  { clients: { paymentsClient } }: Context
) {
  return paymentsClient.createPaymentMethod(args)
}
