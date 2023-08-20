export const sessionCookie = 'x-ecommerce-session'
const sessionMaxTime = 30 * 60 * 1000

export const ecommerce = async (
  _: unknown,
  { args }: { args: EcommerceInput },
  { clients: { ecommerce: EcommerceClient }, cookies, request }: Context
) => {
  const session = cookies.get(sessionCookie)

  if (session?.match(/^[a-z0-9]+$/i)) args.session = session
  const response = (await EcommerceClient.log(args)) as { session?: string }
  const origin = request.get('origin').split('://')

  if (response.session?.match(/^[a-z0-9]+$/i)) {
    cookies.set(sessionCookie, response.session, {
      httpOnly: false,
      domain: origin[1],
      overwrite: true,
      maxAge: sessionMaxTime,
    })
  }

  return response
}
