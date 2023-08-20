import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from '../../contexts/global-context/reducers/modalSlice'
import { useActions } from '../../contexts/ActionsProviderV2'
import type { Item } from '../../interfaces'
import {
  selectItems,
  selectMainPayment,
  setNewOrderform,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import {
  resetFlow,
  setUserRegistrationSections,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import { resetSimulation } from '../../contexts/global-context/reducers/simulationSlice'

export const useOrderPlaced = () => {
  const selectedPaymentMethod = useSelector(selectMainPayment)
  const items = useSelector(selectItems)
  const { clearData, redirectUrl } = useActions()
  const dispatchGlobal = useDispatch()

  const status = useMemo(() => {
    if (
      selectedPaymentMethod?.paymentMethod === 'tc' ||
      selectedPaymentMethod?.bin
    ) {
      return 'pending'
    }

    return 'approved'
  }, [selectedPaymentMethod])

  useEffect(() => {
    const itemsToRemove = items?.map((item: Item) => {
      return {
        uniqueId: item.uniqueId,
        quantity: 0,
      }
    })

    if (redirectUrl) {
      setTimeout(() => {
        window.location.replace(redirectUrl)
      }, 3000)
    } else {
      clearData(itemsToRemove)
      setTimeout(() => {
        dispatchGlobal(closeModal())
        dispatchGlobal(resetFlow())
        dispatchGlobal(setNewOrderform({ noDeleteEmail: true }))
        dispatchGlobal(resetSimulation())
      }, 3000)
    }

    dispatchGlobal(setUserRegistrationSections(1))
  }, [])

  return { status }
}
