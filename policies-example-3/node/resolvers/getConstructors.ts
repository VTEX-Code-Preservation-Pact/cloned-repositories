export async function getConstructors(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { constructors },
  } = ctx

  const retorno = await constructors.getConstructors()

  return retorno
}
