// import React, { useState, useEffect } from 'react'
// import { useMutation } from 'react-apollo'
// import { Kuikpay } from 'kuikpay-sdk'
// import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import addToCartMutation from 'vtex.checkout-resources/MutationAddToCart'
// import updateItemsMutation from 'vtex.checkout-resources/MutationUpdateItems'
// import useProduct from 'vtex.product-context/useProduct'
// import updateOrderFormProfileMutation from 'vtex.checkout-resources/MutationUpdateOrderFormProfile'
// import insertCouponMutation from 'vtex.checkout-resources/MutationInsertCoupon'
// import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

// import removeItemOfferingMutation from './mutations/removeItemOffering.graphql'
// import addItemOfferingMutation from './mutations/addItemOffering.graphql'

// import './App.global.css'
// import type {
//   //Card,
//   CartSimulation,
//   Config,
//   CustomData,
//   Item,
//   ItemToAdd,
//   ItemToRemove,
//   OfferingInput,
//   OrderForm,
//   ProductItem,
//   Profile,
//   ResponseValidateItem,
//   Seller,
//   Totalizer,
// } from './interfaces'

// interface Props {
//   validateItems?: () => ResponseValidateItem[]
//   customData?: CustomData
//   isVisible?: boolean
//   config?: Config
//   validateBeforeOfAdd?: () => boolean | undefined
//   sellerId?: string
//   onClickBehavior?: 'ensure-sku-selection'
//   handleGetDocumentsClient?: (email: string) => void
// }

// function App(props: Props) {
//   const {
//     validateItems,
//     customData,
//     isVisible,
//     onClickBehavior,
//     validateBeforeOfAdd,
//     sellerId,
//     config,
//     handleGetDocumentsClient,
//   } = props

//   const [order, setOrder] = useState<OrderForm | null>(null)
//   const [isAvailable, setIsAvailable] = useState(false)
//   const [itemToAdd, setItemToAdd] = useState<ItemToAdd | undefined>()

//   const {
//     selectedItem: selectedItemContext,
//     selectedQuantity,
//     product,
//   } = useProduct()

//   const selectedItem = selectedItemContext ?? product?.items[0]
//   const dispatch = useProductDispatch()
//   const itemsLength = product?.items?.length ?? 0
//   const multipleAvailableSKUs = itemsLength > 1

//   useEffect(() => {
//     const availableBySeller = selectedItem?.sellers?.find(
//       (seller: Seller) => seller.commertialOffer.AvailableQuantity > 0
//     )

//     if (availableBySeller) {
//       setIsAvailable(true)
//     } else {
//       setIsAvailable(false)
//     }

//     setItemToAdd({
//       id: selectedItem?.itemId,
//       quantity: selectedQuantity,
//       seller: sellerId ?? selectedItem?.sellers[0]?.sellerId,
//     })
//   }, [selectedItem, selectedQuantity, sellerId])

//   const { orderForm, loading, setOrderForm } = useOrderForm()

//   const [addToCart] = useMutation(addToCartMutation)
//   const [updateItems] = useMutation(updateItemsMutation)
//   const [updateOrderFormProfile] = useMutation(updateOrderFormProfileMutation)
//   const [insertCoupon] = useMutation(insertCouponMutation)

//   const handleInsertCoupon = (text: string) => {
//     insertCoupon({
//       variables: {
//         text,
//       },
//     }).then((data) => setOrderForm(data.data.insertCoupon))
//   }

//   const [addItemOffering] = useMutation(addItemOfferingMutation)
//   const [removeItemOffering] = useMutation(removeItemOfferingMutation)

//   const handleAddItemOffering = (offeringInput: OfferingInput) => {
//     addItemOffering({
//       variables: {
//         offeringInput,
//       },
//     }).then((data) => setOrderForm(data.data.addItemOffering))
//   }

//   const handleRemoveItemOffering = (offeringInput: OfferingInput) => {
//     removeItemOffering({
//       variables: {
//         offeringInput,
//       },
//     }).then((data) => setOrderForm(data.data.removeItemOffering))
//   }

//   const handleAddToCart = (item: ItemToAdd) => {
//     const id: number = +item.id

//     addToCart({
//       variables: {
//         items: [
//           {
//             id,
//             quantity: item.quantity,
//             seller: item.seller,
//           },
//         ],
//       },
//     }).then((data) => setOrderForm(data.data.addToCart))
//   }

//   const handleUpdateItems = (items: ItemToRemove[]) => {
//     updateItems({
//       variables: {
//         orderItems: items,
//       },
//     }).then((data) => setOrderForm(data.data.updateItems))
//   }

