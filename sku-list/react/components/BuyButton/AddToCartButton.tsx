import React, { FC } from 'react'
import { useMutation } from 'react-apollo'
import {
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
  defineMessages,
} from 'react-intl'
import { Button, Tooltip } from 'vtex.styleguide'
import { OrderForm } from 'vtex.order-manager'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { addToCart as ADD_TO_CART } from 'vtex.checkout-resources/Mutations'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import { usePWA } from 'vtex.store-resources/PWAContext'

import { compareObjects } from './modules/compareObjects'
import { MapCatalogItemToCartReturn } from './modules/catalogItemToCart'
import { OrderFormArgs, OrderFormItemInput } from '../../typings'

interface Props {
  isOneClickBuy: boolean
  available: boolean
  disabled: boolean
  customToastUrl: string
  customOneClickBuyLink: string
  skuItems: MapCatalogItemToCartReturn[]
  showToast: Function
  allSkuVariationsSelected: boolean
}

interface OrderFormContext {
  loading: boolean
  orderForm: OrderFormArgs | undefined
  setOrderForm: (orderForm: Partial<OrderFormArgs>) => void
}

const CSS_HANDLES = ['buttonText', 'buttonDataContainer']
const CHECKOUT_URL = '/checkout/#/cart'

const messages = defineMessages({
  success: { id: 'store/add-to-cart.success', defaultMessage: '' },
  duplicate: { id: 'store/add-to-cart.duplicate', defaultMessage: '' },
  error: { id: 'store/add-to-cart.failure', defaultMessage: '' },
  seeCart: { id: 'store/add-to-cart.see-cart', defaultMessage: '' },
})

const adjustItemsForMutationInput = (
  newItems: MapCatalogItemToCartReturn[]
): OrderFormItemInput[] => {
  return newItems.map(item => ({
    id: Number.parseInt(item.skuId),
    index: item.index,
    seller: item.seller,
    quantity: item.quantity,
    options: item.options,
  }))
}

const adjustSkuItemForPixelEvent = (skuItem: MapCatalogItemToCartReturn) => {
  // Changes this `/Apparel & Accessories/Clothing/Tops/`
  // to this `Apparel & Accessories/Clothing/Tops`
  const category = skuItem.category ? skuItem.category.slice(1, -1) : ''

  return {
    skuId: skuItem.skuId,
    variant: skuItem.variant,
    price: skuItem.price,
    name: skuItem.name,
    quantity: skuItem.quantity,
    productRefId: skuItem.productRefId,
    brand: skuItem.brand,
    category,
  }
}

const AddToCartButton: FC<Props & InjectedIntlProps> = ({
  intl,
  isOneClickBuy,
  customOneClickBuyLink,
  available,
  disabled,
  skuItems,
  customToastUrl,
  showToast,
  allSkuVariationsSelected = true,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const {
    orderForm,
    setOrderForm,
    loading,
  }: OrderFormContext = OrderForm.useOrderForm()
  const dispatch = useProductDispatch()
  const { rootPath } = useRuntime()
  const { push } = usePixel()
  const { settings = {}, showInstallPrompt = undefined } = usePWA() || {}
  const { promptOnCustomEvent } = settings
  const translateMessage = (message: FormattedMessage.MessageDescriptor) =>
    intl.formatMessage(message)

  const resolveToastMessage = (success: boolean, isNewItem: boolean) => {
    if (!success) return translateMessage(messages.error)
    if (!isNewItem) return translateMessage(messages.duplicate)

    return translateMessage(messages.success)
  }

  const toastMessage = ({
    success,
    isNewItem,
  }: {
    success: boolean
    isNewItem: boolean
  }) => {
    const message = resolveToastMessage(success, isNewItem)

    const action = success
      ? {
          label: translateMessage(messages.seeCart),
          href: customToastUrl,
        }
      : undefined

    showToast({ message, action })
  }

  const [
    addToCart,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation<
    { addToCart: OrderFormArgs },
    { items: OrderFormItemInput[] }
  >(ADD_TO_CART)

  const handleAddToCart = async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const adjustedSkuItems = adjustItemsForMutationInput(skuItems)

    const mutationResult = await addToCart({
      variables: { items: adjustedSkuItems },
    })

    if (mutationError) {
      console.error(mutationError)
      toastMessage({ success: false, isNewItem: false })
      return
    }

    if (
      mutationResult.data &&
      compareObjects(mutationResult.data.addToCart, orderForm)
    ) {
      toastMessage({ success: true, isNewItem: false })
      return
    }

    // Update OrderForm from the context
    mutationResult.data && setOrderForm(mutationResult.data.addToCart)

    // Send event to pixel-manager
    const pixelEventItems = skuItems.map(adjustSkuItemForPixelEvent)
    push({
      event: 'addToCart',
      items: pixelEventItems,
    })

    if (isOneClickBuy) {
      location.assign(rootPath + (customOneClickBuyLink || CHECKOUT_URL))
    }

    toastMessage({ success: true, isNewItem: true })

    /* PWA */
    if (promptOnCustomEvent === 'addToCart' && showInstallPrompt) {
      showInstallPrompt()
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (dispatch) {
      dispatch({ type: 'SET_BUY_BUTTON_CLICKED', args: { clicked: true } })
    }

    if (allSkuVariationsSelected) {
      handleAddToCart(e)
    }
  }

  const availableButtonContent = (
    <div className={`${handles.buttonDataContainer} flex justify-center`}>
      <FormattedMessage id="store/add-to-cart.add-to-cart">
        {message => <span className={handles.buttonText}>{message}</span>}
      </FormattedMessage>
    </div>
  )

  const unavailableButtonContent = (
    <FormattedMessage id="store/buyButton-label-unavailable">
      {message => <span className={handles.buttonText}>{message}</span>}
    </FormattedMessage>
  )

  const tooltipLabel = (
    <FormattedMessage id="store/add-to-cart.select-sku-variations">
      {message => <span className={handles.errorMessage}>{message}</span>}
    </FormattedMessage>
  )

  return allSkuVariationsSelected ? (
    <Button
      block
      disabled={disabled || !available || loading || mutationLoading}
      isLoading={mutationLoading}
      onClick={handleClick}>
      {available ? availableButtonContent : unavailableButtonContent}
    </Button>
  ) : (
    <Tooltip trigger="click" label={tooltipLabel}>
      <Button
        block
        disabled={disabled || !available || loading || mutationLoading}
        isLoading={mutationLoading}
        onClick={handleClick}>
        {available ? availableButtonContent : unavailableButtonContent}
      </Button>
    </Tooltip>
  )
}

export default injectIntl(AddToCartButton)
