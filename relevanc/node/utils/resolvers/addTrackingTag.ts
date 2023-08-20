export function addTrackingTag(
  offersMap: Relevanc.SponsoredOffersMap,
  product: Product
) {
  const { boostType, offers } = offersMap

  switch (boostType) {
    case 'productId': {
      const { productId } = product

      if (offers[productId]) {
        product.rule = {
          id: `dynamic:${productId}-${offers[productId].tag}`,
        }
      }

      return product
    }

    case 'skuId': {
      const [skuId] = product.items
        .map((item) => item.itemId)
        .filter((sku) => offers[sku])

      if (skuId) {
        product.rule = {
          id: `dynamic:${skuId}-${offers[skuId].tag}`,
        }
      }

      return product
    }

    default: {
      return product
    }
  }
}
