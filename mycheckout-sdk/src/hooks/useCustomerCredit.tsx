import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

import { useUserData } from '../contexts/UserDataProvider'
import { VALIDATE_CREDIT } from '../graphql/queries'
import type { ICredit, ISimulationCredit } from '../interfaces'
import { selectProfile } from '../contexts/global-context/reducers/orderFormDataSlice'

export interface ISimulationCreditResponse {
  validateCredit?: {
    approvedCredit?: number
    maxInstallments?: number
  }
}

export const useCustomerCredit = () => {
  const { value } = useUserData()
  const { email } = useSelector(selectProfile)
  const [credit, setCredit] = useState<ICredit | null>(null)
  const [validateCredit, setValidate] = useState<boolean>(true)
  const [isCalled, setIsCalled] = useState<boolean>(false)
  const [canPayWithCredit, setCanPayWithCredit] = useState<boolean>(false)
  const [showMinMessage, setShowMinMessage] = useState<boolean>(false)
  const [simulationCredit, setSimulationCredit] =
    useState<ISimulationCredit | null>(null)

  const [validate] = useLazyQuery(VALIDATE_CREDIT, {
    fetchPolicy: 'network-only',
    onCompleted: (response: ISimulationCreditResponse) => {
      setCredit({
        credit: !!response?.validateCredit?.approvedCredit,
        approved: response?.validateCredit?.approvedCredit,
        installments: response?.validateCredit?.maxInstallments,
      })
      setValidate(false)
      setIsCalled(true)
    },
    onError: () => {},
  })

  useEffect(() => {
    if (credit) {
      setCanPayWithCredit(credit?.credit)
    }

    return () => {
      setCanPayWithCredit(null)
    }
  }, [credit])

  useEffect(() => {
    if (value < 100000) {
      return setSimulationCredit({
        quotaQuantity: 3,
        quotaValue: value / 3,
      })
    }

    if (value > 100000 && value < 1000000) {
      return setSimulationCredit({
        quotaQuantity: 12,
        quotaValue: value / 12,
      })
    }

    if (value > 1000001) {
      return setSimulationCredit({
        quotaQuantity: 24,
        quotaValue: value / 24,
      })
    }

    return () => {
      setSimulationCredit(null)
    }
  }, [value])

  const onSimulationCredit = useCallback(() => {
    email &&
      value &&
      validate({
        variables: {
          email,
          totals: value,
        },
      })
  }, [email, credit, value])

  const onChangePaymet = useCallback(() => {
    if (credit?.credit) return setShowMinMessage(true)
  }, [email, credit])

  return useMemo(
    () => ({
      credit,
      simulationCredit,
      validateCredit,
      canPayWithCredit,
      onSimulationCredit,
      isCalled,
      showMinMessage,
      onChangePaymet,
    }),
    [
      credit,
      simulationCredit,
      validateCredit,
      canPayWithCredit,
      onSimulationCredit,
      isCalled,
      showMinMessage,
      onChangePaymet,
    ]
  )
}
