export function getAccount(
  _: unknown,
  __: unknown,
  { clients: { checkoutless } }: Context
) {
  return checkoutless.findByAccount()
}
