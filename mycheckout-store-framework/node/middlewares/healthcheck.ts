export async function healthcheck(ctx: Context, next: () => Promise<any>) {
  ctx.status = 200
  ctx.body = 'OK'
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
