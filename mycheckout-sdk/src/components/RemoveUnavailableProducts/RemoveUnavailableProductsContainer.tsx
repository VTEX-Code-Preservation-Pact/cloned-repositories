import React from 'react'

import type { ItemToRemove } from '../../interfaces'
import type { ScreenToGoToCheckout } from '../../interfaces/StepsAndSections'
import { RemoveUnavailableProducts } from './RemoveUnavailableProducts'
import { useRemoveUnavaibleProducts } from './useRemoveUnavaibleProducts'

interface Props {
  itemsToRemove: ItemToRemove[]
  screenToGoToCheckout: ScreenToGoToCheckout
  onClick: () => void
}

const RemoveUnavailableProductsContainer = (props: Props) => {
  const removeUnavailableProductsProps = useRemoveUnavaibleProducts(props)

  return <RemoveUnavailableProducts {...removeUnavailableProductsProps} />
}

export default RemoveUnavailableProductsContainer
