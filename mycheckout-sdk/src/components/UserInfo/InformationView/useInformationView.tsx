/* eslint-disable no-loop-func */
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectItemData } from '../../../contexts/global-context/reducers/cartSlice'
import {
  selectLoadingOrder,
  setUserRegistrationSections,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectDeliveryAddress,
  selectHasAddress,
  selectItems,
  selectLogisticsInfo,
  selectMainPayment,
  selectPickUpPointAddress,
  selectProfile,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import {
  selectAvailablePaymentMethods,
  selectTotalValue,
} from '../../../contexts/global-context/reducers/simulationSlice'
import {
  selectSettings,
  setVersion,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import {
  useUserData,
  useUserDataDispatch,
} from '../../../contexts/UserDataProvider'
import { useCustomerCredit } from '../../../hooks/useCustomerCredit'
import { useInitSecureFields } from '../../../hooks/useInitSecureFields'
import { useInputValue } from '../../../hooks/useInputValue'
import { useSelectValue } from '../../../hooks/useSelectValue'
import type { SelectValue } from '../../../interfaces'
import { arrayEquals } from '../../../utils'
import { clearNumber, selectIdImgCard } from '../../../utils/payments'
import type { Message } from '../../shared/interfaces/interfaces'
import { useBuyButton } from '../useBuyButton'

const messages = {
  dividePackages: 'store/checkoutless.summary.dividedPackage',
  productsNotAvailable: 'store/checkoutless.summary.productsNotAvailable',
}

export const useInformationView = () => {
  const { totalizers, slas } = useUserData()
  const value = useSelector(selectTotalValue)
  const dues: SelectValue = useSelectValue(null)
  const cvv = useInputValue('')
  const [dataLoad, setDataLoad] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState<Message>()
  const [isOpenAlertCvv, setIsOpenAlertCvv] = useState<boolean>(false)
  const toastWasShown = useRef(true)

  const gateway = localStorage.getItem('gateway')

  const { onSimulationCredit } = useCustomerCredit()
  const logisticsInfo = useSelector(selectLogisticsInfo)
  const { selectedItem } = useSelector(selectItemData)
  const itemsOrderForm = useSelector(selectItems)
  const addressAlternative = useSelector(selectPickUpPointAddress)

  // new Context
  const hasAddress = useSelector(selectHasAddress)
  const profile = useSelector(selectProfile)
  const selectedAddress = useSelector(selectDeliveryAddress)
  const selectedPayment = useSelector(selectMainPayment)

  const dispatchGlobal = useDispatch()
  const dispatchUserData = useUserDataDispatch()
  const { cvcRequired } = useSelector(selectSettings)
  const loadingOrder = useSelector(selectLoadingOrder)
  const paymentMethods = useSelector(selectAvailablePaymentMethods)

  const dataFranchise = selectIdImgCard(selectedPayment?.franchise)

  const {
    canBuy,
    forceDisabled,
    isValidCVC,
    paymentMessage,
    successAddressAlter,
    handleSubmit,
    setIsValidCVC,
  } = useBuyButton(dues, dataLoad)

  // TODO: Revisar como seleccionar el Payment System del comercio
  const installments =
    paymentMethods?.find(
      (payment) => payment?.name?.toLowerCase() === dataFranchise?.nameComplete
    )?.installmentsOptions || []

  const { loadPaymentForm } = useInitSecureFields(
    gateway,
    selectedPayment?.paymentMethod,
    cvcRequired
  )

  const validateShowAddress =
    !hasAddress ||
    !logisticsInfo ||
    (logisticsInfo?.length < 1 && !!selectedAddress) ||
    (logisticsInfo?.length > 0 &&
      logisticsInfo[0].selectedDeliveryChannel !== 'pickup-in-point') ||
    (logisticsInfo?.length > 0 &&
      logisticsInfo[0].selectedDeliveryChannel === 'pickup-in-point' &&
      !!selectedAddress &&
      logisticsInfo?.some(
        (item) => item.selectedDeliveryChannel === 'delivery'
      )) ||
    (logisticsInfo?.length === 0 && !selectedAddress && !!profile)

  const groupPackagesByItems = (packages: any[]) => {
    const groupPackages = {}
    let index = 0

    while (packages.length > 0) {
      groupPackages[index] = [packages.shift()]
      const filterItem = packages.filter((pack) =>
        arrayEquals(groupPackages[index][0].itemIndex, pack.itemIndex)
      )

      groupPackages[index] = groupPackages[index].concat(filterItem)
      packages = packages.filter(
        (pack) =>
          !arrayEquals(groupPackages[index][0].itemIndex, pack.itemIndex)
      )
      index++
    }

    return groupPackages
  }

  const validateWarningAddress =
    addressAlternative?.addressDeliveryType !== 'delivery' &&
    !!(!selectedAddress || Object.keys(selectedAddress).length === 0) &&
    logisticsInfo?.length > 0 &&
    logisticsInfo?.find((item) => item.selectedDeliveryChannel === 'delivery')

  const existProductsNotAvailable =
    itemsOrderForm.filter((item) => item.availability !== 'available').length >
    0

  useEffect(() => {
    const packages = groupPackagesByItems(
      slas.delivery.concat(slas['pickup-in-point'])
    )

    const packageKeys = Object.keys(packages)

    const existMultiplePackages = packageKeys?.length > 1
    const showToastDividedPackage = localStorage.getItem(
      'show_toast_divided_package'
    )

    const shouldShowToast = showToastDividedPackage !== 'true'

    if (!shouldShowToast && packageKeys.length < 2) {
      localStorage.removeItem('show_toast_divided_package')
      setShowToast(false)
      setToastMessage(null)

      return
    }

    if (
      !existMultiplePackages ||
      !toastWasShown.current ||
      !shouldShowToast ||
      itemsOrderForm.length === 0
    ) {
      return
    }

    toastWasShown.current = false
    setShowToast(true)
    setToastMessage({
      type: 'info',
      header: messages.dividePackages,
      text: existProductsNotAvailable
        ? messages.productsNotAvailable
        : undefined,
    })
    localStorage.setItem('show_toast_divided_package', 'true')
  }, [slas.delivery, slas['pickup-in-point']])

  useEffect(() => {
    if (
      !existProductsNotAvailable ||
      !toastMessage?.header ||
      toastMessage?.text ||
      !showToast
    ) {
      return
    }

    setToastMessage({
      ...toastMessage,
      text: messages.productsNotAvailable,
    })
  }, [toastMessage, itemsOrderForm, existProductsNotAvailable])

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

  const onChangeCvv = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.target.value = clearNumber(e.target.value)
    if (e.target.value.length >= 3) {
      cvv.setIsValid(true)
      setIsValidCVC(true)
    }

    setIsOpenAlertCvv(false)
    cvv.onChange(e)
  }

  const onBlurCvv = () => {
    const isValid = cvv.value.length >= 3

    setIsOpenAlertCvv(false)

    cvv.setIsValid(isValid)
    setIsValidCVC(isValid)
  }

  const onCloseToast = () => {
    setShowToast(false)
    setToastMessage(null)
  }

  const onRenderCvvContainer = () => setDataLoad(true)

  useEffect(() => {
    if (selectedPayment?.paymentMethod === 'BNPL' && totalizers.length) {
      const shipping = !!totalizers.find((e) => e.id === 'Shipping')

      shipping && onSimulationCredit()
    }
  }, [selectedPayment, value, totalizers])

  useEffect(() => {
    dispatchUserData({
      type: 'SET_LITEVIEW_HEADER',
      args: true,
    })
    // Restores the registration steps
    dispatchGlobal(setUserRegistrationSections(1))

    return () => {
      dispatchGlobal(setVersion(true))
    }
  }, [])

  const handleOpenAlertCvv = (_cvv: boolean) => {
    selectedPayment?.paymentMethod === 'tc' && !_cvv && setIsOpenAlertCvv(true)
  }

  const handleCloseAlertCvv = () => {
    setIsOpenAlertCvv(false)
  }

  return {
    canBuy,
    cvcRequired,
    cvv,
    dues,
    forceDisabled,
    gateway,
    installments,
    isOpenAlertCvv,
    isValidCVC,
    items: itemsOrderForm,
    loadingOrder,
    loadPaymentForm,
    paymentData: selectedPayment,
    paymentMessage,
    profile,
    selectedAddress,
    selectedItem,
    showToast,
    successAddressAlter,
    toastMessage,
    validateShowAddress,
    validateWarningAddress,
    dispatchGlobal,
    handleCloseAlertCvv,
    handleOpenAlertCvv,
    handleSubmit,
    onBlurCvv,
    onChangeCvv,
    onCloseToast,
    onRenderCvvContainer,
  }
}
