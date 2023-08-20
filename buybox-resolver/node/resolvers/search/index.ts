import { NotFoundError, UserInputError } from '@vtex/api'
import { head } from 'ramda'

interface ProductArgs {
  skuId?: string
  salesChannel?: number
  country?: string
  postalCode?: string
}

export const queries = {
  sortSellers: async (_: unknown, rawArgs: ProductArgs, ctx: Context) => {
    const {
      clients: { search, checkout },
      vtex: { segment },
    } = ctx

    const { skuId, country, postalCode } = rawArgs
    const salesChannel = rawArgs.salesChannel ?? segment?.channel

    if (!skuId) {
      throw new UserInputError('No product identifier provided')
    }

    const products = await search.productBySku(skuId, salesChannel)

    let product: SearchProduct | undefined

    if (products.length > 0) {
      product = head(products)
    } else {
      throw new NotFoundError(
        `No product was found with requested ${skuId} ${JSON.stringify(
          rawArgs
        )}`
      )
    }

    const item = product?.items.find((i) => i.itemId === skuId)

    const requestBody = {
      country,
      postalCode,
      items: item?.sellers.map((s) => {
        return {
          id: item.itemId,
          quantity: 1,
          seller: s.sellerId,
        }
      }),
    } as SimulationPayload

    const { logisticsInfo } = await checkout.simulation(requestBody)

    const sellerLogisticsInfo = item?.sellers.map((seller, index) => {
      return {
        seller,
        logisticsInfo: logisticsInfo[index],
      }
    })

    sellerLogisticsInfo?.sort(
      (a, b) => a.seller.commertialOffer.Price - b.seller.commertialOffer.Price
    )

    return { sellers: sellerLogisticsInfo?.map((sli) => sli.seller.sellerId) }
  },
}
