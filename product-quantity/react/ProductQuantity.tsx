import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import BaseProductQuantity, {
  BaseProps,
} from './components/BaseProductQuantity'

const ProductQuantity: StorefrontFunctionComponent<BaseProps> = props => {
  const {
    warningQuantityThreshold,
    showLabel,
    size,
    selectorType,
    showUnit,
    quantitySelectorStep,
  } = props
  const { selectedItem, selectedQuantity } = useProduct()
  const dispatch = useProductDispatch()

  return (
    <BaseProductQuantity
      showUnit={showUnit}
      size={size}
      dispatch={dispatch}
      showLabel={showLabel}
      selectedItem={selectedItem}
      selectedQuantity={selectedQuantity}
      selectorType={selectorType}
      warningQuantityThreshold={warningQuantityThreshold}
      quantitySelectorStep={quantitySelectorStep}
    />
  )
}

ProductQuantity.schema = {
  title: 'admin/editor.product-quantity.title',
  description: 'admin/editor.product-quantity.description',
}

export default ProductQuantity
