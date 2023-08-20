export async function getLinksByAccount(
  _: unknown,
  __: unknown,
  { clients: { checkoutless }, vtex: { account } }: Context
) {
  const data = await checkoutless.getLinksByAccount(account)

  return data.map(
    (item: { accountApprover: string; accountRequester: string }) => ({
      ...item,
      account:
        account === item.accountApprover
          ? item.accountRequester
          : item.accountApprover,
      approver: account === item.accountApprover,
    })
  )
}
