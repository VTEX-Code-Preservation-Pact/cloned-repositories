import { clone, prop, filter } from 'ramda'

import type {
  InitialSelectionType,
  ProductItem,
  SelectedVariations,
  SelectedVariationsNotNull,
  SelectorProductItem,
  Variations,
} from '../../../interfaces'

export const parseSku = (sku: ProductItem) => {
  const result = clone(sku) as any
  const variationValues = {} as Record<string, string>

  for (const variation of sku.variations) {
    variationValues[variation.name] = variation.values[0]
  }

  const variations = sku.variations.map(prop('name'))

  result.variationValues = variationValues
  result.variations = variations

  return result
}

export const isColor = (variation: string) => {
  if (!variation) return false

  const possibleValues = [
    'cor',
    'color',
    'colour',
    'colore',
    'farbe',
    'couleur',
    'kleuren',
    'culoare',
    'värit',
    'kolory',
    'farve',
    'färger',
    'farby',
    'boje',
    'colori',
  ]

  return possibleValues.includes(variation.toLowerCase())
}

export const buildEmptySelectedVariation = (variations: Variations) => {
  const variationNames = Object.keys(variations)
  const result = {} as Record<string, null>

  for (const variationName of variationNames) {
    result[variationName] = null
  }

  return result
}

export const selectedVariationFromItem = (
  item: SelectorProductItem,
  variations: Variations
) => {
  const variationNames = Object.keys(variations)
  const result = {} as Record<string, string>

  for (const variationName of variationNames) {
    result[variationName] = item.variationValues[variationName]
  }

  return result
}

export const getNewSelectedVariations = (
  query: Record<string, string> | undefined,
  skuSelected: ProductItem,
  variations: Variations,
  initialSelection?: InitialSelectionType
  // eslint-disable-next-line max-params
) => {
  const emptyVariations = buildEmptySelectedVariation(variations)

  if (skuSelected == null) {
    return emptyVariations
  }

  const hasSkuInQuery = Boolean(query?.skuId)
  const parsedSku = parseSku(skuSelected)

  if (hasSkuInQuery || initialSelection === 'complete') {
    return selectedVariationFromItem(parsedSku, variations)
  }

  if (initialSelection === 'image') {
    const colorVariationName = parsedSku.variations.find(isColor)

    return {
      ...emptyVariations,
      ...(colorVariationName
        ? {
            [colorVariationName]: parsedSku.variationValues[colorVariationName],
          }
        : {}),
    }
  }

  return emptyVariations
}

export const isSkuSelected =
  (selectedNotNull: SelectedVariationsNotNull) =>
  (sku: SelectorProductItem) => {
    const hasAll = Object.keys(selectedNotNull).every((variationName) => {
      const selectedValue = selectedNotNull[variationName]

      return sku.variationValues[variationName] === selectedValue
    })

    return hasAll
  }

export const findListItemsWithSelectedVariations = (
  items: SelectorProductItem[],
  selectedVariations: SelectedVariations
) => {
  const selectedNotNull = filter(
    Boolean,
    selectedVariations
  ) as SelectedVariationsNotNull

  const selectedCount = Object.keys(selectedNotNull).length

  if (selectedCount === 0) {
    // return all
    return items
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return items.filter(isSkuSelected(selectedNotNull))
}

export const findItemWithSelectedVariations = (
  items: SelectorProductItem[],
  selectedVariations: SelectedVariations
) => {
  const selectedNotNull = filter(
    Boolean,
    selectedVariations
  ) as SelectedVariationsNotNull

  const selectedCount = Object.keys(selectedNotNull).length

  if (selectedCount === 0) {
    // may return any item, return first element
    return items[0]
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return items.find(isSkuSelected(selectedNotNull))
}

export function getDefaultSeller(sellers?: any) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find((seller: any) => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  return sellers[0]
}
