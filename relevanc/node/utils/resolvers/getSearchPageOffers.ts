import { DESKTOP } from '../../contants'

export const getSearchPageOffers = async (args: Relevanc.HandlerArgs) => {
  const {
    ctx: {
      clients: { relevanc },
    },
    settings: { adServerName, maxOffersToDisplay },
    searchParams: { page, query },
  } = args

  try {
    const { offers } = await relevanc.getSponsoredOffers(adServerName, {
      sourcePageNumber: page ? Number(page) : 0,
      keyOrigin: query as string,
      adSpaceId: DESKTOP,
    })

    offers.splice(maxOffersToDisplay)

    return offers
  } catch (error) {
    return null
  }
}
