import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  newItemSelection,
  selectVariationSelected,
  updateSelectedItem,
} from '../../contexts/global-context/reducers/cartSlice'
import {
  setLoadingAction,
  setStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import { openModal } from '../../contexts/global-context/reducers/modalSlice'
import { selectOrderFormStatus } from '../../contexts/global-context/reducers/orderFormDataSlice'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { AddToCartEvent } from '../../events'
import { useEcommerce } from '../../hooks/useEcommerce'
import type { ItemToAdd, Product, ProductItem } from '../../interfaces'
import { Events } from '../../interfaces'

export const useMyCheckoutButton = (
  itemToAdd: ItemToAdd,
  product: Product,
  selectedItem: ProductItem,
  validateBeforeOfAdd: () => boolean | undefined,
  disabled: boolean,
  multipleAvailableSKUs: boolean,
  onClickBehavior: 'ensure-sku-selection',
  forceOpenModal: boolean,
  addToCart: (item: ItemToAdd) => void,
  handleSelectedItem: (item: ProductItem) => void,
  isVisible: boolean,
  isPreview: boolean,
  text: string
  // eslint-disable-next-line max-params
) => {
  const dispatchGlobal = useDispatch()
  const { handleEcommerce } = useEcommerce()
  const variationSelected = useSelector(selectVariationSelected)
  const { buttonText, isConfigured, hasGoogleAnalytics } =
    useSelector(selectSettings)

  const orderFormStatus = useSelector(selectOrderFormStatus)

  const handleClick = (e?: any) => {
    if (isPreview) return
    e?.preventDefault()
    e?.stopPropagation()

    dispatchGlobal(
      newItemSelection({
        itemToAdd,
        product,
        selectedItem,
      })
    )

    const isProcessClick =
      validateBeforeOfAdd && validateBeforeOfAdd instanceof Function
        ? validateBeforeOfAdd()
        : null

    if (
      (isProcessClick || isProcessClick === null) &&
      !disabled &&
      itemToAdd &&
      (!multipleAvailableSKUs || onClickBehavior !== 'ensure-sku-selection')
    ) {
      dispatchGlobal(setLoadingAction(true))
      addToCart({
        id: itemToAdd.id,
        quantity: itemToAdd.quantity,
        seller: itemToAdd.seller,
      })

      const categories = product?.categories
        ? product?.categories[0]?.split('/')?.filter((item) => item !== '')
        : 'unnkown'

      handleEcommerce(Events.click, {
        onCompleted: () => {
          handleEcommerce(Events.add, {
            products: [
              {
                sku: itemToAdd.id,
                quantity: itemToAdd.quantity,
                price: product?.priceRange?.listPrice?.lowPrice || 0,
                category: categories?.[1] || 'unnkown',
                subcategory: categories?.[1] || 'unnkown',
              },
            ],
          })
        },
      })
    } else {
      handleEcommerce(Events.click)
    }

    const shouldNavigateToSkuSelector =
      onClickBehavior === 'ensure-sku-selection' && multipleAvailableSKUs

    if (shouldNavigateToSkuSelector) {
      dispatchGlobal(setStep(0))
    } else {
      orderFormStatus === 'idle' && dispatchGlobal(setStep(1))
      AddToCartEvent({ selectedItem, product, itemToAdd, hasGoogleAnalytics })
    }

    if ((isProcessClick || isProcessClick === null) && !disabled) {
      localStorage.setItem('minimize_modal', 'false')
      dispatchGlobal(openModal())
    }
  }

  const processShowLogo = () => {
    if (isPreview && text) return text

    if (buttonText) return buttonText

    return 'Compra rápida'
  }

  useEffect(() => {
    if (!variationSelected || !handleSelectedItem || !product) return

    const { items } = product
    const selectedSku = items?.find((item: ProductItem) => {
      return item.itemId === variationSelected.itemId
    })

    if (selectedSku) {
      handleSelectedItem(variationSelected)
    }
  }, [variationSelected])

  useEffect(() => {
    updateSelectedItem({
      itemToAdd,
      product,
      selectedItem,
    })
  }, [itemToAdd])

  useEffect(() => {
    if (forceOpenModal) {
      handleClick()
    }
  }, [forceOpenModal])

  const show = useMemo(() => {
    return isPreview || (isVisible && isConfigured)
  }, [isVisible, isConfigured])

  return {
    disabled,
    show,
    handleClick,
    processShowLogo,
  }
}
