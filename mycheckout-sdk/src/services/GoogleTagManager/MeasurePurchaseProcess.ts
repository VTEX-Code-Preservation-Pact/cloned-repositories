import type { Item } from '../../interfaces'
import { stepByName } from '../../utils/constants'
import { CheckoutOption } from './CheckoutOption'
import {
  changeOptionInCookieByStep,
  existStepInCookie,
  formatProducts,
  setStepInCookie,
} from './utils'

interface Props {
  stepName: string
  items?: Item[]
  option?: string
  hasGoogleAnalytics?: boolean
}
export const MeasurePurchaseProcess = ({
  stepName,
  option = null,
  items = null,
  hasGoogleAnalytics = false,
}: Props) => {
  try {
    if (hasGoogleAnalytics && window.dataLayer) {
      const step = stepByName[stepName]

      if (!existStepInCookie(step)) {
        const products = items ? formatProducts(items) : null

        const data = {
          event: 'checkout',
          eventSource: 'myCheckout',
          ecommerce: {
            checkout: {
              actionField: { step, option },
              products,
            },
          },
        }

        if (!option) delete data.ecommerce.checkout.actionField.option
        if (!items) delete data.ecommerce.checkout.products

        window.dataLayer.push({ ecommerce: null })
        window.dataLayer.push(data)
        setStepInCookie(step, option)
      } else if (changeOptionInCookieByStep(step, option)) {
        CheckoutOption({ stepName, option, hasGoogleAnalytics })
      }
    }
  } catch (e) {
    console.error('Error - Measure purchase process GTM: ', e)
  }
}
