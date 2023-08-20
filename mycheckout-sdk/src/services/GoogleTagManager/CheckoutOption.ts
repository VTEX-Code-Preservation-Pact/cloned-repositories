import { stepByName } from '../../utils/constants'
import { updateOptionInCookieByStep } from './utils'

interface Props {
  stepName: string
  option?: string
  hasGoogleAnalytics?: boolean
}
export const CheckoutOption = ({
  stepName,
  option,
  hasGoogleAnalytics,
}: Props) => {
  try {
    if (hasGoogleAnalytics && window.dataLayer) {
      const step = stepByName[stepName]
      const data = {
        event: 'eec.checkout_option',
        eventSource: 'myCheckout',
        ecommerce: {
          checkout_option: {
            actionField: {
              step,
              option,
            },
          },
        },
      }

      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push(data)
      updateOptionInCookieByStep(step, option)
    }
  } catch (e) {
    console.error('Error - Checkout Option GTM: ', e)
  }
}
