import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

import { BuyCompletedEvent, SelectedMethodPaymentEvent } from '../../events'
import { CREATE_ORDER } from '../../graphql/mutations'
import { CreditCard, MyOrder } from '../Icons'
import { Events } from '../../interfaces'
import { PaymentProvider } from '../../contexts/PaymentContext'
import { PaymentsList } from '../Payments/Models/payments'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import { useCustomerCredit } from '../../hooks/useCustomerCredit'
import { useEcommerce } from '../../hooks/useEcommerce'
import { useUnits } from '../../hooks/useUnits'
import {
  selectLoadingOrder,
  setErrorOrder,
  setLoadingOrder,
  setNextSection,
  setStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectSettings,
  selectTheme,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import {
  useUserData,
  useUserDataDispatch,
} from '../../contexts/UserDataProvider'
import constants from '../../utils/constants'
import InfoItem from '../shared/InfoItem'
import LoadingProcessOrder from '../UserInfo/LoadingProcessOrder/LoadingProcessOrderContainer'
import Payments from '../Payments'
import Title from '../shared/Title'
import type { BundleItem, BundleIteminput, Item } from '../../interfaces'
import genericStyles from './generic-styles.module.css'
import globalStyles from '../../myCheckout-styles.module.css'
import kuikpayStyles from './kuikpay-styles.module.css'
import vtexStyles from './vtex-styles.module.css'
import {
  selectAddressStore,
  selectDeliveryAddress,
  selectItems,
  selectLogisticsInfo,
  selectOrderForm,
  selectPickUpPointAddress,
  selectProfile,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import { Alert } from '../shared'
import { useFetchIpAddress } from '../../hooks/useFetchIpAddress'
import { selectTotalValue } from '../../contexts/global-context/reducers/simulationSlice'

interface Props {
  gateway?: string
  handleGetDocumentsClient?: (email: string) => void
}

const PaymentForm = ({ gateway, handleGetDocumentsClient }: Props) => {
  const { marketingData, customData, totalOfferings, totalizers } =
    useUserData()

  const value = useSelector(selectTotalValue)
  const { hasGoogleAnalytics } = useSelector(selectSettings)
  const { ipAddress } = useFetchIpAddress()

  const theme = useSelector(selectTheme)
  const items = useSelector(selectItems)
  const { email } = useSelector(selectProfile)
  const addressAlternative = useSelector(selectPickUpPointAddress)
  const selectedAddress = useSelector(selectDeliveryAddress)
  const addressStore = useSelector(selectAddressStore)
  const { shipping } = useSelector(selectOrderForm)

  const intl = useIntl()
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PaymentsList.CreditCard
  )

  const [paymentSystem, setPaymentSystem] = useState<string>('')
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [franchiseImg, setFranchiseImg] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const { canPayWithCredit, onSimulationCredit, onChangePaymet } =
    useCustomerCredit()

  const logisticsInfo = useSelector(selectLogisticsInfo)
  const dispatchGlobal = useDispatch()
  const { handleEcommerce } = useEcommerce()
  const dispatchActions = useActionsDispatch()
  const dispatchUserData = useUserDataDispatch()
  let styles = kuikpayStyles

  const loadingOrder = useSelector(selectLoadingOrder)

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  const units = useUnits(items)

  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      const url =
        data.createOrder?.transaction?.RedirectResponseCollection?.[0]
          ?.redirectUrl

      if (
        handleGetDocumentsClient &&
        handleGetDocumentsClient instanceof Function
      ) {
        handleGetDocumentsClient(email || '')
      }

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

      dispatchGlobal(setStep(constants.lastStep))

      dispatchGlobal(setErrorOrder(false))
      dispatchUserData({
        type: 'SET_CHANGE_INFO',
        args: {
          isEdit: false,
          isNewInfo: false,
          userLocation: false,
          isChangeEmail: false,
        },
      })
      dispatchGlobal(setLoadingOrder(false))

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
    onError: (err) => {
      console.error(`error`, err)
      dispatchGlobal(setLoadingOrder(false))
      dispatchGlobal(setErrorOrder(true))

      setTimeout(() => {
        dispatchGlobal(setErrorOrder(false))
      }, 3000)
    },
  })

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
    const payment = sessionStorage.getItem('force-payment')

    setPaymentMethod(payment || PaymentsList.CreditCard)

    SelectedMethodPaymentEvent({ option: paymentMethod, hasGoogleAnalytics })

    return () => {
      setPaymentMethod(PaymentsList.CreditCard)
    }
  }, [])

  useEffect(() => {
    if (paymentMethod === 'bnpl') {
      onSimulationCredit()
    }

    onChangePaymet()

    SelectedMethodPaymentEvent({ option: paymentMethod, change: true })
  }, [paymentMethod])

  const handleClick = (cardData: any) => {
    setError(null)
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

    const data: any = {
      items: orderItems,
      gifts,
      payment: cardData || {
        paymentMethod,
        gateway: 'promissory',
      },
      profile: {
        email,
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

    if (!data.marketingData) delete data.marketingData

    if (
      (addressAlternative &&
        addressAlternative?.addressDeliveryType !== 'delivery' &&
        (!selectedAddress || !selectedAddress?.id)) ||
      (addressAlternative &&
        selectedAddress &&
        !logisticsInfo?.some(
          (item) => item.selectedDeliveryChannel === 'delivery'
        ))
    ) {
      delete data?.shipping?.addressId
    }

    if (
      addressAlternative &&
      addressAlternative?.addressDeliveryType !== 'delivery'
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
      const { availableAddresses } = shipping

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

  const handledClickDisabled = () => setShowAlert(true)

  useEffect(() => {
    if (loadingOrder) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [loadingOrder])

  const onSelectedPayment = (type: string, paymentSystemArgs: string) => {
    setPaymentMethod(type)
    setPaymentSystem(paymentSystemArgs)
  }

  const context = useMemo(
    () => ({
      canPayWithCredit,
      disabled,
      error,
      franchiseImg,
      gateway,
      global: globalStyles,
      intl,
      loadingOrder,
      paymentMethod,
      paymentSystem,
      styles,
      value,
      handleClick,
      handledClickDisabled,
      onSelectedPayment,
      setError,
      setFranchiseImg,
    }),
    [
      canPayWithCredit,
      disabled,
      error,
      franchiseImg,
      gateway,
      loadingOrder,
      paymentMethod,
      paymentSystem,
      selectedAddress,
      value,
    ]
  )

  return (
    <PaymentProvider value={context}>
      <Fragment>
        {loadingOrder ? (
          <Fragment>
            loading
            <LoadingProcessOrder />
          </Fragment>
        ) : (
          <div style={{ display: loadingOrder ? 'none' : '' }}>
            <Alert
              enableAutoClose={true}
              isOpen={showAlert}
              text="store/checkoutless.register.card.enterAllFields"
              type="warning"
              handleClickClose={() => setShowAlert(false)}
            />
            <Title>
              <Title.Item title="store/checkoutless.register.payment">
                <CreditCard fill={globalStyles.iconPrimary} />
              </Title.Item>

              <InfoItem
                className={globalStyles.inMobileFlex}
                firstAction={() => dispatchGlobal(setNextSection('summary'))}
              >
                <InfoItem.Icon>
                  <MyOrder
                    fill={globalStyles.iconAlternative}
                    height={24}
                    width={24}
                  />
                </InfoItem.Icon>
                <InfoItem.Content text="store/checkoutless.summary.myOrder" />
              </InfoItem>
            </Title>
            <Payments units={units} totalOfferings={totalOfferings} />
          </div>
        )}
      </Fragment>
    </PaymentProvider>
  )
}

export default PaymentForm