//   const handleClearItems = (items: ItemToRemove[]) => {
//     updateItems({
//       variables: {
//         orderItems: items,
//       },
//     }).then((data) => setOrderForm(data.data.updateItems))
//   }

//   const handleUpdateOrderFormProfile = (profile: Profile) => {
//     updateOrderFormProfile({
//       variables: {
//         profile,
//       },
//     })
//   }

//   const cartSimulation = async (body: CartSimulation) => {
//     const myHeaders = new Headers()

//     myHeaders.append('Accept', 'application/json')
//     myHeaders.append('Content-Type', 'application/json')

//     const raw = JSON.stringify(body)

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow' as const,
//     }

//     const response = await fetch(
//       '/api/checkout/pub/orderforms/simulation',
//       requestOptions
//     )

//     return response
//   }

//   useEffect(() => {
//     if (loading) return

//     const formattedOrderForm = {
//       clientProfileData: {
//         email: orderForm.clientProfileData?.email,
//       },
//       shippingData: {
//         selectedAddress: {
//           addressId: orderForm.selectedAddress?.addressId || '',
//           addressType: orderForm.selectedAddress?.addressType || '',
//           city: orderForm.selectedAddress?.city || '',
//           complement: orderForm.selectedAddress?.complement || '',
//           country: orderForm.selectedAddress?.country || '',
//           geoCoordinates: orderForm.selectedAddress?.geoCoordinates || '',
//           isDisposable: orderForm.selectedAddress?.isDisposable || '',
//           neighborhood: orderForm.selectedAddress?.neighborhood || '',
//           number: orderForm.selectedAddress?.number || '',
//           postalCode: orderForm.selectedAddress?.postalCode || '',
//           receiverName: orderForm.selectedAddress?.receiverName || '',
//           reference: orderForm.selectedAddress?.reference || '',
//           state: orderForm.selectedAddress?.state || '',
//           street: orderForm.selectedAddress?.street || '',
//           completed: false,
//         },
//       },
//       items: orderForm.items.map((item: Item) => ({
//         ...item,
//         sellingPrice: item.sellingPrice / 100,
//         price: item.price / 100,
//         imageUrl: item.imageUrls.at1x,
//       })),
//       totalizers: orderForm.totalizers?.map((totalizer: Totalizer) => ({
//         ...totalizer,
//         value: totalizer.value / 100,
//       })),
//       value: orderForm.value / 100,
//       // paymentData: {
//       //   availablePaymentMethods: orderForm.paymentData?.availableAccounts?.map(
//       //     (card: Card) => ({
//       //       franchise: card.paymentSystemName,
//       //       id: card.accountId,
//       //       number: card.cardNumber.substring(12),
//       //       paymentMethod: 'tc',
//       //     })
//       //   ),
//       // },
//       messages: orderForm.messages.couponMessages
//         ? orderForm.messages.couponMessages
//         : orderForm.messages,
//       marketingData: {
//         coupon: orderForm.marketingData.coupon,
//       },
//     }

//     setOrder(formattedOrderForm)
//   }, [loading, orderForm])

//   if (loading) return null

//   const language = __RUNTIME__?.culture?.language
//   const theme = __RUNTIME__?.query?.theme || 'vtex'
//   const runtime = {
//     account: __RUNTIME__?.account,
//     workspace: __RUNTIME__?.workspace,
//   }

//   const processIsVisible = () => {
//     if (isVisible === null || isVisible === undefined) {
//       return !selectedItem ? true : isAvailable
//     }

//     return isVisible
//   }

//   const handleSelectedItem = (item: ProductItem) => {
//     dispatch({ type: 'SET_SELECTED_ITEM', args: { item } })
//   }

//   return (
//     <Kuikpay
//       addToCart={handleAddToCart}
//       itemToAdd={itemToAdd}
//       updateItems={handleUpdateItems}
//       orderForm={order}
//       updateSelectedAddress={() => {}}
//       updateOrderFormProfile={handleUpdateOrderFormProfile}
//       cartSimulation={cartSimulation}
//       clearData={handleClearItems}
//       language={language}
//       isVisible={processIsVisible()}
//       theme={theme}
//       insertCoupon={handleInsertCoupon}
//       addItemOffering={handleAddItemOffering}
//       removeItemOffering={handleRemoveItemOffering}
//       validateItems={validateItems}
//       customData={customData}
//       config={config}
//       validateBeforeOfAdd={validateBeforeOfAdd}
//       multipleAvailableSKUs={multipleAvailableSKUs}
//       onClickBehavior={onClickBehavior}
//       product={product}
//       selectedItem={selectedItem}
//       handleSelectedItem={handleSelectedItem}
//       runtime={runtime}
//       handleGetDocumentsClient={handleGetDocumentsClient}
//     />
//   )
// }

// export default App
