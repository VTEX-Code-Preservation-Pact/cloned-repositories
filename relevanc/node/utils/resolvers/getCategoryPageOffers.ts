import { DESKTOP } from '../../contants'

export const getCategoryPageOffers = async (args: Relevanc.HandlerArgs) => {
  const {
    ctx: {
      clients: { categoriesMap, relevanc },
      vtex: { logger },
    },
    settings: { adServerName, maxOffersToDisplay },
    searchParams: { page, selectedFacets },
  } = args

  if (!selectedFacets?.length || selectedFacets[0].key !== 'c') {
    return []
  }

  try {
    const categoriesMapRecord = await categoriesMap.getCategoriesMap()

    if (!categoriesMapRecord) {
      throw new Error('Unable to get category page offers')
    }

    const categoryName = selectedFacets[selectedFacets.length - 1].value
    const item = categoriesMapRecord.categories[categoryName]

    if (!item) {
      return null
    }

    const { offers } = await relevanc.getSponsoredOffers(adServerName, {
      sourcePageNumber: page ? Number(page) : 0,
      keyId: item.id,
      filterCategoryCodePath: item.path,
      adSpaceId: DESKTOP,
    })

    offers.splice(maxOffersToDisplay)

    return offers
  } catch (error) {
    logger.error({
      message: error.message,
      reason:
        'No categories map was found. Check if it exists or generate a new one',
    })

    return null
  }
}
