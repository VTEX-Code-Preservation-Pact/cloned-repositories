import { useMemo } from 'react'

import type {
  ProductItem,
  SkuSpecification,
  Variations,
} from '../../../interfaces'

const getVariationsFromItems = (
  skuItems: ProductItem[],
  visibleVariations?: string[]
) => {
  const variations: Variations = {}
  const variationsSet: Record<string, Set<string>> = {}

  for (const skuItem of skuItems) {
    for (const currentVariation of skuItem.variations) {
      const { name, values } = currentVariation

      if (
        !visibleVariations ||
        visibleVariations.includes(name.toLowerCase().trim())
      ) {
        const [value] = values
        const currentSet = variationsSet[name] || new Set()

        currentSet.add(value)
        variationsSet[name] = currentSet
      }
    }
  }

  const variationsNames = Object.keys(variationsSet)

  // Transform set back to array
  for (const variationName of variationsNames) {
    const set = variationsSet[variationName]

    variations[variationName] = {
      originalName: variationName,
      values: Array.from(set).map((value) => ({
        name: value,
        originalName: value,
      })),
    }
  }

  return variations
}

const getVariationsFromSpecifications = (
  skuSpecifications: SkuSpecification[],
  visibleVariations?: string[]
) => {
  const variations: Variations = {}

  for (const specification of skuSpecifications) {
    if (
      !visibleVariations ||
      visibleVariations.includes(
        specification.field.originalName.toLowerCase().trim()
      )
    ) {
      variations[specification.field.name] = {
        originalName: specification.field.originalName,
        values: specification.values.map((value) => ({
          name: value.name,
          originalName: value.originalName,
        })),
      }
    }
  }

  return variations
}

export const useVariations = ({
  skuItems,
  skuSpecifications,
}: {
  skuItems: ProductItem[]
  skuSpecifications: SkuSpecification[]
}) => {
  const isSkuSpecificationsEmpty = skuSpecifications.length === 0

  const variationsSource = isSkuSpecificationsEmpty
    ? skuItems
    : skuSpecifications

  const result = useMemo(() => {
    return isSkuSpecificationsEmpty
      ? getVariationsFromItems(variationsSource as ProductItem[])
      : getVariationsFromSpecifications(variationsSource as SkuSpecification[])
  }, [variationsSource, isSkuSpecificationsEmpty])

  return result
}
