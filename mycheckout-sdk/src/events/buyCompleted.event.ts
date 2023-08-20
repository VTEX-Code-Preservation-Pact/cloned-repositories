import type { Item, Totalizer } from '../interfaces'
import { SubmitBuy } from '../services/GoogleTagManager'
import { COOKIE_NAME_GTM } from '../utils/constants'

interface Props {
  items: Item[]
  transactionId: string
  totalizers: Totalizer[]
  value: number
  hasGoogleAnalytics?: boolean
}
export const BuyCompletedEvent = ({
  items,
  transactionId,
  totalizers,
  value,
  hasGoogleAnalytics = false,
}: Props) => {
  try {
    SubmitBuy(items, transactionId, totalizers, value, hasGoogleAnalytics)
    document.cookie = `${COOKIE_NAME_GTM}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  } catch (e) {
    console.error('Error - Add To Cart Event: ', e)
  }
}
