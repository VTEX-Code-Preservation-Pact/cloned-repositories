export async function user(ctx: Context, next: () => Promise<any>) {
  const {
    state: { userId },
    clients: { additionalData: additionalDataClient },
  } = ctx

  // console.info('Received userId:', userId)

  const userResponse = await additionalDataClient.get(userId)

  // console.info('user response:', userResponse)

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code)


  ctx.body = userResponse
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
