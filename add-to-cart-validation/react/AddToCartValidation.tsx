/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProduct } from 'vtex.product-context'

const ProductContext: FC = () => {
  const {
    orderForm: { items },
  } = useOrderForm()
  const [added, setAdded] = useState(false)
  const productContextValue = useProduct()
  var currentProductId: any
  var productAdded: any

  if (productContextValue?.product?.items.length == 1) {
    currentProductId = productContextValue?.product?.productId
    // Verifico si tengo el item agregado en el carrito
    productAdded = items?.filter(
      (item: any) => item.productId == currentProductId
    )
    useEffect(() => {
      if (productAdded.length > 0) {
        setAdded(true)
      } else {
        setAdded(false)
      }
    }, [productAdded])
  } else {
    currentProductId = productContextValue?.selectedItem?.itemId
    productAdded = items?.filter((item: any) => item.id == currentProductId)
    useEffect(() => {
      if (productAdded.length > 0) {
        setAdded(true)
      } else {
        setAdded(false)
      }
    }, [productAdded])
  }

  const AddToCart = ''
  const ProductAdded = '¡Producto agregado al cart!'

  return <div>{added ? ProductAdded : AddToCart}</div>
}

export default ProductContext
