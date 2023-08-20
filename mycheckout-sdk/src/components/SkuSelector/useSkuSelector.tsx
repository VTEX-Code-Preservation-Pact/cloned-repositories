import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

import { AddToCartEvent } from '../../events'
import { minimizeModal } from '../../contexts/global-context/reducers/modalSlice'
import { selectItemData } from '../../contexts/global-context/reducers/cartSlice'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import {
  setLoadingAction,
  setNextStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  useActions,
  useActionsDispatch,
} from '../../contexts/ActionsProviderV2'

export interface LoadingAlertProps {
  loading: boolean
  message: string
}

const useSkuSelector = () => {
  const intl = useIntl()
  const [disabled, setDisabled] = useState(true)
  const [loadingAlert, setLoadingAlert] = useState<LoadingAlertProps>()
  const { addToCart } = useActions()
  const { selectedItem, itemToAdd, product } = useSelector(selectItemData)
  const dispatchGlobal = useDispatch()
  const dispatchActions = useActionsDispatch()
  const { hasGoogleAnalytics } = useSelector(selectSettings)

  useEffect(() => {
    if (!disabled) {
      setLoadingAlert({
        loading: false,
        message: null,
      })
    }
  }, [disabled])

  const handleClickContinue = () => {
    if (itemToAdd) {
      dispatchGlobal(setLoadingAction(true))
      addToCart({
        id: itemToAdd.id,
        quantity: itemToAdd.quantity,
        seller: itemToAdd.seller,
      })

      const categories = product?.categories[0]
        ?.split('/')
        ?.filter((item: string) => item !== '')

      dispatchActions({
        type: 'SET_IS_CLICK_ADD_TO_CART',
        args: {
          isClick: true,
          data: {
            id: itemToAdd.id,
            quantity: itemToAdd.quantity,
            seller: itemToAdd.seller,
            price: product?.priceRange?.listPrice?.lowPrice || 0,
            category: categories?.[0] || 'unnkown',
            subcategory: categories?.[1] || 'unnkown',
          },
        },
      })
      AddToCartEvent({ selectedItem, product, itemToAdd, hasGoogleAnalytics })
    }

    dispatchGlobal(setNextStep())
  }

  const handleClickClose = () => {
    if (itemToAdd) {
      dispatchGlobal(setLoadingAction(true))
      addToCart({
        id: itemToAdd.id,
        quantity: itemToAdd.quantity,
        seller: itemToAdd.seller,
      })
      AddToCartEvent({ selectedItem, product, itemToAdd, hasGoogleAnalytics })
    }

    localStorage.setItem('minimize_modal', 'true')
    dispatchGlobal(minimizeModal())
    dispatchGlobal(setNextStep())
  }

  const handleClickAlert = () => {
    setLoadingAlert({
      loading: true,
      message: 'store/checkoutless.alert.selectionOfVariations',
    })
  }

  return {
    disabled,
    intl,
    loadingAlert,
    selectedItem,
    handleClickAlert,
    handleClickClose,
    handleClickContinue,
    setDisabled,
  }
}

export default useSkuSelector
