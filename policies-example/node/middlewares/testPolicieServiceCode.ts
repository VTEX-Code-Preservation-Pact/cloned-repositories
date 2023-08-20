export async function testPolicieServiceCode(ctx: Context) {
  const {
    clients: { f1 },
  } = ctx

  const retorno = await f1.getDrivers()

  ctx.status = 200
  ctx.body = retorno
}
