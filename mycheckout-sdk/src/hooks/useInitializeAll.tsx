import { useEffect } from 'react'
import { pathOr } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { useActionsDispatch } from '../contexts/ActionsProviderV2'
import { useUserData, useUserDataDispatch } from '../contexts/UserDataProvider'
import {
  selectLoadingAction,
  selectStep,
  setLoadingAction,
} from '../contexts/global-context/reducers/checkoutFormSlice'
import type {
  ClientProfileData,
  Config,
  ItemToAdd,
  ItemToRemove,
  OfferingInput,
  OrderForm,
  Product,
  ProductItem,
  ResponseValidateItem,
  ShowPaymentMethod,
  StoreTermsAndConditionsContent,
} from '../interfaces'
import {
  selectOrderForm,
  setAddressStore,
  setEmail,
  setItems,
  setPaymentsOrderForm,
} from '../contexts/global-context/reducers/orderFormDataSlice'
import type { Card, Payment } from '../interfaces/orderForm'

interface Props {
  config?: Partial<Config>
  customData?: any
  hideDiscount: boolean
  itemToAdd?: ItemToAdd
  orderForm: OrderForm
  product?: Product
  selectedItem?: ProductItem
  showPaymentMethods?: ShowPaymentMethod[]
  skuSelectorProps?: {
    visibleVariations?: string[]
    useImageInColor?: boolean
  }
  storeTermsAndConditionsContent?: StoreTermsAndConditionsContent[]
  addItemOffering?: (offeringInput: OfferingInput) => void
  addToCart: (item: ItemToAdd) => void
  clearData: (items: ItemToRemove[]) => void
  handleGetDocumentsClient?: (email: string) => void
  handleSelectedItem?: (item: ProductItem) => void
  insertCoupon?: (text: string) => void
  removeItemOffering?: (offeringInput: OfferingInput) => void
  updateItems: (items: ItemToRemove[]) => void
  updateOrderFormProfile: (profile: ClientProfileData) => void
  validateItems?: () => ResponseValidateItem[] | []
}

