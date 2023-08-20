import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../../../contexts/ActionsProviderV2'
import type { Item } from '../../../interfaces'
import { Events } from '../../../interfaces'
import { useEcommerce } from '../../../hooks/useEcommerce'
import { selectItems } from '../../../contexts/global-context/reducers/orderFormDataSlice'

const useUnavailableMessage = () => {
  const items = useSelector(selectItems)
  const [hasError, setHasError] = useState(false)
  const { updateItems } = useActions()
  const { handleEcommerce } = useEcommerce()

  const handleClick = () => {
    const itemsWithoutStock = items.filter(
      (item: Item) => item.availability !== 'available'
    )

    const itemsForDelete = itemsWithoutStock.map((item: Item) => ({
      index: item.index,
      uniqueId: item.uniqueId,
      quantity: 0,
    }))

    const itemsForStatistics = itemsWithoutStock.map((item: Item) => {
      const categories = Object.values(item.productCategories)

      return {
        sku: item.id,
        quantity: item.quantity,
        price: item.sellingPrice || item?.price,
        category: (categories?.[0] as string) || 'unnkown',
        subcategory: (categories?.[1] as string) || 'unnkown',
      }
    })

    updateItems(itemsForDelete)
    handleEcommerce(Events.remove, { products: itemsForStatistics })
  }

  useEffect(() => {
    const itemsAvailability = items.filter(
      (item: Item) => item.availability !== 'available'
    )

    if (itemsAvailability.length) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [items])

  return {
    hasError,
    handleClick,
  }
}

export default useUnavailableMessage
