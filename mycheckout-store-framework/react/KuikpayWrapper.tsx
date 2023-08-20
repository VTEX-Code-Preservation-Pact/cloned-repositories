// import React, { useEffect, useState } from 'react'
// import { KuikpayWrapper } from 'kuikpay-sdk'
// import { useLazyQuery, useMutation } from 'react-apollo'
// import insertCouponMutation from 'vtex.checkout-resources/MutationInsertCoupon'
// import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import updateOrderFormProfileMutation from 'vtex.checkout-resources/MutationUpdateOrderFormProfile'
// import OrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
// import updateItemsMutation from 'vtex.checkout-resources/MutationUpdateItems'
// import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
// import addToCartMutation from 'vtex.checkout-resources/MutationAddToCart'

import type {
  Address,
  BlockedShipping,
  Config,
  CustomData,
  // Item,
  // ItemToAdd,
  // ItemToRemove,
  // OfferingInput,
  // OrderForm,
  // Profile,
  StoreTermsAndConditionsContent,
  ShowPaymentMethod,
} from './interfaces'
// import addItemOfferingMutation from './mutations/addItemOffering.graphql'
// import removeItemOfferingMutation from './mutations/removeItemOffering.graphql'
// import { CONSTANTS } from './utils'

interface Props {
  children: JSX.Element
  addressAlternative?: Address | undefined | null
  customData?: CustomData
  config?: Config
  skuSelectorProps?: {
    useImageInColor?: boolean
    visibleVariations?: string[]
  }
  handleGetDocumentsClient?: (email: string) => void
  storeTermsAndConditionsContent?: StoreTermsAndConditionsContent[]
  blockedShipping?: BlockedShipping
  showPaymentMethods?: ShowPaymentMethod[]
}

