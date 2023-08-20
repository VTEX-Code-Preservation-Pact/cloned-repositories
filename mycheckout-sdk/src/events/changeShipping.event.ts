import type { AddressMC } from '../interfaces/orderForm'
import { MeasurePurchaseProcess } from '../services/GoogleTagManager'
import { SHIPPING_DATA } from '../utils/constants'

interface Props {
  address: AddressMC
  hasGoogleAnalytics?: boolean
}
export const ChangeShippingEvent = ({ address, hasGoogleAnalytics }: Props) => {
  try {
    const option = `${address?.street} ${address?.city} - ${address?.state}`

    MeasurePurchaseProcess({
      stepName: SHIPPING_DATA,
      option,
      hasGoogleAnalytics,
    })
  } catch (e) {
    console.error('Error - Fill personal data event: ', e)
  }
}
