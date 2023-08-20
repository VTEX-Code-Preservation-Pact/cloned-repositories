import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { selectOrderForm } from '../contexts/global-context/reducers/orderFormDataSlice'
import type { Card } from '../interfaces/orderForm'

const useAvailablePaymentMethods = () => {
  const {
    payments: { availableCards },
  } = useSelector(selectOrderForm)

  const availablePaymentMethods = useMemo(() => {
    const payments = availableCards
    const newPayments: Card[] = []
    let indexJ = 0

    for (let i = 0; i < payments.length; i++) {
      indexJ = i
      for (indexJ; indexJ < payments.length; indexJ++) {
        const primaryPos = payments[i]
        const secondaryPos = payments[indexJ]

        const cardPrimaryPos =
          primaryPos?.bin?.concat(primaryPos?.number) || null

        const cardSecondaryPos =
          secondaryPos?.bin?.concat(secondaryPos?.number) || null

        const isSecondaryOrigin =
          primaryPos?.origin &&
          primaryPos?.origin === 'store' &&
          !secondaryPos?.origin

        if (
          cardPrimaryPos &&
          cardSecondaryPos &&
          cardPrimaryPos === cardSecondaryPos &&
          isSecondaryOrigin
        ) {
          break
        }

        if (
          indexJ === payments.length - 1 &&
          (!primaryPos?.origin ||
            (primaryPos?.origin &&
              !newPayments.find(
                (item) => item?.bin?.concat(item.number) === cardPrimaryPos
              )))
        ) {
          newPayments.push(primaryPos)
        }
      }
    }

    return newPayments
  }, [availableCards])

  return { availablePaymentMethods }
}

export default useAvailablePaymentMethods
