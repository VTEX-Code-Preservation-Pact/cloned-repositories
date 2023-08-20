import { MeasurePurchaseProcess } from '../services/GoogleTagManager'
import { SHIPPING_DATA } from '../utils/constants'

interface Props {
  option: string
  hasGoogleAnalytics?: boolean
}
export const FillShippingDataEvent = ({
  option,
  hasGoogleAnalytics,
}: Props) => {
  try {
    MeasurePurchaseProcess({
      stepName: SHIPPING_DATA,
      option,
      hasGoogleAnalytics,
    })
  } catch (e) {
    console.error('Error - Fill personal data event: ', e)
  }
}
