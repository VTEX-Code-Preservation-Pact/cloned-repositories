export const accounts = async (
  _: unknown,
  __: unknown,
  { clients: { accounts: AccountsClient } }: Context
) => AccountsClient.accounts()
