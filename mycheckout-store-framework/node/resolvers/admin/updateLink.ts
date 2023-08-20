export async function updateLink(
  _: unknown,
  { id, status }: { id: string; status: string },
  { clients: { checkoutless }, vtex: { account } }: Context
) {
  const data = (await checkoutless.updateLink(id, status)) as unknown as {
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
