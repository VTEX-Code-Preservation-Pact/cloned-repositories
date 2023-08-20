import { pathOr } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActions } from '../../contexts/ActionsProviderV2'
import { setPrevStep } from '../../contexts/global-context/reducers/checkoutFormSlice'
import { selectItems } from '../../contexts/global-context/reducers/orderFormDataSlice'
import {
  setIsFullscreen,
  setIsSummaryOpen,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useUserDataDispatch } from '../../contexts/UserDataProvider'
import type { CustomItems, Item } from '../../interfaces'

export const useSummary = (isCollapsible: boolean) => {
  const [open, setOpen] = useState(!isCollapsible)
  const [someItemUnavailable, setSomeItemUnavailable] = useState(false)
  const [itemsGift, setItemsGift] = useState<Item[]>([])
  const [itemsCustoms, setItemsCustoms] = useState<Item[]>([])

  const dispatchGlobal = useDispatch()

  const items = useSelector(selectItems)

  const { config } = useActions()

  const dispatchUserData = useUserDataDispatch()

  const customItems = useMemo(
    () => pathOr<CustomItems[]>([], ['customItems'], config),
    [config]
  )

  const sendToFinish = useMemo(() => {
    const impossibleRemove = pathOr<CustomItems[]>([], ['customItems'], config)

    return impossibleRemove.filter((i) => i.sendToFinish)
  }, [config])

  const handleClick = (isOpen: boolean) => {
    dispatchGlobal(setIsSummaryOpen(isOpen))
    setOpen(isOpen)
  }

  const handleContinue = () => {
    dispatchGlobal(setPrevStep())
  }

  const isCustomItem = (item: Item) => {
    return sendToFinish.some((send) => send?.sku === item?.id)
  }

  const getCustomItem = (item: Item) => {
    return customItems.find((send) => send?.sku === item?.id)
  }

  useEffect(() => {
    const gifts: Item[] = []

    const itemsAvailability = items.filter((item: Item) => {
      const itemCustom = getCustomItem(item)

      if (item.isGift) {
        gifts.push({
          ...item,
          ...itemCustom,
          name: itemCustom?.name || item.name,
        })
      }

      return item.availability !== 'available'
    })

    const itemToFinish = items
      .filter((item: Item) => {
        return sendToFinish.some((i) => i?.sku === item?.id)
      })
      .map((item: Item) => {
        const itemCustom = getCustomItem(item)

        return {
          ...item,
          ...itemCustom,
          name: itemCustom?.name || item.name,
        }
      })

    setItemsCustoms(itemToFinish)

    if (gifts.length > 0) {
      setItemsGift(gifts)
    } else {
      setItemsGift([])
    }

    if (itemsAvailability.length) {
      setSomeItemUnavailable(true)
      setOpen(true)
      dispatchGlobal(setIsSummaryOpen(true))
    } else {
      setSomeItemUnavailable(false)
    }

    const offerings: any = []
    let totalOfferings = 0

    items.forEach((item) => {
      if (item.bundleItems?.length > 0) {
        const totalOfferingByItem: number = item.bundleItems
          .map((el) => el.price)
          .reduce((crr, next) => crr + next)

        offerings.push(totalOfferingByItem)
      }
    })

    if (offerings.length > 0) {
      totalOfferings = offerings.reduce(
        (crr: number, next: number) => crr + next
      )
      dispatchUserData({
        type: 'SET_OFFERINGS_PRICE',
        args: totalOfferings / 100,
      })
    } else {
      dispatchUserData({
        type: 'SET_OFFERINGS_PRICE',
        args: 0,
      })
    }
  }, [items, sendToFinish])

  useEffect(() => {
    dispatchGlobal(setIsFullscreen(true))

    return () => {
      dispatchGlobal(setIsFullscreen(false))
    }
  }, [])

  return {
    config,
    isCollapsible,
    items,
    itemsCustoms,
    itemsGift,
    open,
    someItemUnavailable,
    getCustomItem,
    handleClick,
    handleContinue,
    isCustomItem,
  }
}
