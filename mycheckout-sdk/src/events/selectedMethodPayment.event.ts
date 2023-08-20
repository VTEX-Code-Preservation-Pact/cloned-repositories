import {
  CheckoutOption,
  MeasurePurchaseProcess,
} from '../services/GoogleTagManager'
import { PAYMENT } from '../utils/constants'

interface Props {
  change?: boolean
  option?: string
  hasGoogleAnalytics?: boolean
}
export const SelectedMethodPaymentEvent = ({
  change = false,
  option,
  hasGoogleAnalytics = false,
}: Props) => {
  try {
    if (change) {
      CheckoutOption({ stepName: PAYMENT, option, hasGoogleAnalytics })
    } else {
      MeasurePurchaseProcess({ stepName: PAYMENT, option, hasGoogleAnalytics })
    }
  } catch (e) {
    console.error('Error - Selected Method Payment Event: ', e)
  }
}
