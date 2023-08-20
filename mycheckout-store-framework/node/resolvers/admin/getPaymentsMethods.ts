export async function getPaymentsMethods(
  _: unknown,
  __: unknown,
  { clients: { paymentsClient } }: Context
) {
  const paymentMethods = await paymentsClient.getPaymentsMethods()

  return paymentMethods
}
