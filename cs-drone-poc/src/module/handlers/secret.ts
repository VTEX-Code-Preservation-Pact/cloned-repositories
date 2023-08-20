import Koa from 'koa'

export async function secretHandler(ctx: Koa.ParameterizedContext) {
  ctx.body = '007 Secret Route'
  ctx.status = 200
}
