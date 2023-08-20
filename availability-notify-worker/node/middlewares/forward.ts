import { json } from 'co-body'

export async function forward(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { availability },
    req,
  } = ctx

  const request = (await json(req)) as any

  try {
    await availability.forwardNotification(request)
  } catch (error) {
    throw new Error(error)
  }

  ctx.status = 200

  await next()
}
