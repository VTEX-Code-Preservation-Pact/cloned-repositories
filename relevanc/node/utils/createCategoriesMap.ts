import { ACCOUNT_BASE_URL } from '../contants'

export const createCategoriesMap = (
  categoryTree: CategoryTree,
  path: string | null = null,
  result: CategoriesMap = {}
): CategoriesMap => {
  for (const category of categoryTree) {
    // Remove base from category url
    const categoryPath = category.url.replace(ACCOUNT_BASE_URL, '')

    // Remove category parents
    const index = categoryPath.lastIndexOf('/')
    const categoryName =
      index > 0 ? categoryPath.slice(index + 1) : categoryPath

    // Add category to map
    const item = {
      id: String(category.id),
      name: categoryName,
      path: path ? `${path}/${category.id}` : `${category.id}`,
    }

    result[categoryName] = item

    // Check for sub categories
    if (category.hasChildren) {
      createCategoriesMap(category.children, item.path, result)
    }
  }

  return result
}
