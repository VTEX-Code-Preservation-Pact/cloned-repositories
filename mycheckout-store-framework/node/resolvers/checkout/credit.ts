export const validateCredit = (
  _: unknown,
  args: { email: string; totals: number },
  { clients: { credit: CreditClient } }: Context
) => {
  return CreditClient.validateCredit(args)
}
