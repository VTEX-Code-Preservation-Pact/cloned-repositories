import { JanusClient } from '@vtex/api'

export default class CatalogClient extends JanusClient {
  /**
   * We use a high number as default to be sure to get all levels in category tree
   * @see https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog_system/pub/category/tree/-categoryLevels-
   */
  public getCategoryTree = async (
    categoryLevels = 99
  ): Promise<CategoryTree> => {
    return this.http.get(
      `/api/catalog_system/pub/category/tree/${categoryLevels}`,
      {
        metric: 'catalog-get-category-tree',
      }
    )
  }
}
