export async function createLink(
  _: unknown,
  { accountApprover }: { accountApprover: string },
  { clients: { checkoutless }, vtex: { account } }: Context
) {
  const data = (await checkoutless.createLink({
    accountRequester: account,
    accountApprover,
  })) as unknown as {
    accountApprover: string
    accountRequester: string
  }

  return {
    ...data,
    account:
      account === data.accountApprover
        ? data.accountRequester
        : data.accountApprover,
    approver: account === data.accountApprover,
  }
}
