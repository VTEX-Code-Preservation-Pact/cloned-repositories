import type { Item } from '../interfaces'
import { SubmitItemRemovedFromCart } from '../services/GoogleTagManager'

interface Props {
  item: Item
  hasGoogleAnalytics?: boolean
}
export const RemovedFromCartEvent = ({ item, hasGoogleAnalytics }: Props) => {
  try {
    SubmitItemRemovedFromCart(item, hasGoogleAnalytics)
  } catch (e) {
    console.error('Error - Add To Cart Event: ', e)
  }
}
