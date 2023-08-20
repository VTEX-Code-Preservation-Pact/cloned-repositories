import type { Item, Totalizer } from '../../interfaces'
import { formatProducts } from './utils'

export const SubmitBuy = (
  items: Item[],
  transactionId: string,
  totalizers: Totalizer[],
  value: number,
  hasGoogleAnalytics?: boolean
) => {
  try {
    if (hasGoogleAnalytics && window.dataLayer) {
      const [shipping, tax] = totalizers.filter(
        (totalizer: Totalizer) =>
          totalizer.id === 'Shipping' || totalizer.id === 'Tax'
      )

      const products = formatProducts(items)

      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        eventSource: 'myCheckout',
        ecommerce: {
          purchase: {
            actionField: {
              id: transactionId,
              revenue: value,
              tax: tax ? tax.value / 100 : 0,
              shipping: shipping ? shipping.value / 100 : 0,
            },
            products,
          },
        },
      })
    }
  } catch (e) {
    console.error('Error - Submit item removed from cart GTM: ', e)
  }
}
