export const authCookie = 'x-mycheckout-orion'

export const login = async (
  _: unknown,
  { authCode }: { authCode: string },
  { clients: { orionServices: OrionServicesClient }, cookies, request }: Context
) => {
  const origin = request.get('origin').split('://')
  const args = {
    redirectUrl: '',
    consumerId: '',
    clientIp: '',
    authCode,
  }

  args.redirectUrl = `${request.get('origin')}/`
  // TODO: investigar de donde obtener ORN
  args.consumerId = 'ORN'
  args.clientIp = request.get('x-forwarded-for')?.split(',')?.[0] || '127.0.0.1'

  const response = (await OrionServicesClient.auth.login(args)) as {
    token: string
    transactionId: string
  }

  cookies.set(
    authCookie,
    Buffer.from(`${response.transactionId}:${response.token}`).toString(
      'base64'
    ),
    {
      httpOnly: false,
      domain: origin[1],
      secure: origin[0] === 'https',
      expires: new Date(
        new Date().setTime(new Date().getTime() + 2 * 60 * 60 * 1000)
      ),
    }
  )

  return response
}
