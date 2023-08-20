import React, { useState, useEffect } from 'react'
import { Kuikpay } from 'kuikpay-sdk'
import 'kuikpay-sdk/dist/index.css'
import type {
  ItemToAdd,
  Product,
  ProductItem,
} from 'kuikpay-sdk/dist/interfaces'

import type { ItemInfo } from './interfaces'
import { CONSTANTS } from './utils'

interface Props {
  itemInfo?: ItemInfo
  product?: Product
  selectedItem?: ProductItem
  onClickBehavior?: 'ensure-sku-selection'
}

const windowInfo: any = window
const { vtexjs, vtxctx } = windowInfo

const Button = (props: Props) => {
  const {
    itemInfo,
    product,
    selectedItem: mainSelectedItem,
    onClickBehavior = 'ensure-sku-selection',
  } = props

  const [selectedItem, setSelectedItem] = useState(mainSelectedItem)
  const [skuInfo, setSkuInfo] = useState(
    windowInfo.skuJson_0
      ? {
          id: windowInfo.skuJson_0.skus[0]?.sku,
          quantity: 1,
          seller: windowInfo.skuJson_0.skus[0]?.sellerId,
        }
      : {
          id: itemInfo?.id,
          quantity: 1,
          seller: itemInfo?.seller,
        }
  )

  const [visible, setVisible] = useState(true)

  const changeSkuId = (skuId: string) => {
    setSkuInfo((prevState) => ({
      ...prevState,
      id: skuId,
    }))
  }

  useEffect(() => {
    if (!windowInfo.skuJson_0) return

    // This detects new sku selection from PDP
    $(window).on('vtex.sku.selected', (evt, productId, sku) => {
      changeSkuId(sku.sku)
      setVisible(sku.available)
    })

    return () => {
      $(window).off('vtex.sku.selected', (evt, productId, sku) => {
        changeSkuId(sku.sku)
      })
    }
  }, [])

  // useEffect(() => {
  // 	vtexjs.checkout.getOrderForm().done(orderForm => {
  // 		setOrderForm(orderForm)
  // 	});

  useEffect(() => {
    if (!selectedItem) return
    changeSkuId(selectedItem?.itemId)
  }, [selectedItem])

  // const handleOrderFormUpdated = (_: any, orderFormData: any) => {
  //   setOrderForm(orderFormData)
  // }

  // useEffect(() => {
  //   $(window).on('orderFormUpdated.vtex', handleOrderFormUpdated)

  //   return () => {
  //     $(window).off('orderFormUpdated.vtex', handleOrderFormUpdated)
  //   }
  // }, [])

  const handleAddToCart = (item: ItemToAdd) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addToCart([item])
    })
  }

  // Item to add to cart
  const itemToAdd = skuInfo
    ? {
        id: skuInfo.id,
        quantity: 1,
        seller: skuInfo.seller,
      }
    : null

  // Function to update order form selected address
  // const handleUpdateSelectedAddress = (address: any) => {
  //   vtexjs.checkout.getOrderForm().then(function () {
  //     return vtexjs.checkout.sendAttachment('shippingData', {
  //       address,
  //       clearAddressIfPostalCodeNotFound: false,
  //     })
  //   })
  // }

  const itemsLength = product?.items?.length ?? 0
  const multipleAvailableSKUs = itemsLength > 1

  const handleSelectedItem = (item: ProductItem) => {
    setSelectedItem(item)
  }

  const runtime = {
    account: vtxctx.url.split('.')[0],
    workspace: CONSTANTS.workspace,
    platform: CONSTANTS.platform,
  }

  return (
    <Kuikpay
      addToCart={handleAddToCart}
      itemToAdd={itemToAdd}
      isVisible={visible}
      // validateItems={validateItems}
      // customData={customData}
      // config={config}
      // validateBeforeOfAdd={validateBeforeOfAdd}
      multipleAvailableSKUs={multipleAvailableSKUs}
      onClickBehavior={onClickBehavior}
      product={product}
      selectedItem={selectedItem}
      handleSelectedItem={handleSelectedItem}
      runtime={runtime}
      sandbox={false}
    />
  )
}

export default Button
