import { addTrackingTag, errorHandler } from '../utils/resolvers'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  ctx: Context
): Promise<ProductSearchResult> {
  if (!args.customPluginInfo) {
    return args.searchResult
  }

  const { products } = args.searchResult
  const offersMap: Relevanc.SponsoredOffersMap = JSON.parse(
    args.customPluginInfo
  )

  if (!Object.keys(offersMap.offers).length) {
    return errorHandler('No offers not found', ctx)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  return args.searchResult
}
