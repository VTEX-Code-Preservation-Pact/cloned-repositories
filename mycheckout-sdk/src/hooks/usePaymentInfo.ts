import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { selectMainPayment } from '../contexts/global-context/reducers/orderFormDataSlice'
import { selectAvailablePaymentMethods } from '../contexts/global-context/reducers/simulationSlice'
import type { Card } from '../interfaces/orderForm'
import { selectIdImgCard } from '../utils/payments'

export const useCurrentPaymentMethod = (card?: Card) => {
  const selectedPayment = useSelector(selectMainPayment)
  const availablePaymentMethods = useSelector(selectAvailablePaymentMethods)

  const paymentInfo = useMemo(() => {
    const dataFranchise = selectIdImgCard(
      card ? card?.franchise : selectedPayment?.franchise
    )

    return availablePaymentMethods.find(
      (avPaymentMethod) =>
        avPaymentMethod.name.toLowerCase() === dataFranchise?.nameComplete
    )
  }, [availablePaymentMethods])

  return paymentInfo
}
