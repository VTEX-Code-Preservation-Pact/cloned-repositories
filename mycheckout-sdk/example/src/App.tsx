/* eslint-disable import/order */
import React, { useState, useEffect } from 'react'
import { Kuikpay, KuikpayQuotaInformative, KuikpayWrapper } from 'kuikpay-sdk'

import { getOrderForm, cartSimulation, ORDER_FORM_ID } from './services'
import 'kuikpay-sdk/dist/index.css'

import { product, selectedItem } from './mocks'

// const orderItems = [
//   {
//     id: '7',
//     quantity: 1,
//     seller: '1',
//   },
// ]

const App = () => {
  const [orderForm, setOrderForm] = useState<any>({})
  const [order, setOrder] = useState<any>({})

  useEffect(() => {
    getOrderForm()
      .then((res) => res.json())
      .then((data) => {
        setOrderForm(data)
      })
  }, [])

  // useEffect(() => {
  //   if (orderForm.orderFormId) {
  //     addItem(orderForm.orderFormId, orderItems)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(`data`, data)
  //         setOrderForm(data)
  //       })
  //   }
  // }, [orderForm])

  useEffect(() => {
    if (Object.keys(orderForm).length) {
      // const itemsFormatted = orderForm.items.map((item: any) => {
      //   return {
      //     uniqueId: item.uniqueId,
      //     id: item.id,
      //     name: item.name,
      //     quantity: item.quantity,
      //     sellingPrice: item.sellingPrice,
      //     imageUrl: item.imageUrls.at1x,
      //     availability: item.availability,
      //   }
      // })

      const formattedOrderForm = {
        // clientProfileData: {
        //   email: orderForm.clientProfileData?.email,
        //   document: orderForm.clientProfileData?.document,
        // },
        // shippingData: {
        //   selectedAddress: {
        //     addressId: '1',
        //     addressType: 'residential',
        //     city: 'Medellín',
        //     complement: 'Pimer piso',
        //     country: 'Colombia',
        //     geoCoordinates: [1, 2],
        //     isDisposable: false,
        //     neighborhood: 'Aranjuez',
        //     number: '1',
        //     postalCode: '05001',
        //     receiverName: 'Brian Carmona',
        //     reference: 'Near',
        //     state: 'Antioquia',
        //     street: 'Calle 56 N 45 - 45',
        //     completed: false,
        //   },
        // },
        // shippingData: {
        //   addressAlternative: {
        //     addressId: '4d33c3aac14842c3ac48ccb97bde035e',
        //     addressType: 'search',
        //     city: 'Medellín',
        //     complement: 'Exito Bello',
        //     country: 'COL',
        //     geoCoordinates: {
        //       latitude: '6.3398571',
        //       longitude: '-75.5444748',
        //     },
        //     isDisposable: true,
        //     neighborhood: '',
        //     number: '0',
        //     postalCode: '05001',
        //     receiverName: '',
        //     reference: '',
        //     state: 'Antioquia',
        //     street: 'Diagonal 51l # 35 - 120',
        //     completed: false,
        //   },
        // },
        items: orderForm?.items.map((item: any) => ({
          ...item,
          sellingPrice: item.sellingPrice / 100,
          price: item?.price / 100,
          listPrice: item?.listPrice / 100,
        })),
        totalizers: orderForm.totalizers,
        value: orderForm.value / 100,
        paymentData: {
          availablePaymentMethods:
            orderForm.paymentData?.availableAccounts?.map((card: any) => ({
              franchise: card.paymentSystemName,
              id: card.accountId,
              number: card.cardNumber.substring(12),
              paymentMethod: 'tc',
              bin: '411111',
              origin: 'store',
            })),
          installmentOptions: orderForm?.paymentData?.installmentOptions || [],
        },
        messages: [
          // {
          //   code: 'couponNotFound',
          // },
        ],
        marketingData: {
          coupon: orderForm?.marketingData?.coupon,
        },
      }

      setOrder(formattedOrderForm)
    }
  }, [orderForm])

  const validateItems = () => {
    // const items = orderForm?.items || []
    return []
  }

  const insertCoupon = async (text: string) => {
    const headers = new Headers()

    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    const body = JSON.stringify({
      text,
    })

    const requestOptions: any = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    }

    const response = await fetch(
      // 'api/checkout/pub/orderForm/{orderFormId}/coupons',
      `http://localhost:4001/api/checkout/pub/orderForm/${ORDER_FORM_ID}/coupons`,
      requestOptions
    )

    const data = await response.json()

    setOrderForm(data)
  }

  const updateItems = async (
    items: Array<{ quantity?: number; uniqueId?: string; index?: number }>
  ) => {
    const myHeaders = new Headers()

    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      orderItems: items,
    })

    const requestOptions: any = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    const response = await fetch(
      `http://localhost:4001/api/checkout/pub/orderForm/${ORDER_FORM_ID}/items`,
      requestOptions
    )

    const data = await response.json()

    setOrderForm(data)
  }

  /* Config bag */
  const config = {
    mainSellerId: '1',
    salesChannel: '1',
    customItems: [
      {
        sku: '123456790',
        customClassName: 'custm-bag',
        name: 'Impuesto de bolsa',
        description: 'Ley 1819 de 2016',
        sendToFinish: true,
        hiddenUnits: true,
        hiddenRemove: true,
        showTotalMount: true,
      },
    ],
    customSubTotalItems: [
      {
        name: 'Impuesto de bolsas plásticas',
        value: 200,
      },
    ],
  }

  const storeTermsAndConditionsContent = [
    {
      id: 'termsAndConditions',
      content:
        "<p>Acepto <a href='https://www.exito.com/terminos-condiciones' target='_blank'>términos y condiciones</a>, <a href='https://www.exito.com/terminos-de-marketplace' target='_blank'>términos y condiciones marketplace</a>.</p>",
    },
    {
      id: 'dataTreatment',
      content:
        "<p>Autorizo el <a href='https://www.exito.com/tratamiento-de-datos-personales' target='_blank'>tratamiento de mis datos personales con las siguientes condiciones</a>.</p>",
    },
  ]

  const runtime = {
    account: 'amalia',
    workspace: 'qakuikpay',
    platform: 'vtex-io',
  }

  const showPaymentMethods = [
    {
      id: '201',
      show: false,
    },
  ]

  return (
    <>
      <KuikpayWrapper
        updateSelectedAddress={() => {}}
        cartSimulation={cartSimulation}
        language={'es'}
        theme={'kuikpay'}
        runtime={runtime}
        sandbox={true}
        addToCart={() => {}}
        updateItems={updateItems}
        orderForm={order}
        clearData={() => {}}
        validateItems={validateItems}
        insertCoupon={insertCoupon}
        addItemOffering={() => {}}
        removeItemOffering={() => {}}
        updateOrderFormProfile={() => {}}
        clearOrderFormProfile={() => {}}
        skuSelectorProps={{
          useImageInColor: true,
        }}
        config={config}
        storeTermsAndConditionsContent={storeTermsAndConditionsContent}
        showPaymentMethods={showPaymentMethods}
      />
      <KuikpayQuotaInformative
        theme={'kuikpay'}
        language={'es'}
        selectedItem={selectedItem}
        runtime={runtime}
        sandbox={true}
      />
      <Kuikpay
        addToCart={() => {}}
        isVisible={true}
        multipleAvailableSKUs={false}
        onClickBehavior="ensure-sku-selection"
        product={product}
        selectedItem={selectedItem}
        runtime={runtime}
        sandbox={true}
      />
    </>
  )
}

export default App
