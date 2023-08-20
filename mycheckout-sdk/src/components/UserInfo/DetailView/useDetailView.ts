import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectItemData } from '../../../contexts/global-context/reducers/cartSlice'
import {
  selectLoadingOrder,
  selectSection,
  setNextSection,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectItems,
  selectMainPayment,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { selectTotalValue } from '../../../contexts/global-context/reducers/simulationSlice'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import {
  useUserData,
  useUserDataDispatch,
} from '../../../contexts/UserDataProvider'
import { useCustomerCredit } from '../../../hooks/useCustomerCredit'
import { useInitSecureFields } from '../../../hooks/useInitSecureFields'
import { useInputValue } from '../../../hooks/useInputValue'
import { useSelectValue } from '../../../hooks/useSelectValue'
import type { Installment, Item, SelectValue } from '../../../interfaces'
import { clearNumber, selectIdImgCard } from '../../../utils/payments'
import { useBuyButton } from '../useBuyButton'

export const useDetailView = () => {
  const gateway = localStorage.getItem('gateway')
  const [dataLoad, setDataLoad] = useState(false)

  const dues: SelectValue = useSelectValue(null)
  const cvv = useInputValue('')

  const { clientProfileData, paymentData, totalizers } = useUserData()
  const value = useSelector(selectTotalValue)
  const section = useSelector(selectSection)
  const selectedPaymentMethod = useSelector(selectMainPayment)

  const { onSimulationCredit } = useCustomerCredit()
  const { handleSubmit, canBuy, forceDisabled, isValidCVC, setIsValidCVC } =
    useBuyButton(dues, dataLoad)

  const { selectedItem } = useSelector(selectItemData)
  const { cvcRequired } = useSelector(selectSettings)
  const loadingOrder = useSelector(selectLoadingOrder)
  const items = useSelector(selectItems)

  const dataFranchise = selectIdImgCard(selectedPaymentMethod?.franchise)

  const installments: Installment[] =
    paymentData?.installmentOptions?.find(
      (x) => x?.paymentName?.toLowerCase() === dataFranchise?.nameComplete
    )?.installments || []

  const onChangeCvv = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.target.value = clearNumber(e.target.value)
    if (e.target.value.length >= 3) {
      cvv.setIsValid(true)
      setIsValidCVC(true)
    }

    cvv.onChange(e)
  }

  const onBlurCvv = () => {
    const isValid = cvv.value.length >= 3

    cvv.setIsValid(isValid)
    setIsValidCVC(isValid)
  }

  const dispatchGlobal = useDispatch()
  const dispatchUserData = useUserDataDispatch()

  const { loadPaymentForm } = useInitSecureFields(
    gateway,
    selectedPaymentMethod?.paymentMethod,
    cvcRequired
  )

  useEffect(() => {
    const dueCount =
      installments.length > 0 ? installments[0].count.toString() : ''

    const defaultDue = dueCount
      ? {
          label: dueCount,
          value: dueCount,
        }
      : null

    dues.setValue(defaultDue)
  }, [installments])

  useEffect(() => {
    if (selectedPaymentMethod?.paymentMethod === 'BNPL' && totalizers?.length) {
      const shipping = !!totalizers.find((e) => e.id === 'Shipping')

      shipping && onSimulationCredit()
    }
  }, [selectedPaymentMethod, value, totalizers])

  useEffect(() => {
    if (items?.length) setDataLoad(true)

    const itemsWithoutStock = items.filter(
      (item: Item) => item.availability !== 'available'
    )

    if (itemsWithoutStock.length && section !== 'summary') {
      dispatchGlobal(setNextSection('summary'))
    }
  }, [items])

  useEffect(() => {
    dispatchUserData({
      type: 'SET_LITEVIEW_HEADER',
      args: false,
    })
  }, [])

  return {
    canBuy,
    clientProfileData,
    cvcRequired,
    cvv,
    dues,
    forceDisabled,
    installments,
    isValidCVC,
    items,
    loadingOrder,
    loadPaymentForm,
    selectedPaymentMethod,
    selectedItem,
    dispatchGlobal,
    handleSubmit,
    onBlurCvv,
    onChangeCvv,
  }
}
