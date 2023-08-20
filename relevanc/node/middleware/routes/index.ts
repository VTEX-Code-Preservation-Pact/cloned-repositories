import { method } from '@vtex/api'

import { errorHandler } from './errorHandler'
import { getCategoriesMap } from './getCategoriesMap'
import { sendResponse } from './sendResponse'
import { updateCategoriesMap } from './updateCategoriesMap'

export const routes = {
  categoriesMap: method({
    GET: [errorHandler, getCategoriesMap],
    PUT: [errorHandler, updateCategoriesMap, sendResponse],
  }),
}
