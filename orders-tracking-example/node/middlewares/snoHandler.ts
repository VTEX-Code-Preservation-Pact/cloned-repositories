export async function snoHandler(
  ctx: NotificationContext,
  next: () => Promise<any>
) {
  console.log(ctx.body)
  await next()
}
