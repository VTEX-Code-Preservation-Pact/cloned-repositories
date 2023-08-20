import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import { Kuikpay } from 'kuikpay-sdk'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import addToCartMutation from 'vtex.checkout-resources/MutationAddToCart'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

// eslint-disable-next-line import/order

import './App.global.css'
import type {
  ItemToAdd,
  ProductItem,
  ResponseValidateItem,
  Seller,
} from './interfaces'
import { CONSTANTS } from './utils'

interface Props {
  validateItems?: () => ResponseValidateItem[]
  isVisible?: boolean
  validateBeforeOfAdd?: () => boolean | undefined
  sellerId?: string
  onClickBehavior?: 'ensure-sku-selection'
  forceOpenModal?: boolean
}

function App(props: Props) {
  const {
    isVisible,
    onClickBehavior,
    validateBeforeOfAdd,
    sellerId,
    forceOpenModal,
  } = props

  const [isAvailable, setIsAvailable] = useState(false)
  const [itemToAdd, setItemToAdd] = useState<ItemToAdd | undefined>()
  const [multipleAvailableSKUs, setMultipleAvailableSKUs] = useState(false)
  const [isBehavior, setIsBehavior] = useState(onClickBehavior)

  const {
    selectedItem: selectedItemContext,
    selectedQuantity,
    product,
    skuSelector: { areAllVariationsSelected },
  } = useProduct()

  const dispatch = useProductDispatch()

  useEffect(() => {
    if (!onClickBehavior) {
      setIsBehavior(
        areAllVariationsSelected ? undefined : 'ensure-sku-selection'
      )
    }
  }, [areAllVariationsSelected, onClickBehavior])

  const selectedItem =
    selectedItemContext || (product?.items?.length ? product?.items[0] : null)

  const itemsLength = product?.items?.length ?? 0

  useEffect(() => {
    if (itemsLength > 1) {
      const hasVariations =
        product?.items?.filter((item: any) => item.variations?.length > 0) || []

      hasVariations.length > 0 && setMultipleAvailableSKUs(true)
    }
  }, [itemsLength, product?.items, selectedItem])

  useEffect(() => {
    const availableBySeller = selectedItem?.sellers?.find(
      (seller: Seller) => seller.commertialOffer.AvailableQuantity > 0
    )

    if (availableBySeller) {
      setIsAvailable(true)
    } else {
      setIsAvailable(false)
    }

    setItemToAdd({
      id: selectedItem?.itemId,
      quantity: selectedQuantity,
      seller: sellerId ?? selectedItem?.sellers[0]?.sellerId,
    })
  }, [selectedItem, selectedQuantity, sellerId])

  const { setOrderForm } = useOrderForm()

  const [addToCart] = useMutation(addToCartMutation)

  const handleAddToCart = (item: ItemToAdd) => {
    const id: number = item.id ? +item.id : NaN

    // eslint-disable-next-line use-isnan
    if (id !== NaN) {
      addToCart({
        variables: {
          items: [
            {
              id,
              quantity: item.quantity,
              seller: item.seller,
            },
          ],
        },
      }).then((data) => setOrderForm(data.data.addToCart))
    }
  }

  const processIsVisible = () => {
    if (isVisible === null || isVisible === undefined) {
      return !selectedItem ? true : isAvailable
    }

    return isVisible
  }

  const handleSelectedItem = (item: ProductItem) => {
    dispatch({ type: 'SET_SELECTED_ITEM', args: { item } })
  }

  const runtime = {
    account: __RUNTIME__?.account,
    workspace: __RUNTIME__?.workspace,
    platform: CONSTANTS.platform,
  }

  if (!selectedItem) return null

  return (
    <Kuikpay
      addToCart={handleAddToCart}
      itemToAdd={itemToAdd}
      isVisible={processIsVisible()}
      validateBeforeOfAdd={validateBeforeOfAdd}
      multipleAvailableSKUs={multipleAvailableSKUs}
      onClickBehavior={isBehavior}
      product={product}
      selectedItem={selectedItem}
      forceOpenModal={forceOpenModal}
      runtime={runtime}
      handleSelectedItem={handleSelectedItem}
    />
  )
}

export default App
