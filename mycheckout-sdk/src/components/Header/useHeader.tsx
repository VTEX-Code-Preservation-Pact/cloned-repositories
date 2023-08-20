import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import constants from '../../utils/constants'
import { useUserDataDispatch } from '../../contexts/UserDataProvider'
import { minimizeModal } from '../../contexts/global-context/reducers/modalSlice'
import {
  resetFlow,
  selectFormAction,
  selectLoadingOrder,
  selectPaymentDataSection,
  selectSection,
  selectStep,
  selectUserRegistrationSections,
  setErrorOrder,
  setFormAction,
  setPaymentDataSection,
  setPreviousUserRegistrationSections,
  setPrevSection,
  setPrevStep,
  setStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  setNewOrderform,
  setRestorePayment,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import { useCurrentPaymentMethod } from '../../hooks/usePaymentInfo'
import { resetSimulation } from '../../contexts/global-context/reducers/simulationSlice'
import useAvailablePaymentMethods from '../../hooks/useAvailablePaymentMethods'

interface Props {
  clearOrderFormProfile: () => void
}

const useHeader = (props: Props) => {
  const { clearOrderFormProfile } = props
  const dispatchGlobal = useDispatch()
  const [hideBackArrow, setHideBackArrow] = useState(false)

  const currentPaymentMethod = useCurrentPaymentMethod()

  const loadingOrder = useSelector(selectLoadingOrder)
  const step = useSelector(selectStep)
  const userRegistrationSections = useSelector(selectUserRegistrationSections)
  const section = useSelector(selectSection)
  const paymentSection = useSelector(selectPaymentDataSection)
  const formAction = useSelector(selectFormAction)
  const { availablePaymentMethods } = useAvailablePaymentMethods()

  const dispatchUserData = useUserDataDispatch()

  useEffect(() => {
    setHideBackArrow(step > 1)
  }, [step])

  const handleMinimize = () => {
    localStorage.setItem('minimize_modal', 'true')
    localStorage.removeItem('automatically_login_user')
    localStorage.removeItem('show_toast_divided_package')

    dispatchGlobal(minimizeModal())
    dispatchGlobal(setErrorOrder(null))

    if (step === constants.lastStep) {
      dispatchGlobal(resetFlow())
    }
  }

  const onClick = () => {
    if (userRegistrationSections > 1) {
      if (step === 3) {
        dispatchGlobal(setStep(2))
      } else {
        dispatchGlobal(setPreviousUserRegistrationSections())
      }

      return
    }

    dispatchUserData({
      type: 'SET_CHANGE_INFO',
      args: {
        isEdit: false,
        isNewInfo: false,
        userLocation: false,
        isChangeEmail: step === 2,
      },
    })
    dispatchGlobal(setFormAction('none'))
    dispatchGlobal(
      setRestorePayment({ paymentId: currentPaymentMethod?.id || '' })
    )

    if (step - 1 === 1) {
      clearOrderFormProfile()
      localStorage.removeItem('checkoutless_data')
      localStorage.setItem('automatically_login_user', 'false')
      localStorage.removeItem('show_toast_divided_package')

      dispatchGlobal(setNewOrderform())
      dispatchGlobal(resetSimulation())
    }

    if (step === 4 && section === 'summary') {
      dispatchGlobal(setPrevSection())
    }

    if (step === 3 && section === 'paymentData' && formAction === 'add') {
      if (paymentSection === 'list') {
        dispatchGlobal(setFormAction('none'))
        if (availablePaymentMethods?.length === 0) {
          dispatchGlobal(setPrevStep())
        }
      }

      if (paymentSection === 'details') {
        dispatchGlobal(setPaymentDataSection('list'))
        dispatchGlobal(setFormAction('add'))
      }

      return
    }

    dispatchGlobal(setPrevStep())
  }

  return {
    hideBackArrow,
    loadingOrder,
    handleMinimize,
    onClick,
  }
}

export default useHeader
