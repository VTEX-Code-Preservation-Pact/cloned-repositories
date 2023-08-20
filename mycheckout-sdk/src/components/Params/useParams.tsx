import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { setErrorOrder } from '../../contexts/global-context/reducers/checkoutFormSlice'
import { openModal } from '../../contexts/global-context/reducers/modalSlice'
import { PAYMENT_PROCESS_STATUS } from '../../graphql/queries'
import constants from '../../utils/constants'
import { useUserData } from '../../contexts/UserDataProvider'
import type { Item } from '../../interfaces'
import { useActions } from '../../contexts/ActionsProviderV2'

export const useParams = () => {
  const { items } = useUserData()
  const { clearData } = useActions()
  const dispatchGlobal = useDispatch()
  const [showParams, setShowParams] = useState<string>('')
  const [OrderId, setOrderId] = useState<string>('')

  const setErrorGlobal = (state: boolean) => {
    setShowParams('')
    dispatchGlobal(setErrorOrder(state))
    // setError("store/checkoutless.register.card.numberError")
    dispatchGlobal(openModal())
  }

  const [paymentProcess] = useLazyQuery(PAYMENT_PROCESS_STATUS, {
    onCompleted: (data) => {
      if (!data && !data.getPaymentProcessStatus) return setErrorGlobal(true)
      if (data.getPaymentProcessStatus.status) {
        setShowParams('')
        const itemsToRemove = items?.map((item: Item) => {
          return {
            uniqueId: item.uniqueId,
            quantity: 0,
          }
        })

        clearData(itemsToRemove)
        window.location.href = `${
          constants.ORDER_PLACED_LINK + OrderId
        }/Success`
      } else {
        const { search } = window.location
        const params = new URLSearchParams(search)
        const orderId = params.get('orderId')

        const persistedData = JSON.parse(
          localStorage.getItem('checkoutless_data')
        )

        const lastError = JSON.parse(
          localStorage.getItem('checkoutless_error') || '{}'
        )

        if (!lastError?.orderId || lastError?.orderId !== orderId) {
          localStorage.setItem(
            'checkoutless_error',
            JSON.stringify({
              message: data.getPaymentProcessStatus.message,
              orderId: OrderId,
              email: persistedData?.email,
            })
          )

          setErrorGlobal(true)
        }
      }
    },
    onError: () => {
      setShowParams('')
      setErrorGlobal(true)
    },
  })

  useMemo(() => {
    const lastError = JSON.parse(
      localStorage.getItem('checkoutless_error') || '{}'
    )

    const { search } = window.location
    const params = new URLSearchParams(search)
    const gateway = params.get('gateway')
    const source = params.get('source')

    if (gateway) localStorage.setItem('gateway', gateway)

    if (source && source === 'mycheckout') {
      const action = params.get('action')

      if (action && action === 'payment') {
        const orderId = params.get('orderId')

        if (lastError?.email && lastError?.orderId === orderId) return
        if (orderId) {
          setOrderId(orderId)
          setShowParams('load')
          paymentProcess({
            variables: {
              orderId,
            },
          })
        }
      }
    }
  }, [])

  return {
    showParams,
  }
}
