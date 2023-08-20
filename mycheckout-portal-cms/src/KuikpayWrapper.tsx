import React, { useEffect, useState } from 'react'
import { KuikpayWrapper } from 'kuikpay-sdk'
import type {
  Item,
  ItemToAdd,
  ItemToRemove,
  OfferingInput,
  Totalizer,
} from 'kuikpay-sdk/dist/interfaces'

import { cartSimulation } from './services'
import type { Profile } from './interfaces'
import { CONSTANTS } from './utils'

const LANGUAGE = 'es'
const THEME = 'kuikpay'
const windowInfo: any = window
const { vtexjs, jsnomeLoja } = windowInfo
const RUNTIME = {
  account: jsnomeLoja,
  workspace: CONSTANTS.workspace,
  platform: CONSTANTS.platform,
}

const Kuikpaywrapper = () => {
  const [order, setOrder] = useState(null)
  const [orderForm, setOrderForm] = useState<any>({})

  const listendCheckout = (_: any, orderFormData: any) => {
    setOrderForm(orderFormData)
  }

  useEffect(() => {
    $(window).on('orderFormUpdated.vtex', listendCheckout)

    return () => {
      $(window).off('orderFormUpdated.vtex', listendCheckout)
    }
  }, [])

  useEffect(() => {
    const formattedOrderForm = {
      clientProfileData: {
        email: orderForm.clientProfileData?.email,
      },
      shippingData: {
        selectedAddress: {
          addressId: orderForm.selectedAddress?.addressId || '',
          addressType: orderForm.selectedAddress?.addressType || '',
          city: orderForm.selectedAddress?.city || '',
          complement: orderForm.selectedAddress?.complement || '',
          country: orderForm.selectedAddress?.country || '',
          geoCoordinates: orderForm.selectedAddress?.geoCoordinates || '',
          isDisposable: orderForm.selectedAddress?.isDisposable || '',
          neighborhood: orderForm.selectedAddress?.neighborhood || '',
          number: orderForm.selectedAddress?.number || '',
          postalCode: orderForm.selectedAddress?.postalCode || '',
          receiverName: orderForm.selectedAddress?.receiverName || '',
          reference: orderForm.selectedAddress?.reference || '',
          state: orderForm.selectedAddress?.state || '',
          street: orderForm.selectedAddress?.street || '',
          completed: false || '',
        },
      },
      items: orderForm?.items?.map((item: Item, index: number) => ({
        ...item,
        sellingPrice: item.sellingPrice / 100,
        price: item.price / 100,
        listPrice: item?.listPrice / 100,
        index,
      })),
      totalizers: orderForm.totalizers,
      value: orderForm.value / 100,
      messages: orderForm.messages?.couponMessages
        ? orderForm.messages?.couponMessages
        : orderForm.messages,
      marketingData: {
        coupon: orderForm.marketingData?.coupon,
      },
    }

    setOrder(formattedOrderForm)
  }, [orderForm])

  const handleInsertCoupon = (text: string) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addDiscountCoupon(text)
    })
  }

  const handleAddItemOffering = ({ offeringId, itemIndex }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addOffering(offeringId, itemIndex)
    })
  }

  const handleRemoveItemOffering = ({
    offeringId,
    itemIndex,
  }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.removeOffering(offeringId, itemIndex)
    })
  }

  const handleUpdateOrderFormProfile = (profile: Profile) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.sendAttachment('clientProfileData', profile)
    })
  }

  const handleUpdateItems = (items: ItemToRemove[]) => {
    const itemsInfo = items.map((item: ItemToRemove) => {
      return { index: item.index, quantity: item.quantity }
    })

    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.updateItems(itemsInfo, null, false)
    })
  }

  const handleClearItems = (_items: ItemToRemove[]) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.removeAllItems()
    })
  }

  const handleAddToCart = (item: ItemToAdd) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addToCart([item])
    })
  }

  const clearOrderFormProfile = async () => {
    const clientProfileData = orderForm?.clientProfileData

    if (clientProfileData) {
      const changeToAnonymousUserURL =
        await vtexjs.checkout.getChangeToAnonymousUserURL()

      fetch(changeToAnonymousUserURL, {
        method: 'GET',
        redirect: 'follow',
      }).then(() => {
        vtexjs.checkout.getOrderForm().then((e: any) => {
          listendCheckout('', e)
        })
      })
    }
  }

  return (
    <KuikpayWrapper
      updateSelectedAddress={() => {}}
      cartSimulation={cartSimulation}
      language={LANGUAGE}
      theme={THEME}
      runtime={RUNTIME}
      insertCoupon={handleInsertCoupon}
      addItemOffering={handleAddItemOffering}
      removeItemOffering={handleRemoveItemOffering}
      updateOrderFormProfile={handleUpdateOrderFormProfile}
      updateItems={handleUpdateItems}
      clearData={handleClearItems}
      orderForm={order}
      addToCart={handleAddToCart}
      sandbox={false}
      clearOrderFormProfile={clearOrderFormProfile}
    />
  )
}

export default Kuikpaywrapper
