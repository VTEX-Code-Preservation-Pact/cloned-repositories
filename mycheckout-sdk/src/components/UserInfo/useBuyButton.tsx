import { pathOr } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  selectIsMobile,
  selectSettings,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useUserData } from '../../contexts/UserDataProvider'
import { useCreateAddressExternal } from '../../hooks/useCreateAddressExternal'
import { useCustomerCredit } from '../../hooks/useCustomerCredit'
import { useInitSecureFields } from '../../hooks/useInitSecureFields'
import { usePCIScript } from '../../hooks/usePCIScript'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import type {
  DataPCIChange,
  DataPCISuccess,
  SelectValue,
} from '../../interfaces'
import { selectLoadingOrder } from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectDeliveryAddress,
  selectItems,
  selectLogisticsInfo,
  selectMainPayment,
  selectPickUpPointAddress,
  selectProfile,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import { useFonts } from '../../hooks/useFonts'
import { selectTotalValue } from '../../contexts/global-context/reducers/simulationSlice'

export const useBuyButton = (dues?: SelectValue, dataLoad?: boolean) => {
  const [isValidCVC, setIsValidCVC] = useState(null)
  const [secureFields, setSecureFields] = useState(null)
  const [successCallback, setSuccessCallback] = useState(null)
  const [onNodesChange, setOnNodesChange] = useState(false)
  const loadingOrder = useSelector(selectLoadingOrder)
  const [paymentMessage, setPaymentMessage] = useState({
    message: '',
    translate: false,
    isPromisoy: false,
    isLoaded: false,
  })

  const { paymentData } = useUserData()
  const value = useSelector(selectTotalValue)
  const items = useSelector(selectItems)
  const logisticsInfo = useSelector(selectLogisticsInfo)
  const addressAlternative = useSelector(selectPickUpPointAddress)
  const selectedAddress = useSelector(selectDeliveryAddress)
  const paymentSelected = useSelector(selectMainPayment)
  const profile = useSelector(selectProfile)

  const { merchantID } = usePCIScript()
  const { credit } = useCustomerCredit()
  const dispatchActions = useActionsDispatch()

  const { cvcRequired, isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)

  const { createAddressExternal, successAddressAlter } =
    useCreateAddressExternal()

  const gateway = localStorage.getItem('gateway')
  const placeholder = {
    cvv: 'CVV',
  }

  const { loadPaymentForm } = useInitSecureFields(
    gateway,
    paymentSelected?.paymentMethod,
    cvcRequired
  )

  const handleSubmitFunction = (handleClick?: () => void) => {
    if (handleClick) setSuccessCallback(() => handleClick)

    secureFields?.submit()
    setIsValidCVC(null)
  }

  const { fonts } = useFonts()

  useEffect(() => {
    if (secureFields) {
      secureFields.on('success', (data: DataPCISuccess) => {
        if (data.transactionId) {
          successCallback(data.transactionId)
        }
      })
    }
  }, [successCallback])

  useEffect(() => {
    const addressAlter = addressAlternative

    // eslint-disable-next-line vtex/prefer-early-return
    if (
      addressAlter &&
      addressAlter?.addressDeliveryType === 'delivery' &&
      (addressAlter?.id !== '' || addressAlter?.id)
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
  }, [addressAlternative])

  useEffect(() => {
    const targetNode = document.getElementById(`cvv-container`)
    const observerOptions = {
      childList: true,
      attributes: false,
      subtree: true,
    }

    const observer = new MutationObserver((mutations: any) => {
      mutations.forEach((mutation: any) => {
        const newNodes = mutation.addedNodes

        newNodes.forEach((node: any) => {
          const targetPlaceholder = document.getElementById(`cvv-placeholder`)

          if (node.tagName === 'DIV' && targetPlaceholder) {
            setOnNodesChange(!onNodesChange)
          }
        })
      })
    })

    if (targetNode) observer.observe(targetNode, observerOptions)

    return () => {}
  }, [])

  useEffect(() => {
    if (
      paymentMessage?.isLoaded &&
      (paymentMessage?.isPromisoy || paymentMessage?.translate)
    ) {
      dispatchActions({
        type: 'SET_IS_LOADING_CVV_FIELD',
        args: false,
      })
    }
  }, [paymentMessage])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (
      loadPaymentForm &&
      items?.length &&
      paymentSelected?.paymentMethod === 'tc'
    ) {
      const targetNode = document.getElementById(`cvv-placeholder`)

      if (targetNode) {
        dispatchActions({
          type: 'SET_IS_LOADING_CVV_FIELD',
          args: true,
        })
        const sf = new SecureFields()

        sf?.initTokenize(
          merchantID,
          {
            cvv: {
              placeholderElementId: `cvv-placeholder`,
              inputType: 'tel',
            },
          },
          {
            '*': `font-family: ${fonts}`,
          }
        )

        const stylesCvv = {
          colorCvv: 'color: #757575',
          paddingLeft: '5px',
          fontFamily: `font-family: ${fonts}`,
        }

        sf.on('ready', () => {
          dispatchActions({
            type: 'SET_IS_LOADING_CVV_FIELD',
            args: false,
          })
          sf.setPlaceholder('cvv', placeholder.cvv)
          sf.setStyle('cvv', stylesCvv.colorCvv)
          sf.setStyle('cvv', stylesCvv.fontFamily)
          sf.setStyle('cvv', stylesCvv.paddingLeft)
          sf.setStyle('cvv::placeholder', stylesCvv.colorCvv)
          sf.setStyle('cvv:focus', 'outline: 0')
        })

        const cvvContainer = document.getElementById(`cvv-container-inside`)

        cvvContainer.addEventListener('click', () => sf.focus('cvv'))

        sf?.on('change', (data: DataPCIChange) => {
          const { event, fields } = data

          if (event.field === 'cvv') {
            if (
              event.type === 'blur' &&
              (fields.cvv.length === 0 || !fields.cvv.valid)
            ) {
              setIsValidCVC(false)
            }

            if (fields.cvv.valid) {
              setIsValidCVC(true)
              if (isLiteVersion && isMobile) {
                sf.setStyle('cvv', 'color: #011D1A')
              }
            }
          }
        })

        setSecureFields(sf)
      }
    } else {
      dispatchActions({
        type: 'SET_IS_LOADING_CVV_FIELD',
        args: false,
      })
    }
  }, [loadPaymentForm, onNodesChange, dataLoad, loadingOrder])

  useEffect(() => {
    const paymentMethod = {
      paymentMethod: paymentSelected?.paymentMethod || 'tc',
      number: paymentSelected?.number || '',
    }

    const paymentSystems = pathOr([], ['paymentSystems'], paymentData)

    if (paymentMethod?.paymentMethod === 'tc' && isLiteVersion && isMobile) {
      return setPaymentMessage({
        message: `${paymentSelected?.franchise} *** ${paymentMethod?.number}`,
        translate: false,
        isPromisoy: false,
        isLoaded: true,
      })
    }

    if (paymentMethod?.paymentMethod === 'tc') {
      return setPaymentMessage({
        message: `*** *** *** ${paymentMethod?.number}`,
        translate: false,
        isPromisoy: false,
        isLoaded: true,
      })
    }

    if (paymentMethod?.paymentMethod === 'BNPL') {
      return setPaymentMessage({
        message: `Orion`,
        translate: true,
        isPromisoy: false,
        isLoaded: true,
      })
    }

    if (paymentMethod?.paymentMethod === 'promissory') {
      return setPaymentMessage({
        message: ``,
        translate: true,
        isPromisoy: true,
        isLoaded: true,
      })
    }

    const payment = paymentSystems.find(
      (p) => p?.stringId === paymentMethod?.paymentMethod
    )

    const paymentName = pathOr('', ['name'], payment)

    if (paymentName) {
      dispatchActions({
        type: 'SET_IS_LOADING_CVV_FIELD',
        args: false,
      })
      setPaymentMessage({
        message: pathOr('', ['name'], payment),
        translate: false,
        isPromisoy: false,
        isLoaded: true,
      })
    }
  }, [paymentData, paymentSelected])

  const handleSubmit =
    paymentSelected?.paymentMethod === 'tc' &&
    cvcRequired &&
    paymentSelected.gateway !== 'paymentez'
      ? handleSubmitFunction
      : null

  const validationCanBuy =
    (isValidCVC && dues?.value?.value !== '') ||
    (!cvcRequired && dues?.value?.value !== '') ||
    (paymentSelected && paymentSelected?.paymentMethod !== 'tc')

  // Validaciones de direccion alternativa en metodo compra y recoge
  const validatationsAddressAlterPickup = () => {
    return (!selectedAddress || Object.keys(selectedAddress)?.length === 0) &&
      logisticsInfo?.some((item) => item.selectedDeliveryChannel === 'delivery')
      ? false
      : validationCanBuy
  }

  const canBuy =
    addressAlternative && addressAlternative?.addressDeliveryType !== 'delivery'
      ? validatationsAddressAlterPickup()
      : validationCanBuy

  const forceDisabled =
    !paymentSelected?.paymentMethod ||
    (paymentSelected?.paymentMethod === 'BNPL' &&
      credit &&
      credit?.approved < value)

  return {
    canBuy,
    forceDisabled,
    isValidCVC,
    paymentMessage,
    successAddressAlter,
    handleSubmit,
    setIsValidCVC,
    setSecureFields,
  }
}
