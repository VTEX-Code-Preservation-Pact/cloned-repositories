import { PAGE_TYPE } from '../contants'
import {
  errorHandler,
  getSettings,
  validateArgs,
  getSearchPageOffers,
  getCategoryPageOffers,
} from '../utils/resolvers'
import { dynamicRulesMapper } from '../utils'

export async function before(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SearchParams> {
  if (!validateArgs(args)) {
    return errorHandler('Invalid search params', ctx)
  }

  const settings = await getSettings(ctx)

  if (!settings) {
    return errorHandler('Settings not found', ctx)
  }

  /**
   * The `query` param is only present for the Search Results page.
   * The selectedFacets can be present in both pages (Search Results and Categories)
   */
  const type = !args.query ? PAGE_TYPE.CATEGORY : PAGE_TYPE.SEARCH
  let offers: Relevanc.SponsoredOffer[] | null

  switch (type) {
    case PAGE_TYPE.SEARCH: {
      offers = await getSearchPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      break
    }

    case PAGE_TYPE.CATEGORY: {
      offers = await getCategoryPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      break
    }

    default: {
      return args
    }
  }

  if (!offers) {
    return { ...args }
  }

  const offersMap: Relevanc.SponsoredOffersMap = {
    boostType: settings.boostType,
    offers: {},
  }

  const dynamicRules = offers.map((offer) => {
    offersMap.offers[offer.offerId] = offer

    return dynamicRulesMapper(offer, settings)
  })

  return { ...args, dynamicRules, customPluginInfo: JSON.stringify(offersMap) }
}
