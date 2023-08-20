import { useMemo } from 'react'

import type { Item } from '../interfaces'

export const useUnits = (items: Item[]) => {
  const units = useMemo(
    () =>
      items.reduce((acc, el) => {
        return acc + (el?.quantity || 0)
      }, 0),
    [items]
  )

  return units
}
