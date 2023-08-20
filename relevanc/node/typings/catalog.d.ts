type CategoryTree = CategoryTreeItem[]

interface CategoryTreeItem {
  id: string
  name: string
  hasChildren: boolean
  url: string
  children: CategoryTreeItem[]
  Title: string
  MetaTagDescription: string
}

interface CategoriesMap {
  [name: string]: CategoriesMapItem
}

interface CategoriesMapItem {
  id: string
  name: string
  path: string
}

interface CategoriesMapRecord {
  lastUpdated: string
  categories: CategoriesMap
}
