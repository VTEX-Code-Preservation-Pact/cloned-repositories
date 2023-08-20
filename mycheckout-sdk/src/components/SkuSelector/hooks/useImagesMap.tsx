import { head } from 'ramda'
import { useMemo } from 'react'

import type {
  ImageMap,
  SelectorProductItem,
  Variations,
  Image,
} from '../../../interfaces'
import { isColor } from '../utils'

export const useImagesMap = (
  items: SelectorProductItem[],
  variations: Variations
) => {
  return useMemo(() => {
    const filteredItems = items

    const variationNames = Object.keys(variations)

    const result: ImageMap = {}

    for (const variationName of variationNames) {
      // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
      if (!isColor(variations[variationName].originalName)) {
        continue
      }

      const imageMap = {} as Record<string, Image | undefined>
      const variationValues = variations[variationName].values

      for (const variationValue of variationValues) {
        const item = filteredItems.find(
          (sku) => sku.variationValues[variationName] === variationValue.name
        )

        imageMap[variationValue.name] = item && head(item.images)
      }

      result[variationName] = imageMap
    }

    return result
  }, [items, variations])
}
