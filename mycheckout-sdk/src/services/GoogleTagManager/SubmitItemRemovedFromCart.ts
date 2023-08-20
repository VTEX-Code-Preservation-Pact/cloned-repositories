import type { Item } from '../../interfaces'
import constants from '../../utils/constants'

export const SubmitItemRemovedFromCart = (
  item: Item,
  hasGoogleAnalytics?: boolean
) => {
  try {
    if (hasGoogleAnalytics && window.dataLayer) {
      const { sellingPrice, listPrice } = item
      const price = Number.isNaN(sellingPrice) ? listPrice : sellingPrice

      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: 'removeFromCart',
        eventSource: 'myCheckout',
        ecommerce: {
          currencyCode: constants.currencyCode,
          add: {
            products: [
              {
                name: item?.name,
                id: item?.id,
                price,
                brand: item.additionalInfo.brandName,
                category: item.productCategories[1],
                variant: item.refId,
                quantity: item?.quantity,
              },
            ],
          },
        },
      })
    }
  } catch (e) {
    console.error('Error - Submit item removed from cart GTM: ', e)
  }
}
