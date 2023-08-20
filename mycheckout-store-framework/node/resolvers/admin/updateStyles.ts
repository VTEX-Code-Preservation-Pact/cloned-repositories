export const updateStyles = async (
  _: any,
  {
    styles,
    buttonText,
    restore = false,
  }: {
    styles: string
    buttonText: string
    restore: boolean
  },
  { clients: { checkoutless: CheckoutlessClient }, vtex: { account } }: Context
) => {
  return CheckoutlessClient.updateStyles(
    { styles, buttonText, restore },
    account
  )
}
