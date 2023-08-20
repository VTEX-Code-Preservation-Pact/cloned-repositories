import { createCategoriesMap } from '../utils'

export const updateCategoriesMapService = async (ctx: Context) => {
  const {
    clients: { catalog, categoriesMap },
    vtex: { logger },
  } = ctx

  try {
    const categoryTree = await catalog.getCategoryTree()
    const categories = createCategoriesMap(categoryTree)

    const categoriesMapRecord: CategoriesMapRecord = {
      lastUpdated: Date(),
      categories,
    }

    categoriesMap.updateCategoriesMap(categoriesMapRecord)
  } catch (error) {
    logger.error({
      reason: error.message ?? 'Something went wrong',
      data: error.response?.data,
    })
  }
}
