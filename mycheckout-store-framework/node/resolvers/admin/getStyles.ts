export const getStyles = async (
  _: any,
  __: any,
  { clients: { checkoutless: CheckoutlessClient }, vtex: { account } }: Context
) => {
  return CheckoutlessClient.getStyles(account)
}
