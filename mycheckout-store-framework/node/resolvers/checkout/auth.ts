import { formatCardContent } from './user'

export const authCookie = 'x-checkoutless-auth'

export const login = (
  _: unknown,
  { email }: Auth,
  { clients: { auth: AuthClient }, origin }: Context
) => {
  const formatOrigin = origin.split('://')

  return AuthClient.login(email, formatOrigin[1])
}

export const verifyCode = async (
  _: unknown,
  { email, code }: Auth,
  { clients: { auth: AuthClient }, cookies, origin }: Context
) => {
  const response = (await AuthClient.verifyCode({ email, code })) as {
    data: {
      selectedPayment: {
        card: { cardContent: unknown }
      }
      accessToken: string
      cards: Array<{ cardContent: unknown }>
    }
  }

  const formatOrigin = origin.split('://')

  cookies.set(authCookie, response.data.accessToken, {
    httpOnly: false,
    domain: formatOrigin[1],
  })

  if (response.data.selectedPayment?.card?.cardContent) {
    response.data.selectedPayment.card.cardContent = formatCardContent(
      response.data.selectedPayment.card.cardContent as Record<string, string>
    )

    response.data.cards = response.data.cards.map(
      (card: { cardContent: unknown }) => {
        if (card?.cardContent) {
          return {
            ...card,
            cardContent: formatCardContent(
              card.cardContent as Record<string, string>
            ),
          }
        }

        return card
      }
    )
  }

  return response
}
