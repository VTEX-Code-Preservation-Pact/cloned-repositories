import { MeasurePurchaseProcess } from '../services/GoogleTagManager'
import { PERSONAL_DATA } from '../utils/constants'

interface Props {
  hasGoogleAnalytics?: boolean
}

export const FillPersonalDataEvent = ({
  hasGoogleAnalytics = false,
}: Props) => {
  try {
    MeasurePurchaseProcess({ stepName: PERSONAL_DATA, hasGoogleAnalytics })
  } catch (e) {
    console.error('Error - Fill personal data event: ', e)
  }
}
