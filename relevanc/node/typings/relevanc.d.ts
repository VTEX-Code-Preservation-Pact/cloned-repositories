declare namespace Relevanc {
  type BaseSponsoredProductsPaylaod = {
    adSpaceId: 'PC_LR_PLR' | 'MOB_LR_PLR'
    sourcePageNumber: number
  }

  type KeyIdSponsoredProductsPayload = BaseSponsoredProductsPaylaod & {
    keyId: string
    filterCategoryCodePath: string
  }

  type KeyOriginSponsoredProductsPayload = BaseSponsoredProductsPaylaod & {
    keyOrigin: string
    filterCategoryCodePath?: string
  }

  type SponsoredProductsPayload =
    | KeyIdSponsoredProductsPayload
    | KeyOriginSponsoredProductsPayload

  type SponsoredOffer = {
    algoSelectionType:
      | 'NOTSELECTED'
      | 'EXPLORED'
      | 'UNEXPLORED'
      | 'LONGTAIL'
      | 'SHORTTAIL'
    isSponsored: boolean
    offerId: number
    productId: string
    tagName: string
    tag: string
  }

  type SponsoredProductsResponse = {
    nbResults: number
    tagName: string
    tag: string
    offers: SponsoredOffer[]
  }

  interface HandlerArgs {
    ctx: Context
    settings: AppSettings
    searchParams: SearchParams
  }

  interface SponsoredOffersMap {
    boostType: BoostType
    offers: {
      [offerId: string]: SponsoredOffer
    }
  }
}
