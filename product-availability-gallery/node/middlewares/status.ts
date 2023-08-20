export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code, warehouse },
    clients: { status: statusClient },
  } = ctx

  // console.info('Received code:', code)
  // console.info('Received ctx:', ctx.state)

  const statusResponse = await statusClient.getStatus(code, warehouse)

  // console.info('Status response:', statusResponse)

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code,warehouse)

  // console.info('Status headers', headers)
  // console.info('Status data:', data)

  // ctx.status = responseStatus
  ctx.body = statusResponse
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
