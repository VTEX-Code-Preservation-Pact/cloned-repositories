interface Arg {
  visualization: Array<{
    type: string
    key: string
  }>
}

export async function handleVisualization(
  _: unknown,
  { visualization }: Arg,
  { clients: { checkoutless }, vtex: { account } }: Context
) {
  const data = await checkoutless.createVisualization(visualization, account)

  return data
}
