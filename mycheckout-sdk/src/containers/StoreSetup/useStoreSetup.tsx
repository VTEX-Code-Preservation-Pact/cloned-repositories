import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pathOr } from 'ramda'

import { useInitializeAll } from '../../hooks/useInitializeAll'
import type { InitialProps } from '../../interfaces'
import { Events } from '../../interfaces'
import { ACCOUNTS } from '../../graphql/queries'
import constants from '../../utils/constants'
import {
  selectSettings,
  setIsMobile,
  setSettings,
  setTheme,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { validateOrion } from '../../utils/payments'
import { setBlockedShipping } from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  useActions,
  useActionsDispatch,
} from '../../contexts/ActionsProviderV2'
import { useEcommerce } from '../../hooks/useEcommerce'
import { isMobile as isMobileValidation } from '../../utils'

export const useStoreSetup = ({
  blockedShipping,
  config,
  hideDiscount,
  customData,
  orderForm,
  showPaymentMethods,
  skuSelectorProps,
  storeTermsAndConditionsContent,
  theme,
  addItemOffering,
  addToCart,
  clearData,
  handleGetDocumentsClient,
  handleSelectedItem = null,
  insertCoupon,
  removeItemOffering,
  updateItems,
  updateOrderFormProfile,
  validateItems,
}: InitialProps) => {
  const { isClickAddToCart } = useActions()
  const dispatchActions = useActionsDispatch()
  const { handleEcommerce } = useEcommerce()

  const dispatchGlobal = useDispatch()
  const { isLoaded } = useSelector(selectSettings)

  const { data, loading, error } = useQuery(ACCOUNTS, {
    skip: isLoaded,
  })

  useInitializeAll({
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
  })

  useEffect(() => {
    const res = isMobileValidation()

    dispatchGlobal(setIsMobile(!!res))
    dispatchGlobal(setTheme(theme))

    if (!blockedShipping) return
    dispatchGlobal(setBlockedShipping(blockedShipping))
  }, [])

  useEffect(() => {
    if (loading) return

    if (error) {
      console.error(constants.serverErrorMessage)

      return
    }

    if (!data?.accounts.isConfigured) {
      console.warn(constants.accountNotConfiguredMessage)
    }

    if (!!data && Object.entries(data).length >= 1) {
      dispatchGlobal(
        setSettings({
          additionalData: data?.accounts.additionalData?.reduce(
            (
              prev: Record<string, string>,
              item: { key: string; value: string }
            ) => {
              return {
                ...prev,
                [item.key]: item.value,
              }
            },
            {}
          ),
          buttonMessage: pathOr('', ['accounts', 'buttonMessage'], data),
          buttonText: pathOr('', ['accounts', 'text'], data),
          cvcRequired: data?.accounts.cvcRequired,
          habeasDataInformation: data?.accounts.habeasDataInformation,
          hasGoogleAnalytics: data?.accounts.hasGoogleAnalytics,
          isConfigured: data?.accounts.isConfigured,
          isLiteVersion: true,
          orion: validateOrion(pathOr([], ['accounts', 'PaymentMethod'], data)),
          paymentMethod: pathOr([], ['accounts', 'PaymentMethod'], data),
          paymentSystem: data?.accounts.paymentSystem,
          styles: pathOr('', ['accounts', 'styles'], data),
          visualization: pathOr([], ['accounts', 'visualization'], data),
        })
      )
    }
  }, [loading])

  // Check this logic
  useEffect(() => {
    const { isClick, data: dataAddToCart } = isClickAddToCart

    // eslint-disable-next-line vtex/prefer-early-return
    if (isClick) {
      const dataProduct = [
        {
          sku: dataAddToCart.id,
          quantity: dataAddToCart.quantity,
          price: dataAddToCart?.price,
          category: dataAddToCart?.category || 'unnkown',
          subcategory: dataAddToCart?.subcategory || 'unnkown',
        },
      ]

      if (dataAddToCart.id) {
        handleEcommerce(Events.add, { products: dataProduct })
      }

      dispatchActions({
        type: 'SET_IS_CLICK_ADD_TO_CART',
        args: {
          isClick: false,
          data: null,
        },
      })
    }
  }, [isClickAddToCart])
}
