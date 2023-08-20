import { useState } from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import type { Item } from '../../../interfaces'
import { Events } from '../../../interfaces'
import { useActions } from '../../../contexts/ActionsProviderV2'
// import { useUserData } from '../../../contexts/UserDataProvider'
import { useEcommerce } from '../../../hooks/useEcommerce'
import { RemovedFromCartEvent } from '../../../events'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'

interface Props {
  item: Item
}

const useProduct = (props: Props) => {
  const {
    item: {
      sellingPrice,
      quantity,
      uniqueId,
      index,
      price,
      id,
      productCategories,
      listPrice,
      showTotalMount,
    },
  } = props

  const { updateItems, config, skuSelectorProps } = useActions()

  const { handleEcommerce } = useEcommerce()
  const { hasGoogleAnalytics } = useSelector(selectSettings)

  // const { subtotalExcludePrice } = useUserData()
  const visibleVariations = pathOr([], ['visibleVariations'], skuSelectorProps)

  // const percentage =
  //   price > sellingPrice ? Math.ceil(((sellingPrice - price) / price) * 100) : 0

  const newSellingPrice = Number.isNaN(sellingPrice) ? listPrice : sellingPrice

  const [loading, setLoading] = useState(false)

  const listPriceToUse = showTotalMount ? listPrice * quantity : listPrice

  const sellingPriceToUse = showTotalMount
    ? newSellingPrice * quantity
    : newSellingPrice

  const handleClick = () => {
    setLoading(true)
    updateItems([
      {
        id,
        index,
        uniqueId,
        quantity: 0,
      },
    ])

    const categories = Object?.values(productCategories) || []
    const dataProduct = [
      {
        sku: id,
        quantity,
        price: sellingPrice || price,
        category: (categories?.[0] as string) || 'unnkown',
        subcategory: (categories?.[1] as string) || 'unnkown',
      },
    ]

    handleEcommerce(Events.remove, { products: dataProduct })
    RemovedFromCartEvent({ item: props.item, hasGoogleAnalytics })
    setLoading(false)
  }

  return {
    config,
    loading,
    handleClick,
    newSellingPrice,
    visibleVariations,
    listPriceToUse,
    sellingPriceToUse,
  }
}

export default useProduct
