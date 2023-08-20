import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import EmailForm from '../EmailForm/EmailFormContainer'
import UserValidate from '../UserValidate'
import ViewValidate from '../ViewValidate'
import OrderPlaced from '../OrderPlaced'
import type { ItemToRemove, ResponseValidateItem } from '../../interfaces'
import { selectStep } from '../../contexts/global-context/reducers/checkoutFormSlice'
import SkuSelectorContainer from '../SkuSelector/SkuSelectorContainer'
import { selectItems as selectItemsSimulation } from '../../contexts/global-context/reducers/simulationSlice'
import {
  selectItems as selectItemsOrderForm,
  selectPackages,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import RemoveUnavailableProducts from '../RemoveUnavailableProducts/RemoveUnavailableProductsContainer'
import { existUnavailableProducts } from '../../utils/simulation'

interface Props {
  validateItems?: () => ResponseValidateItem[] | []
}

export const ModalSteps = ({ validateItems }: Props) => {
  const step = useSelector(selectStep)
  const itemsSimulation = useSelector(selectItemsSimulation)
  const itemsOrderForm = useSelector(selectItemsOrderForm)
  const [loading, setLoading] = useState(false)
  const [unavailableItems, setUnavailableItems] = useState<ItemToRemove[] | []>(
    []
  )

  const packages = useSelector(selectPackages)
  const existMultiplesPackages =
    packages?.length > 1 &&
    unavailableItems.length === 0 &&
    !loading &&
    !existUnavailableProducts(itemsSimulation)

  const getProductsNotMyCheckout = () => {
    if (!validateItems) return []

    const dataValidateItems = validateItems() || []
    const itemToRemove: ItemToRemove[] = []

    if (dataValidateItems.length > 0) {
      dataValidateItems.forEach((validateItem) => {
        const foundItem = itemsOrderForm.find(
          (item) => item.id === validateItem.id
        )

        if (foundItem?.id) {
          itemToRemove.push({
            quantity: 0,
            uniqueId: foundItem.uniqueId,
            ...validateItem,
          })
        }
      })
    }

    return itemToRemove
  }

  useEffect(() => {
    if (loading) return
    const productsNotMyCheckout = getProductsNotMyCheckout()
    let unavailableProducts: ItemToRemove[] = []

    if (itemsOrderForm?.length > 0) {
      unavailableProducts = itemsSimulation
        ?.filter(
          (item) =>
            item.availability !== 'available' &&
            item.availability !== 'cannotBeDelivered'
        )
        .map((item) => {
          const foundItem = itemsOrderForm.find(
            (itemOrderForm) => itemOrderForm.id === item.id
          )

          return {
            uniqueId: foundItem?.uniqueId,
            imageUrl: foundItem?.imageUrl,
            quantity: 0,
          }
        })
    }

    setUnavailableItems([...productsNotMyCheckout, ...unavailableProducts])
  }, [itemsSimulation, itemsOrderForm, loading])

  if (unavailableItems?.length > 0 || existMultiplesPackages) {
    return (
      <RemoveUnavailableProducts
        itemsToRemove={unavailableItems}
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 3000)
        }}
        screenToGoToCheckout={
          existMultiplesPackages
            ? 'multiplesPackages'
            : 'removeUnavailableProducts'
        }
      />
    )
  }

  switch (step) {
    case 0:
      return <SkuSelectorContainer />

    case 1:
      return <EmailForm />

    case 2:
      return <UserValidate />

    case 3:
      return <ViewValidate />

    case 4:
      return <ViewValidate />

    case 5:
      return <OrderPlaced />

    default: {
      return null
    }
  }
}
