import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActions } from '../../contexts/ActionsProviderV2'
import {
  selectSettings,
  setIsFullscreen,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useCreateAddressExternal } from '../../hooks/useCreateAddressExternal'
import { usePCIScript } from '../../hooks/usePCIScript'
import { useScript } from '../../hooks/useScript'
import {
  selectLoadingOrder,
  selectUserRegistrationSections,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import constants from '../../utils/constants'
import {
  selectAddressStore,
  selectHasAddress,
  selectIsProfileComplete,
  selectItems,
  selectProfile,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import {
  selectSimulationLogistics,
  selectSimulationStatus,
} from '../../contexts/global-context/reducers/simulationSlice'

const useRegisterForm = () => {
  const dispatchGlobal = useDispatch()
  const { handleGetDocumentsClient } = useActions()
  const loadingOrder = useSelector(selectLoadingOrder)
  const userRegistrationSections = useSelector(selectUserRegistrationSections)
  const simulationStatus = useSelector(selectSimulationStatus)
  const profile = useSelector(selectProfile)
  const profileComplete = useSelector(selectIsProfileComplete)
  const addressAlternative = useSelector(selectAddressStore)
  const items = useSelector(selectItems)
  const logisticsInfo = useSelector(selectSimulationLogistics)
  const hasAddress = useSelector(selectHasAddress)

  const { PCI_PROXY_SCRIPT } = usePCIScript()

  const { additionalData } = useSelector(selectSettings)

  const { sandbox } = useActions()
  const [isPickupPoint, setIsPickupPoint] = useState(false)

  const [steps, setSteps] = useState({
    profile: false,
    shipping: false,
    logistic: false,
    payment: false,
  })

  const [loadPaymentForm, setLoadPaymentForm] = useState(false)

  const { createAddressExternal, successAddressAlter, setSuccessAddressAlter } =
    useCreateAddressExternal()

  const gateway = localStorage.getItem('gateway')

  const isLogisticPickupPoint =
    logisticsInfo?.length > 0 &&
    logisticsInfo[0].selectedDeliveryChannel === 'pickup-in-point'

  const isAddressResidential =
    addressAlternative?.addressDeliveryType === 'delivery'

  const isAddressPickupPoint =
    addressAlternative?.addressDeliveryType === 'pickup'

  const showEditButtonAddress =
    !addressAlternative ||
    isAddressResidential ||
    (isAddressPickupPoint &&
      isLogisticPickupPoint &&
      logisticsInfo?.some(
        (item) => item.selectedDeliveryChannel === 'delivery'
      ))

  const validateAddressPickup = isAddressPickupPoint && isLogisticPickupPoint

  const validateTriggerPayment = isAddressPickupPoint
    ? !validateAddressPickup
    : !hasAddress

  useEffect(() => {
    setSteps({
      profile: userRegistrationSections === 1,
      shipping: isPickupPoint ? false : userRegistrationSections === 2,
      logistic: isPickupPoint
        ? userRegistrationSections === 2
        : userRegistrationSections === 3,
      payment: isPickupPoint
        ? userRegistrationSections >= 3
        : userRegistrationSections >= 4,
    })
  }, [userRegistrationSections, isPickupPoint])

  useEffect(() => {
    if (
      addressAlternative &&
      addressAlternative?.addressDeliveryType === 'pickup' &&
      logisticsInfo?.length > 0 &&
      !logisticsInfo?.find(
        (item) => item.selectedDeliveryChannel === 'delivery'
      ) &&
      profileComplete
    ) {
      if (steps.shipping) {
        setIsPickupPoint(true)
        setSteps({
          profile: false,
          shipping: false,
          logistic: true,
          payment: false,
        })
      }

      setSuccessAddressAlter(true)
      setTimeout(() => {
        setSuccessAddressAlter(false)
      }, 3000)
    }
  }, [logisticsInfo, profileComplete, addressAlternative, steps])

  useEffect(() => {
    const addressAlter = addressAlternative

    if (
      addressAlter &&
      addressAlter?.addressDeliveryType === 'delivery' &&
      (addressAlter?.id !== '' || addressAlter?.id) &&
      profileComplete
    ) {
      let dataForCreate: any = {
        addressId: addressAlter?.id,
        profileId: profile.id,
      }

      if (
        !addressAlter?.city?.includes('*') ||
        !addressAlter?.postalCode?.includes('*')
      ) {
        dataForCreate = {
          ...dataForCreate,
          country: addressAlter?.country,
          state: addressAlter?.state,
          city: addressAlter?.city,
          street: addressAlter?.street,
          number: addressAlter?.number,
          postalCode: addressAlter?.postalCode,
          receiverName: addressAlter?.receiverName || '',
          geoCoordinates: addressAlter?.geoCoordinates,
          neighborhood: addressAlter?.neighborhood || '',
          reference: addressAlter?.reference,
        }
      }

      createAddressExternal({
        variables: { args: dataForCreate },
      })
    }
  }, [profileComplete])

  useEffect(() => {
    dispatchGlobal(setIsFullscreen(true))

    return () => {
      dispatchGlobal(setIsFullscreen(false))
    }
  }, [])

  useEffect(() => {
    // TODO: eliminar PCI al terminar la transición
    if (additionalData?.paymentez === 'true') {
      if (gateway === 'noop' || gateway === null || gateway === 'creditpay') {
        if (!(window as any).PaymentezLoad) {
          useScript(
            constants.JQUERY_SCRIPT[0],
            constants.JQUERY_SCRIPT[1]
          ).then(() => {
            useScript(
              constants.PAYMENTEZ_SCRIPT[0],
              constants.PAYMENTEZ_SCRIPT[1]
            ).then(() => {
              // eslint-disable-next-line prettier/prettier
              ;(window as any).PaymentezLoad = true
              Payment.init(
                ...constants.PAYMENTEZ_CREDENTIALS[sandbox ? 'stg' : 'prod']
              )
              setLoadPaymentForm(true)
            })
          })
        }

        if ((window as any).PaymentezLoad && !loadPaymentForm) {
          setLoadPaymentForm(true)
        }
      }
    } else if (
      gateway === 'noop' ||
      gateway === null ||
      gateway === 'creditpay'
    ) {
      if (!(window as any).SecureFieldsLoad) {
        useScript(PCI_PROXY_SCRIPT[0], PCI_PROXY_SCRIPT[1])
          .then(() => {
            ;(window as any).SecureFieldsLoad = true
            setLoadPaymentForm(true)
          })
          .catch((err) => {
            console.error('ERROR', err)
            setLoadPaymentForm(true)
          })
      }

      if ((window as any).SecureFieldsLoad && !loadPaymentForm) {
        setLoadPaymentForm(true)
      }
    }
  }, [])

  useEffect(() => {
    dispatchGlobal(setIsFullscreen(!loadingOrder))
  }, [loadingOrder])

  useEffect(() => {
    dispatchGlobal(setIsFullscreen(items.length > 0))
  }, [items])

  return {
    gateway,
    isPickupPoint,
    items,
    loadingOrder,
    loadPaymentForm,
    showEditButtonAddress,
    steps,
    successAddressAlter,
    validateTriggerPayment,
    handleGetDocumentsClient,
    setSteps,
    profile,
    logisticsInfo,
    simulationStatus,
  }
}

export default useRegisterForm
