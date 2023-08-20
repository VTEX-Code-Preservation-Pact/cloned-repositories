import { MeasurePurchaseProcess } from '../services/GoogleTagManager'
import { SHIPPING_TYPE_DATA } from '../utils/constants'

interface Props {
  option: string
  hasGoogleAnalytics?: boolean
}
export const FillShippingTypeDataEvent = ({
  option,
  hasGoogleAnalytics,
}: Props) => {
  try {
    MeasurePurchaseProcess({
      stepName: SHIPPING_TYPE_DATA,
      option,
      hasGoogleAnalytics,
    })
  } catch (e) {
    console.error('Error - Fill personal data event: ', e)
  }
}