// const Kuikpaywrapper = ({
//   addressAlternative,
//   skuSelectorProps,
//   customData,
//   config,
//   handleGetDocumentsClient,
//   storeTermsAndConditionsContent,
//   blockedShipping,
//   showPaymentMethods,
// }: Props) => {
const Kuikpaywrapper = (_props: Props) => {
  // const [formattedItems, setFormattedItems] = useState([])
  // const [order, setOrder] = useState<OrderForm | null>(null)
  // const [insertCoupon] = useMutation(insertCouponMutation)
  // const [addItemOffering] = useMutation(addItemOfferingMutation)
  // const [removeItemOffering] = useMutation(removeItemOfferingMutation)
  // const [updateOrderFormProfile] = useMutation(updateOrderFormProfileMutation)
  // const [updateItems] = useMutation(updateItemsMutation)
  // const [addToCart] = useMutation(addToCartMutation)
  // const OrderFormContext = useOrderForm()
  // const { orderForm, loading, setOrderForm } = OrderFormContext
  // const { searchQuery } = useSearchPage()
  // const [getOrderForm, { data: orderFormData }] = useLazyQuery(OrderFormQuery, {
  //   fetchPolicy: 'network-only',
  // })

  // const cartSimulation = async (simulationItems: any) => {
  //   const myHeaders = new Headers()

  //   myHeaders.append('Accept', 'application/json')
  //   myHeaders.append('Content-Type', 'application/json')

  //   const raw = JSON.stringify(simulationItems)

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow' as const,
  //   }

  //   const response = await fetch(
  //     '/api/checkout/pub/orderforms/simulation?RnbBehavior=0',
  //     requestOptions
  //   )

  //   return response
  // }

  // const parseLogisticsInfo = (deliveryOptions: any, selectedAddress: any) => {
  //   const initialLogisticsInfo: any[] = []

  //   deliveryOptions.forEach((deliveryOption: any, index: number) => {
  //     initialLogisticsInfo.push({
  //       addressId: selectedAddress.addressId,
  //       itemIndex: index, // this is not real, only because simulation needs it to trigger a totalizer
  //       selectedSla: deliveryOption.id,
  //       deliveryChannel: deliveryOption.deliveryChannel,
  //     })
  //   })

  //   // merge delivery options
  //   // merge pickup options
  //   return initialLogisticsInfo
  // }

  // useEffect(() => {
  //   setFormattedItems(
  //     orderForm.items.map((item: Item) => ({
  //       ...item,
  //       sellingPrice: item.sellingPrice / 100,
  //       price: item?.price / 100,
  //       listPrice: item?.listPrice / 100,
  //       imageUrl: item?.imageUrls?.at1x,
  //     }))
  //   )
  // }, [orderForm.items])

  // useEffect(() => {
  //   if (loading) return

  //   const formattedOrderForm: any = {
  //     clientProfileData: {
  //       email: orderForm.clientProfileData?.email,
  //     },
  //     shippingData: {
  //       addressAlternative: null,
  //       selectedAddress: {
  //         addressId: orderForm.shipping?.selectedAddress?.addressId || '',
  //         addressType: orderForm.shipping?.selectedAddress?.addressType || '',
  //         city: orderForm.shipping?.selectedAddress?.city || '',
  //         complement: orderForm.shipping?.selectedAddress?.complement || '',
  //         country: orderForm.shipping?.selectedAddress?.country || '',
  //         geoCoordinates:
  //           orderForm.shipping?.selectedAddress?.geoCoordinates || '',
  //         isDisposable: orderForm.shipping?.selectedAddress?.isDisposable || '',
  //         neighborhood: orderForm.shipping?.selectedAddress?.neighborhood || '',
  //         number: orderForm.shipping?.selectedAddress?.number || '',
  //         postalCode: orderForm.shipping?.selectedAddress?.postalCode || '',
  //         receiverName: orderForm.shipping?.selectedAddress?.receiverName || '',
  //         reference: orderForm.shipping?.selectedAddress?.reference || '',
  //         state: orderForm.shipping?.selectedAddress?.state || '',
  //         street: orderForm.shipping?.selectedAddress?.street || '',
  //         completed: false,
  //       },
  //     },
  //     logisticsInfo: parseLogisticsInfo(
  //       orderForm.shipping?.deliveryOptions,
  //       orderForm.shipping?.selectedAddress
  //     ),
  //     items: formattedItems,
  //     totalizers: orderForm.totalizers,
  //     value: orderForm.value / 100,
  //     paymentData: {
  //       availablePaymentMethods: orderForm.paymentData?.availableAccounts?.map(
  //         (card: any) => ({
  //           franchise: card.paymentSystemName,
  //           id: card.accountId,
  //           number: card.cardNumber.substring(12),
  //           paymentMethod: 'tc',
  //           origin: 'store',
  //         })
  //       ),
  //     },
  //     messages: orderForm.messages.couponMessages
  //       ? orderForm.messages.couponMessages
  //       : orderForm.messages,
  //     marketingData: {
  //       coupon: orderForm.marketingData.coupon,
  //     },
  //   }

  //   if (addressAlternative) {
  //     formattedOrderForm.shippingData.addressAlternative = addressAlternative
  //   }

  //   setOrder(formattedOrderForm)
  // }, [
  //   loading,
  //   orderForm.clientProfileData?.email,
  //   orderForm.shipping?.selectedAddress,
  //   orderForm.shipping?.deliveryOptions,
  //   orderForm.items,
  //   orderForm.totalizers,
  //   orderForm.value,
  //   orderForm.paymentData?.availableAccounts,
  //   orderForm.messages,
  //   orderForm.marketingData,
  //   addressAlternative,
  //   formattedItems,
  // ])

  // useEffect(() => {
  //   if (orderFormData) {
  //     setOrderForm(orderFormData?.orderForm)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [orderFormData])

  // const clearOrderFormProfile = async () => {
  //   const orderFormId = orderForm?.id
  //   const clientProfileData = orderForm?.clientProfileData

  //   if (clientProfileData) {
  //     await fetch(`/checkout/changeToAnonymousUser/${orderFormId}`, {
  //       method: 'GET',
  //       redirect: 'follow',
  //     }).then(() =>
  //       getOrderForm({
  //         variables: {
  //           refreshOutdatedData: false,
  //         },
  //       })
  //     )
  //   }
  // }

  // const handleInsertCoupon = (text: string) => {
  //   insertCoupon({
  //     variables: {
  //       text,
  //     },
  //   }).then((data) => setOrderForm(data.data.insertCoupon))
  // }

  // const handleAddItemOffering = (offeringInput: OfferingInput) => {
  //   addItemOffering({
  //     variables: {
  //       offeringInput,
  //     },
  //   }).then((data) => setOrderForm(data.data.addItemOffering))
  // }

  // const handleRemoveItemOffering = (offeringInput: OfferingInput) => {
  //   removeItemOffering({
  //     variables: {
  //       offeringInput,
  //     },
  //   }).then((data) => setOrderForm(data.data.removeItemOffering))
  // }

  // const handleUpdateOrderFormProfile = (profile: Profile) => {
  //   updateOrderFormProfile({
  //     variables: {
  //       profile,
  //     },
  //   }).then((data) => setOrderForm(data.data.updateOrderFormProfile))
  // }

  // const handleAddToCart = (item: ItemToAdd) => {
  //   const id: number = item.id ? +item.id : NaN

  //   // eslint-disable-next-line use-isnan
  //   if (id !== NaN) {
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
  // }

  // const handleUpdateItems = async (items: ItemToRemove[]) => {
  //   updateItems({
  //     variables: {
  //       orderItems: items?.map((item: ItemToRemove) => ({
  //         uniqueId: item?.uniqueId,
  //         quantity: item?.quantity,
  //       })),
  //     },
  //   })
  //     .then((data) => {
  //       setOrderForm(data.data.updateItems)
  //     })
  //     .then(() => searchQuery?.refetch())
  // }

  // const handleClearItems = (items: ItemToRemove[]) => {
  //   insertCoupon({
  //     variables: {
  //       text: '',
  //     },
  //   }).then(() =>
  //     updateItems({
  //       variables: {
  //         orderItems: items,
  //       },
  //     })
  //       .then((data) => {
  //         setOrderForm(data.data.updateItems)
  //       })
  //       .then(() => searchQuery?.refetch())
  //   )
  // }

  // const language = __RUNTIME__?.culture?.language
  // const theme = __RUNTIME__?.query?.theme || 'kuikpay'
  // const runtime = {
  //   account: __RUNTIME__?.account,
  //   workspace: __RUNTIME__?.workspace,
  //   platform: CONSTANTS.platform,
  // }

  // const production = __RUNTIME__?.production

  // if (!orderForm || orderForm?.id === 'default-order-form') return null

  return null

  // return (
  //   <KuikpayWrapper
  //     sandbox={!production}
  //     updateSelectedAddress={() => {}}
  //     cartSimulation={cartSimulation}
  //     language={language}
  //     theme={theme}
  //     runtime={runtime}
  //     insertCoupon={handleInsertCoupon}
  //     addItemOffering={handleAddItemOffering}
  //     removeItemOffering={handleRemoveItemOffering}
  //     updateOrderFormProfile={handleUpdateOrderFormProfile}
  //     updateItems={handleUpdateItems}
  //     clearData={handleClearItems}
  //     orderForm={order}
  //     addToCart={handleAddToCart}
  //     clearOrderFormProfile={clearOrderFormProfile}
  //     skuSelectorProps={skuSelectorProps}
  //     customData={customData}
  //     config={config}
  //     handleGetDocumentsClient={handleGetDocumentsClient}
  //     storeTermsAndConditionsContent={storeTermsAndConditionsContent}
  //     blockedShipping={blockedShipping}
  //     showPaymentMethods={showPaymentMethods}
  //     hideDiscount
  //   />
  // )
}

export default Kuikpaywrapper
