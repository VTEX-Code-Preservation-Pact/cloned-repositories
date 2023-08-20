/* eslint-disable max-params */
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import {
  selectLoadingOrder,
  setErrorOrder,
  setLoadingOrder,
  setStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useUserData } from '../../contexts/UserDataProvider'
import type { BundleItem, BundleIteminput, Item } from '../../interfaces'
import { Events } from '../../interfaces'
import constants from '../../utils/constants'
import { CREATE_ORDER } from '../../graphql/mutations'
import { useEcommerce } from '../../hooks/useEcommerce'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import { useUnits } from '../../hooks/useUnits'
import { useCustomerCredit } from '../../hooks/useCustomerCredit'
import { BuyCompletedEvent } from '../../events'
import { useFetchIpAddress } from '../../hooks/useFetchIpAddress'
import {
  selectAddressStore,
  selectDeliveryAddress,
  selectItems,
  selectLogisticsInfo,
  selectMainPayment,
  selectOrderForm,
  selectPickUpPointAddress,
  selectProfile,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import {
  selectSimulationStatus,
  selectTotalValue,
} from '../../contexts/global-context/reducers/simulationSlice'

export const useBuyButton = (
  canBuy: boolean,
  className: string,
  classNameContainer: string,
  cvv: string,
  dues: string,
  forceDisabled: boolean,
  handleSubmit: any,
  secondary: boolean
) => {
  const CONSTANTS = {
    delivery: 'delivery',
    creditCard: 'tc',
    store: 'store',
    promissory: 'promissory',
  }

  const [disabled, setDisabled] = useState(true)
  const { ipAddress } = useFetchIpAddress()

  const { hasGoogleAnalytics } = useSelector(selectSettings)
  const loadingOrder = useSelector(selectLoadingOrder)
  const dispatchGlobal = useDispatch()
  const { customData, marketingData, totalizers, totalOfferings } =
    useUserData()

  const value = useSelector(selectTotalValue)

  const { email, habeasData } = useSelector(selectProfile)
  const items = useSelector(selectItems)
  const addressAlternative = useSelector(selectPickUpPointAddress)
  const selectedAddress = useSelector(selectDeliveryAddress)
  const selectedPaymentMethod = useSelector(selectMainPayment)
  const simulationStatus = useSelector(selectSimulationStatus)

  const logisticsInfo = useSelector(selectLogisticsInfo)
  const { handleEcommerce } = useEcommerce()
  const dispatchActions = useActionsDispatch()
  const units = useUnits(items)
  const { onSimulationCredit } = useCustomerCredit()
  const addressStore = useSelector(selectAddressStore)
  const { shipping: shippingOrderForm } = useSelector(selectOrderForm)

  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      const url =
        data.createOrder?.transaction?.RedirectResponseCollection?.[0]
          ?.redirectUrl

      dispatchGlobal(setStep(constants.lastStep))
      dispatchGlobal(setLoadingOrder(false))
      dispatchGlobal(setErrorOrder(null))

      const products = items?.map((item: Item) => {
        const categories = Object.values(item.productCategories)

        return {
          sku: item.id,
          quantity: item.quantity,
          price: item.sellingPrice || item?.price,
          category: categories?.[0] || 'unnkown',
          subcategory: categories?.[1] || 'unnkown',
        }
      })

      handleEcommerce(Events.checkout, { products })

      if (url) {
        dispatchActions({
          type: 'SET_REDIRECT_URL',
          args: url,
        })
      } else {
        BuyCompletedEvent({
          items,
          transactionId: data.createOrder?.id,
          totalizers,
          value,
          hasGoogleAnalytics,
        })
      }
    },
    onError: (error) => {
      console.error(`error`, error)
      dispatchGlobal(setErrorOrder(true))

      setTimeout(() => {
        dispatchGlobal(setErrorOrder(false))
      }, 3000)
      setDisabled(false)
      dispatchGlobal(setLoadingOrder(false))
      dispatchGlobal(setErrorOrder(error))
    },
  })

  const handleClick = (transactionId?: string) => {
    dispatchGlobal(setLoadingOrder(true))
    dispatchGlobal(setErrorOrder(null))

    const bundleItems: BundleIteminput[] = []
    const gifts: any[] = []

    items.forEach((item: Item) =>
      item.bundleItems.forEach((bundleItem: BundleItem) =>
        bundleItems.push({
          id: bundleItem.id,
          parentItemId: item.id,
        })
      )
    )

    const orderItems = items?.map((item: Item) => {
      if (item.isGift) {
        gifts.push({
          id: item.id,
          seller: item.seller,
          quantity: item.quantity,
        })
      }

      return {
        id: item.id,
        seller: item.seller,
        quantity: item.quantity,
      }
    })

    // deberia haber solo un Gateway que seria VTEX

    const gateway =
      selectedPaymentMethod?.paymentMethod === 'BNPL'
        ? 'creditpay'
        : selectedPaymentMethod?.paymentMethod === CONSTANTS.promissory
        ? CONSTANTS.promissory
        : selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard
        ? 'noop'
        : 'custom'

    const paymentMethod = selectedPaymentMethod?.cardId
      ? CONSTANTS.creditCard
      : selectedPaymentMethod?.paymentMethod

    const additionalData =
      selectedPaymentMethod?.origin === CONSTANTS.store &&
      selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard
        ? [{ key: 'accountId', value: selectedPaymentMethod?.cardId }]
        : []

    const franchise =
      selectedPaymentMethod?.origin === CONSTANTS.store &&
      selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard
        ? selectedPaymentMethod?.franchise
        : null

    const data: any = {
      items: orderItems,
      gifts,
      payment: {
        additionalData,
        ...(selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard && {
          cardId:
            selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard &&
            selectedPaymentMethod?.origin !== CONSTANTS.store
              ? selectedPaymentMethod?.cardId
              : null,
        }),
        paymentMethod,
        gateway, // 'paymentez'
        ...(franchise && {
          franchise,
        }),
      },
      profile: {
        email,
        habeasData,
      },
      shipping: {
        addressId: selectedAddress?.id,
        logisticsInfo: logisticsInfo?.map((logisticsInfoItem) => ({
          itemIndex: logisticsInfoItem?.itemIndex,
          selectedDeliveryChannel: logisticsInfoItem?.selectedDeliveryChannel,
          selectedSla: logisticsInfoItem?.selectedSla,
          ...(logisticsInfoItem?.deliveryWindow &&
          logisticsInfoItem?.deliveryWindow?.startDateUtc &&
          logisticsInfoItem?.deliveryWindow?.endDateUtc
            ? {
                deliveryWindow: {
                  startDateUtc: logisticsInfoItem?.deliveryWindow?.startDateUtc,
                  endDateUtc: logisticsInfoItem?.deliveryWindow?.endDateUtc,
                },
              }
            : {}),
        })),
      },
      account: {
        storePreferences: {
          currencyCode: constants.currencyCode,
          countryCode: constants.countryCode,
          salesChannel: constants.salesChannel,
        },
      },
      channel: 'kuikpay',
      customData: customData || null,
      offerings: bundleItems,
      marketingData: marketingData?.coupon ? marketingData : null,
    }

    if (selectedPaymentMethod?.paymentMethod === CONSTANTS.creditCard) {
      if (dues !== '') {
        data.payment.additionalData.push({
          key: 'installments',
          value: dues,
        })
      }

      if (cvv) {
        data.payment.cvv = cvv
      }

      if (transactionId) {
        data.payment.additionalData.push({
          key: 'transactionId',
          value: transactionId,
        })
      }
    }

    if (selectedPaymentMethod?.paymentId) {
      data.payment.additionalData.push({
        key: 'paymentSystem',
        value: selectedPaymentMethod?.paymentId,
      })
    }

    if (!data.marketingData) delete data.marketingData

    if (
      (addressAlternative &&
        addressAlternative?.addressDeliveryType !== CONSTANTS.delivery &&
        (!selectedAddress || !selectedAddress?.id)) ||
      (addressAlternative &&
        selectedAddress &&
        !logisticsInfo?.some(
          (item) => item.selectedDeliveryChannel === CONSTANTS.delivery
        ))
    ) {
      delete data?.shipping?.addressId
    }

    if (
      addressAlternative &&
      addressAlternative?.addressDeliveryType !== CONSTANTS.delivery
    ) {
      data.shipping.externalAddress = {
        addressId: addressAlternative?.id || '',
        postalCode: addressAlternative?.postalCode,
        country: addressAlternative?.country,
        state: addressAlternative?.state,
        city: addressAlternative?.city,
        street: addressAlternative?.street,
        number: addressAlternative?.number,
        geoCoordinates: addressAlternative?.geoCoordinates,
        neighborhood: addressAlternative?.neighborhood || '',
        addressType: addressAlternative?.addressDeliveryType,
        receiverName: addressAlternative?.receiverName?.trim() || '',
        reference: addressAlternative?.reference || '',
      }
    } else if (addressStore) {
      const { availableAddresses } = shippingOrderForm

      if (
        availableAddresses.find((address) => address.id === addressStore.id)
      ) {
        return
      }

      data.shipping.externalAddress = {
        addressId: addressStore?.id || '',
        postalCode: addressStore?.postalCode,
        country: addressStore?.country,
        state: addressStore?.state,
        city: addressStore?.city,
        street: addressStore?.street,
        number: addressStore?.number || 0,
        geoCoordinates: addressStore?.geoCoordinates,
        neighborhood: addressStore?.neighborhood || '',
        addressType: addressStore?.addressDeliveryType,
        receiverName: addressStore?.receiverName?.trim() || '',
        reference: addressStore?.reference || '',
      }
    }

    data.ip = ipAddress

    createOrder({
      variables: {
        orderArgs: data,
      },
    })
  }

  /**
   * Validation before sending data
   */
  const preHandleClick = () => {
    handleSubmit && handleSubmit instanceof Function
    if (handleSubmit && handleSubmit instanceof Function) {
      handleSubmit(handleClick)
    } else {
      handleClick()
    }
  }

  useEffect(() => {
    const itemsAvailability = items.filter(
      (item: Item) => item.availability !== 'available'
    )

    if (itemsAvailability.length === 0 && items.length) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [items])

  useEffect(() => {
    if (selectedPaymentMethod?.paymentMethod === 'BNPL' && totalizers.length) {
      const isShipping = !!totalizers.find((e) => e.id === 'Shipping')

      isShipping && onSimulationCredit()
    }
  }, [selectedPaymentMethod, value, totalizers])

  useEffect(() => {
    if (loadingOrder) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [loadingOrder])

  return {
    canBuy,
    className,
    classNameContainer,
    disabled,
    forceDisabled,
    loadingOrder,
    secondary,
    totalOfferings,
    units,
    value,
    preHandleClick,
    isSimulationReady: !(
      simulationStatus === 'preloading' || simulationStatus === 'idle'
    ),
  }
}
