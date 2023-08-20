import { pathOr } from 'ramda'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../../../contexts/ActionsProviderV2'
import { selectItems } from '../../../contexts/global-context/reducers/orderFormDataSlice'
import {
  selectPromotions,
  selectTotals,
  selectTotalValue,
} from '../../../contexts/global-context/reducers/simulationSlice'
import { useUserData } from '../../../contexts/UserDataProvider'
import { useValidateStyles } from '../../../hooks/useValidateStyles'
import type { CustomSubTotalItems } from '../../../interfaces'
import { DiscountIdentifier } from '../../../interfaces'

export const useTotals = (): any => {
  const global = useValidateStyles()

  // TODO: Los totales se deberian sacar de la simulacion del carrito no del orderForm
  const { subtotalExcludePrice, totalOfferings } = useUserData()

  const cartItems = useSelector(selectItems)
  const totals = useSelector(selectTotals)
  const promotions = useSelector(selectPromotions)
  const value = useSelector(selectTotalValue)

  const { config, hideDiscount } = useActions()

  const { items, shipping, tax, discount: discounts } = totals
  const exclusivePromotion = useMemo(() => {
    if (!promotions?.length) return null
    const promotionList = []

    for (let t = 0; t < promotions.length; t++) {
      let sum = 0
      let isGift = false

      for (let e = 0; e < cartItems.length; e++) {
        for (let o = 0; o < cartItems[e].priceTags.length; o++) {
          if (cartItems[e].priceTags[o].identifier === promotions[t].id) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            sum += cartItems[e].priceTags[o].value
            isGift = cartItems[e].priceTags[o].name === DiscountIdentifier.GIFT
          }
        }
      }

      if (sum !== 0) {
        promotionList.push({
          id: promotions[t].id,
          name: promotions[t].name,
          value: sum,
          isGift,
        })
      }
    }

    return promotionList
  }, [promotions])

  const customSubTotalItems = useMemo<CustomSubTotalItems[]>(
    () => pathOr([], ['customSubTotalItems'], config),
    [config]
  )

  const discountCustomItem = useMemo(() => {
    return customSubTotalItems.reduce((a, b) => {
      a += b?.value

      return a
    }, 0)
  }, [customSubTotalItems])

  const totalExcludePrice = Number(
    Object.values(subtotalExcludePrice).reduce((total: number, val: number) => {
      return total + val
    }, 0)
  )

  const subtotal =
    items + totalOfferings - totalExcludePrice - discountCustomItem

  return {
    config,
    customSubTotalItems,
    discounts,
    exclusivePromotion,
    global,
    hideDiscount,
    items,
    shipping,
    subtotal,
    subtotalExcludePrice,
    tax,
    totalOfferings,
    value,
  }
}
