import { MeasurePurchaseProcess } from '../services/GoogleTagManager'
import { COUPON } from '../utils/constants'

interface Props {
  option: string
  hasGoogleAnalytics?: boolean
}
export const EnterCouponEvent = ({ option, hasGoogleAnalytics }: Props) => {
  try {
    MeasurePurchaseProcess({ stepName: COUPON, option, hasGoogleAnalytics })
  } catch (e) {
    console.error('Error - Enter email event: ', e)
  }
}
