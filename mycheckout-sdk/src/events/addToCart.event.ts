import type { ItemToAdd, Product, ProductItem } from '../interfaces'
import { SubmitItemAddedToCart } from '../services/GoogleTagManager'

interface Props {
  selectedItem: ProductItem
  product: Product
  itemToAdd: ItemToAdd
  hasGoogleAnalytics?: boolean
}
export const AddToCartEvent = (props: Props) => {
  const { selectedItem, product, itemToAdd, hasGoogleAnalytics } = props

  try {
    SubmitItemAddedToCart({
      selectedItem,
      product,
      itemToAdd,
      hasGoogleAnalytics,
    })
  } catch (e) {
    console.error('Error - Add To Cart Event: ', e)
  }
}
