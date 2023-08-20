import type { ItemToAdd, Product, ProductItem } from '../../interfaces'
import constants from '../../utils/constants'

interface Props {
  selectedItem: ProductItem
  product: Product
  itemToAdd: ItemToAdd
  hasGoogleAnalytics?: boolean
}
export const SubmitItemAddedToCart = ({
  selectedItem,
  product,
  itemToAdd,
  hasGoogleAnalytics,
}: Props) => {
  try {
    if (hasGoogleAnalytics && window.dataLayer) {
      const { Price } = selectedItem?.sellers[0]?.commertialOffer

      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: 'addToCart',
        eventSource: 'myCheckout',
        ecommerce: {
          currencyCode: constants.currencyCode,
          add: {
            products: [
              {
                name: selectedItem?.nameComplete,
                id: selectedItem?.itemId,
                price: Price,
                brand: product.brand,
                category: product.categories[0],
                variant: product.productReference,
                quantity: itemToAdd?.quantity,
              },
            ],
          },
        },
      })
    }
  } catch (e) {
    console.error('Error - Submit item added to cart GTM: ', e)
  }
}
