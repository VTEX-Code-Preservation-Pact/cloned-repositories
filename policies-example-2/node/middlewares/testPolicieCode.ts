export async function testPolicieCode(ctx: Context) {
  const {
    clients: { f1 },
  } = ctx

  const retorno = await f1.getConstructor()

  ctx.status = 200
  ctx.body = retorno
}