export const useInitializeAll = ({
  config,
  customData,
  hideDiscount,
  orderForm,
  showPaymentMethods,
  skuSelectorProps,
  storeTermsAndConditionsContent,
  addItemOffering,
  addToCart,
  clearData,
  handleGetDocumentsClient,
  handleSelectedItem,
  insertCoupon,
  removeItemOffering,
  updateItems,
  updateOrderFormProfile,
  validateItems,
}: Props) => {
  const dispatchUserData = useUserDataDispatch()
  const dispatchActions = useActionsDispatch()
  const dispatchGlobal = useDispatch()
  const userData = useUserData()
  const step = useSelector(selectStep)
  const loadingAction = useSelector(selectLoadingAction)
  const { items } = useSelector(selectOrderForm)

  useEffect(() => {
    dispatchActions({
      type: 'SET_INITIAL_CONFIG',
      args: {
        config,
        hideDiscount,
        showPaymentMethods,
        skuSelectorProps,
        storeTermsAndConditionsContent,
        addItemOffering,
        addToCart,
        clearData,
        handleGetDocumentsClient,
        handleSelectedItem,
        insertCoupon,
        removeItemOffering,
        updateItems,
        updateOrderFormProfile,
        validateItems,
      },
    })
  }, [])

  useEffect(() => {
    if (config) {
      dispatchActions({
        type: 'SET_STORE_CONFIG',
        args: config,
      })
    }
  }, [config])

  useEffect(() => {
    const itemsUserData = pathOr([], ['items'], orderForm)

    if (loadingAction && itemsUserData?.length > 0) {
      dispatchGlobal(setLoadingAction(false))
    }

    dispatchUserData({
      type: 'SET_ITEMS',
      args: itemsUserData,
    })
  }, [orderForm])

  useEffect(() => {
    if (step === 3) {
      dispatchActions({
        type: 'SET_IS_LOADING_CVV_FIELD',
        args: false,
      })
    }
  }, [step])

  useEffect(() => {
    if (showPaymentMethods?.length) {
      dispatchActions({
        type: 'SET_SHOW_PAYMENT_METHODS',
        args: showPaymentMethods,
      })
    }
  }, [showPaymentMethods])

  useEffect(() => {
    if (!orderForm) return

    const clientProfileData: { email?: string; loadData: boolean } = {
      loadData: userData.clientProfileData.loadData || false,
    }

    // TODO: If we take the information from the cart simulation, we don't need take information from the vtex orderForm
    dispatchUserData({
      type: 'SET_ORDER_FORM',
      args: {
        clientProfileData,
        items: orderForm.items,
        totalizers: orderForm.totalizers,
        value: orderForm.value,
        messages: orderForm.messages,
        marketingData: orderForm.marketingData, // Keep
        paymentData: orderForm.paymentData,
        ratesAndBenefitsData: orderForm.ratesAndBenefitsData,
        // shippingData: orderForm.shippingData,
        // logisticsInfo: orderForm.logisticsInfo,
      },
    })

    dispatchUserData({
      type: 'SET_CUSTOM_DATA',
      args: customData || null, // Keep
    })
  }, [orderForm])

  // Start new context initialization
  useEffect(() => {
    if (JSON.stringify(items) === JSON.stringify(orderForm?.items)) return
    dispatchGlobal(setItems(orderForm?.items || []))
  }, [orderForm?.items])

  useEffect(() => {
    if (!orderForm?.shippingData?.addressAlternative) return

    const { addressAlternative } = orderForm?.shippingData

    const addressInfo = {
      id: addressAlternative?.addressId,
      city: addressAlternative?.city,
      complement: addressAlternative?.reference,
      country: addressAlternative?.country,
      geoCoordinates: {
        latitude: addressAlternative?.geoCoordinates?.latitude,
        longitude: addressAlternative?.geoCoordinates?.longitude,
      },
      neighborhood: addressAlternative?.neighborhood,
      postalCode: addressAlternative?.postalCode,
      receiverName: addressAlternative?.receiverName,
      reference: addressAlternative?.reference,
      state: addressAlternative?.state,
      street: addressAlternative?.street,
      number: addressAlternative?.number,
      selectedSlaId: addressAlternative?.selectedSlaId,
    }

    // TODO: Reducir condicional
    if (addressAlternative?.addressType === 'residential') {
      dispatchGlobal(
        setAddressStore({
          ...addressInfo,
          addressDeliveryType: 'delivery',
        })
      )
    } else if (addressAlternative?.addressType === 'search') {
      dispatchGlobal(
        setAddressStore({
          ...addressInfo,
          addressDeliveryType: 'pickup',
        })
      )
    }
  }, [orderForm?.shippingData?.addressAlternative])

  useEffect(() => {
    const persistedData = localStorage.getItem('checkoutless_data')
    const localEmail = persistedData && JSON.parse(persistedData)

    dispatchGlobal(
      setEmail(
        orderForm?.clientProfileData?.email ||
          (localEmail && localEmail.email) ||
          null
      )
    )
  }, [orderForm?.clientProfileData?.email])

  useEffect(() => {
    const availableCards: Card[] =
      orderForm?.paymentData?.availablePaymentMethods.map((payment) => ({
        bin: payment.bin,
        cardId: payment.id,
        franchise: payment.franchise,
        number: payment.number,
        gateway: payment.gateway,
      }))

    const payments: Payment[] =
      orderForm?.paymentData?.availablePaymentMethods.map((payment) => ({
        bin: payment.bin,
        cardId: payment.id,
        franchise: payment.franchise,
        number: payment.number,
        paymentId: payment.paymentId,
        paymentMethod: payment.paymentMethod,
        origin: payment.origin,
      }))

    const firstItemCard = orderForm?.paymentData?.availablePaymentMethods[0]
    const selectedCard: Card = firstItemCard && {
      cardId: firstItemCard?.id,
      bin: firstItemCard?.bin,
      franchise: firstItemCard?.franchise,
      number: firstItemCard?.number,
      gateway: firstItemCard?.gateway,
    }

    if (selectedCard) {
      dispatchGlobal(
        setPaymentsOrderForm({
          availableCards,
          payment: payments,
          selectedCard,
        })
      )
    }
  }, [orderForm?.paymentData?.availablePaymentMethods])
}
