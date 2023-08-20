import Koa from 'koa'

export async function healthHandler(ctx: Koa.ParameterizedContext) {
  ctx.body = `I'm fine!`
  ctx.status = 200
}
