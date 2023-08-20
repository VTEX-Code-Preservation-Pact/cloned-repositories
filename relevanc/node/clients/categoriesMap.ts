import type { InstanceOptions, IOContext } from '@vtex/api'
import { VBase } from '@vtex/api'

import { BUCKET, CATEGORIES_MAP } from '../contants'

export default class CategoriesMapClient extends VBase {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public getCategoriesMap = (): Promise<CategoriesMapRecord | null> =>
    this.getJSON(BUCKET, CATEGORIES_MAP, true)

  public updateCategoriesMap = (data: CategoriesMapRecord) =>
    this.saveJSON(BUCKET, CATEGORIES_MAP, data)
}
