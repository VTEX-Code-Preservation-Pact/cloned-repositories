import { useState, useEffect } from 'react'

import { useActions } from '../../contexts/ActionsProviderV2'
import type { ItemToRemove } from '../../interfaces'
import type { ScreenToGoToCheckout } from '../../interfaces/StepsAndSections'

interface Props {
  itemsToRemove: ItemToRemove[]
  screenToGoToCheckout: ScreenToGoToCheckout
  onClick: () => void
}

export const useRemoveUnavaibleProducts = ({
  itemsToRemove,
  screenToGoToCheckout,
  onClick,
}: Props) => {
  const { updateItems } = useActions()
  const [showAnimation, setShowAnimation] = useState(true)

  const handleClick = () => {
    const itemsWithoutStock = itemsToRemove.map((item: ItemToRemove) => {
      return {
        uniqueId: item.uniqueId,
        quantity: 0,
      }
    })

    updateItems(itemsWithoutStock)
    onClick()
  }

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 3000)
  }, [])

  return {
    itemsToRemove,
    screenToGoToCheckout,
    showAnimation,
    handleClick,
  }
}
