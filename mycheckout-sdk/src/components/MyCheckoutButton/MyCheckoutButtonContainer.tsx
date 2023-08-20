import React from 'react'

import type { ItemToAdd, Product, ProductItem } from '../../interfaces'
import { MyCheckoutButton } from './MyCheckoutButton'
import { useMyCheckoutButton } from './useMyCheckoutButton'

interface Props {
  addToCart: (item: ItemToAdd) => void
  itemToAdd?: ItemToAdd
  isVisible?: boolean
  disabled?: boolean
  validateBeforeOfAdd?: () => boolean | undefined
  multipleAvailableSKUs: boolean
  onClickBehavior?: 'ensure-sku-selection'
  product?: Product
  selectedItem?: ProductItem
  forceOpenModal?: boolean
  handleSelectedItem?: (item: ProductItem) => void
  styles?: any
  isPreview?: boolean
  text?: string
}

export const MyCheckoutButtonContainer = (props: Props) => {
  const button = useMyCheckoutButton(
    props.itemToAdd,
    props.product,
    props.selectedItem,
    props.validateBeforeOfAdd,
    props.disabled,
    props.multipleAvailableSKUs,
    props.onClickBehavior,
    props.forceOpenModal,
    props.addToCart,
    props.handleSelectedItem,
    props.isVisible,
    props.isPreview,
    props.text
  )

  if (!button.show) return null

  return <MyCheckoutButton {...button} />
}
