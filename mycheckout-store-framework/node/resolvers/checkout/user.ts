import { authCookie } from './auth'

export const formatCardContent = (cardContent: Record<string, string>) => {
  const newCardContent: Array<{ key: string; value: string }> = []

  for (const key in cardContent) {
    newCardContent.push({ key, value: cardContent[key] })
  }

  return newCardContent
}

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

export const getUser = async (
  _: unknown,
  { email }: { email: string },
  { clients: { user: UserClient }, cookies, vtex: { account, logger } }: Context
) => {
  const start = process.hrtime()

  logger.info(`[STARTED] ${start}`)
  const resp = (await UserClient.getUser(
    email,
    account,
    cookies.get(authCookie) as string
  )) as User

  const durationInMilliseconds = getDurationInMilliseconds(start)

  logger.info(`[FINISHED] ${durationInMilliseconds}`)
  resp.id_type = resp.documentType
  resp.id_number = resp.document
  resp.phone_code = resp.phoneCode
  resp.phone_number = resp.phoneNumber

  if (resp.selectedPayment?.card?.cardContent) {
    resp.selectedPayment.card.cardContent = formatCardContent(
      resp.selectedPayment.card.cardContent as Record<string, string>
    )

    resp.cards = resp.cards.map((card: { cardContent: unknown }) => {
      if (card?.cardContent) {
        return {
          ...card,
          cardContent: formatCardContent(
            card.cardContent as Record<string, string>
          ),
        }
      }

      return card
    })
  }

  return resp
}

export const updateUser = async (
  _: unknown,
  { userArgs }: { userArgs: UserInput },
  { clients: { user: UserClient }, cookies }: Context
) => {
  const resp = (await UserClient.updateUser(
    userArgs,
    cookies.get(authCookie) as string
  )) as { data: User } & User

  resp.id_type = resp.documentType
  resp.id_number = resp.document
  resp.phone_code = resp.phoneCode
  resp.phone_number = resp.phoneNumber

  if (resp.data.selectedPayment?.card?.cardContent) {
    resp.data.selectedPayment.card.cardContent = formatCardContent(
      resp.data.selectedPayment.card.cardContent as Record<string, string>
    )

    resp.data.cards = resp.data.cards.map((card: { cardContent: unknown }) => {
      if (card?.cardContent) {
        return {
          ...card,
          cardContent: formatCardContent(
            card.cardContent as Record<string, string>
          ),
        }
      }

      return card
    })
  }

  return resp
}

export const createUser = async (
  _: unknown,
  args: User,
  { clients: { user: UserClient } }: Context
) => {
  const resp = (await UserClient.createUser(args)) as User

  resp.id_type = resp.documentType
  resp.id_number = resp.document
  resp.phone_code = resp.phoneCode
  resp.phone_number = resp.phoneNumber

  return resp
}
