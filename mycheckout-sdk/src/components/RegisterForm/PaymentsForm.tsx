/* eslint-disable vtex/prefer-early-return */
/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react'
import Payment from 'payment'
import { pathOr } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { useInputValue } from '../../hooks/useInputValue'
import { formatter, regularExpressions } from '../../utils'
import { Alert, Button, Input } from '../shared'
import vtexStyles from './vtex-styles.module.css'
import kuikpayStyles from './kuikpay-styles.module.css'
import genericStyles from './generic-styles.module.css'
import useFormatMessage from '../../i18n/useFormatMessage'
import { useValidateStyles } from '../../hooks/useValidateStyles'
import InputCard from './InputCard'
import { useUnits } from '../../hooks/useUnits'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import { InputCVCSF } from '../UserInfo/InputCVC'
import {
  useUserData,
  useUserDataDispatch,
} from '../../contexts/UserDataProvider'
import {
  clearNumber,
  formatExpiryDate,
  selectIdImgCard,
} from '../../utils/payments'
import type {
  DataPCIChange,
  DataPCIGetCardInfo,
  DataPCISuccess,
  PaymentForm,
  SelectValue,
} from '../../interfaces'
import {
  selectTheme,
  selectIsMobile,
  selectSettings,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { selectItemData } from '../../contexts/global-context/reducers/cartSlice'
import { usePCIScript } from '../../hooks/usePCIScript'
import CouponContainer from '../Coupon/CouponContainer'
import {
  selectMainPayment,
  selectItems,
  setCardBin,
  setCardInfo,
  setPaymetId,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import type { InstallmentOptionsSimulation } from '../../interfaces/simulation'
import { useSelectValue } from '../../hooks/useSelectValue'
import { SelectDues } from '../UserInfo/SelectDues'
import { useFonts } from '../../hooks/useFonts'
import { selectTotalValue } from '../../contexts/global-context/reducers/simulationSlice'

const beforeOfChangeDocument = (val: string) => {
  return clearNumber(val)
}

const beforeOfChangeExpiryDate = (val: string) => {
  return formatExpiryDate(val)
}

const PaymentsForm = ({
  disabled,
  error,
  handlePayment,
  payments,
  selectedCard,
  setError,
  handledPaymentDisabled,
  setFranchiseImg,
}: PaymentForm) => {
  const dispatchUserData = useUserDataDispatch()
  const [secureFields, setSecureFields] = useState(null)
  const [isValidCard, setIsValidCard] = useState(null)
  const [IsValidFranchise, setIsValidFranchise] = useState(true)
  const [isValidCVC, setIsValidCVC] = useState(null)
  const [imgCard, setImgCard] = useState(null)
  const [lastDigits, setLastDigits] = useState(null)
  const [installments, setInstallments] = useState<
    InstallmentOptionsSimulation[]
  >([])

  const { selectedItem } = useSelector(selectItemData)
  const selectedPayment = useSelector(selectMainPayment)
  const items = useSelector(selectItems)

  const { paymentData, totalOfferings } = useUserData()
  const value = useSelector(selectTotalValue)

  const dispatchGlobal = useDispatch()

  const dispatchActions = useActionsDispatch()
  const { merchantID } = usePCIScript()
  const theme = useSelector(selectTheme)
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const name = useInputValue('')
  const identification = useInputValue('', beforeOfChangeDocument)
  const expiryDate = useInputValue('', beforeOfChangeExpiryDate)
  const dues: SelectValue = useSelectValue(null)
  const units = useUnits(items)
  const globalStyles = useValidateStyles(true)
  const { fonts } = useFonts()

  const isDisabled = !(
    name.isValid &&
    identification.isValid &&
    dues.isValid &&
    expiryDate.isValid &&
    isValidCard &&
    isValidCVC
  )

  let styles = kuikpayStyles

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  const onBlurExpiryDate = () => {
    const { value: expiryValue, setIsValid } = expiryDate

    if (
      expiryValue === '' ||
      expiryValue.length < 5 ||
      !Payment?.fns?.validateCardExpiry(expiryValue)
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const onChangeExpiryDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { setIsValid, onChange } = expiryDate

    if (e.target.value === '') {
      setIsValid(false)
    } else {
      setIsValid(true)
    }

    if (Payment?.fns?.validateCardExpiry(e.target.value)) {
      expiryDate?.setIsValid(true)
    }

    onChange(e)
  }

  const onPaymentDisabled = () => {
    if (handledPaymentDisabled) handledPaymentDisabled()
    if (name.isValid === null) name.setIsValid(false)
    if (identification.isValid === null) identification.setIsValid(false)
    if (dues.isValid === null) dues.setIsValid(false)
    if (expiryDate.isValid === null) expiryDate.setIsValid(false)
    if (isValidCVC === null) setIsValidCVC(false)
    if (isValidCard === null) setIsValidCard(false)
  }

  const successCallback = (transactionId: string, franchise: string) => {
    setError(null)
    const paymentSystem =
      pathOr('', ['paymentId'], selectedPayment) ||
      pathOr('', ['paymentSystem'], selectedCard)

    const dataCard = {
      additionalData: [
        {
          key: 'transactionId',
          value: transactionId,
        },
        {
          key: 'installments',
          value: dues?.value?.value,
        },
        {
          key: 'paymentSystem',
          value: paymentSystem,
        },
      ],
      expirationDate: expiryDate.value,
      holderName: name.value,
      holderDocument: identification.value,
      gateway: 'noop',
      bin: paymentData.bin,
      paymentMethod: 'tc',
      franchise,
      number: lastDigits,
    }

    handlePayment(dataCard)
  }

  const onChangeSecureField = (sf: any) => {
    sf.on('change', (data: DataPCIChange) => {
      const { event, fields } = data

      if (event.field === 'cardNumber') {
        if (fields.cardNumber?.paymentMethod) {
          const { paymentMethod } = fields.cardNumber
          const dataPaymentMethod = selectIdImgCard(paymentMethod)

          const { installmentsOptions: installmentsOpt, id } =
            payments.paymentMethods.find(
              (item) =>
                item.name
                  .toLowerCase()
                  .includes(dataPaymentMethod?.nameComplete?.toLowerCase()) ||
                payments.paymentMethods.length === 1
            ) || null

          if (id !== selectedPayment.paymentId) {
            dispatchGlobal(setPaymetId(id))
          }

          if (
            installmentsOpt.length > 0 &&
            payments.paymentMethods.find(
              (p) =>
                p.isCustom ||
                p.name.toLowerCase() === dataPaymentMethod?.nameComplete
            )
          ) {
            setFranchiseImg(dataPaymentMethod?.name)
            setImgCard(dataPaymentMethod?.id)
            setIsValidFranchise(true)
            setInstallments(installmentsOpt || [])
          } else {
            setInstallments([])
            dues.reset()
            if (fields.cardNumber.length >= 2) {
              setIsValidFranchise(false)
              setIsValidCard(false)

              return
            }
          }
        } else {
          setInstallments([])
          dues.reset()
          setImgCard(null)
          setFranchiseImg(null)
        }

        if (
          event.type === 'blur' &&
          (fields.cardNumber.length === 0 || !fields.cardNumber.valid)
        ) {
          setIsValidCard(false)
        }

        if (fields.cardNumber.valid) {
          sf.getCardInfo()
          setIsValidCard(true)
        }
      }

      if (event.field === 'cvv') {
        if (
          event.type === 'blur' &&
          (fields.cvv.length === 0 || !fields.cvv.valid)
        ) {
          setIsValidCVC(false)
          if (isLiteVersion && isMobile) sf.setStyle('cvv', 'color: #bc4c47')
        }

        if (fields.cvv.valid) {
          setIsValidCVC(true)
        }
      }
    })
  }

  const placeholder = {
    cardNumber: useFormatMessage('store/checkoutless.card.cardNumber'),
    cvv: useFormatMessage('store/checkoutless.card.securityCodeCVV'),
  }

  useEffect(() => {
    const sf = new SecureFields()

    dispatchActions({
      type: 'SET_IS_LOADING_CVV_FIELD',
      args: true,
    })

    sf?.initTokenize(
      merchantID,
      {
        cardNumber: {
          placeholderElementId: `card-number-placeholder${
            selectedItem?.itemId || 'not-id'
          }`,
          inputType: 'tel',
        },
        cvv: {
          placeholderElementId: `cvv-placeholder`,
          inputType: 'tel',
        },
      },
      {
        '*': `font-family: ${fonts}`,
      }
    )

    const sfStyles = {
      colorPlaceholder: 'color: #919191',
      color: 'color: #011d1a',
      fontSize: 'font-size: 16px',
      fontFamily: `font-family: ${fonts}`,
      paddingLeft: '5px',
    }

    sf.on('ready', () => {
      dispatchActions({
        type: 'SET_IS_LOADING_CVV_FIELD',
        args: false,
      })

      sf.setPlaceholder('cardNumber', placeholder.cardNumber)
      sf.setPlaceholder('cvv', placeholder.cvv)
      sf.setStyle('cvv', sfStyles.fontSize)
      sf.setStyle('cardNumber', sfStyles.fontSize)
      sf.setStyle('cvv', sfStyles.color)
      sf.setStyle('cardNumber', sfStyles.color)
      sf.setStyle('cvv', sfStyles.fontFamily)
      sf.setStyle('cardNumber', sfStyles.fontFamily)
      sf.setStyle('cvv', sfStyles.paddingLeft)
      sf.setStyle('cardNumber', sfStyles.paddingLeft)
      sf.setStyle('cvv:focus', 'outline: 0')
      sf.setStyle('cardNumber:focus', 'outline: 0')
      sf.setStyle('cvv::placeholder', sfStyles.colorPlaceholder)
      sf.setStyle('cardNumber::placeholder', sfStyles.colorPlaceholder)
    })

    const cardContainer = document.getElementById(
      `card-number-container${selectedItem?.itemId || 'not-id'}`
    )

    const cvvContainer = document.getElementById(`cvv-container-inside`)

    const setFocus = (input: string) => sf.focus(input)

    cardContainer.addEventListener('click', () => setFocus('cardNumber'))
    cvvContainer.addEventListener('click', () => setFocus('cvv'))

    sf.on('error', (data: { error: string; action: string }) => {
      const { action } = data

      if (action === 'submit') {
        setError('store/checkoutless.register.card.numberError')
      }
    })

    onChangeSecureField(sf)

    setSecureFields(sf)
    // Solo se establece cuando una vez haya hecho submit
    // sf.on('validate', (data: any) => {
    //   console.log('data', data)
    // })

    return () => {
      sf?.destroy()
      cardContainer?.removeEventListener('click', () => setFocus('cardNumber'))
      cvvContainer?.removeEventListener('click', () => setFocus('cvv'))
    }
  }, [])

  useEffect(() => {
    if (secureFields) {
      secureFields.on('success', (data: DataPCISuccess) => {
        if (data.transactionId) {
          let franchise = data?.cardInfo?.brand?.toLowerCase()

          if (franchise?.includes('visa')) {
            franchise = 'visa'
          } else if (
            franchise?.includes('mci') ||
            franchise?.includes('mastercard')
          ) {
            franchise = 'master'
          } else if (franchise?.includes('diners')) {
            franchise = 'diner'
          } else if (franchise?.includes('american express')) {
            franchise = 'amex'
          }

          dispatchGlobal(setCardInfo({ franchise }))

          successCallback(data.transactionId, franchise)
        }
      })
    }
  }, [name, identification, expiryDate, dues, paymentData?.bin, lastDigits])

  useEffect(() => {
    if (secureFields) {
      onChangeSecureField(secureFields)

      secureFields.on('cardInfo', (data: DataPCIGetCardInfo) => {
        const dataDispatch: any = {
          type: 'SET_BIN',
          args: null,
        }

        if (data?.maskedCard) {
          dataDispatch.args = data?.maskedCard?.substr(0, 6)
          let limitDigits = 4

          if (data?.paymentMethod === 'AMX') {
            limitDigits = 3
          } else if (data?.paymentMethod === 'DIN') {
            limitDigits = 2
          }

          const number = data?.maskedCard?.substring(
            data?.maskedCard?.length,
            data?.maskedCard?.length - limitDigits
          )

          setLastDigits(number)
        }

        if (selectedPayment.bin !== dataDispatch.args) {
          dispatchGlobal(setCardBin(dataDispatch.args))
        }

        dispatchUserData(dataDispatch)
      })
    }
  }, [selectedPayment, secureFields])

  useEffect(() => {
    if (name.isValid && identification.isValid && expiryDate.isValid) {
      dispatchGlobal(
        setCardInfo({
          holderDocument: identification.value,
          holderName: name.value,
          expirationDate: expiryDate.value,
        })
      )
    }
  }, [name.value, identification.value, expiryDate.value])

  return (
    <Fragment>
      {error && (
        <Alert
          type="error"
          text="store/checkoutless.register.card.numberError"
        />
      )}
      <div className={globalStyles.gridFormTwoCols} data-more-left="true">
        <div>
          <InputCard
            theme={theme}
            isValid={isValidCard}
            imgCard={imgCard}
            itemId={selectedItem?.itemId || 'not-id'}
          />
          {!isValidCard && isValidCard !== null && (
            <p className={styles.labelError}>
              {IsValidFranchise
                ? useFormatMessage(
                    'store/checkoutless.register.card.numberError'
                  )
                : useFormatMessage(
                    'store/checkoutless.register.card.franchiseError'
                  )}
            </p>
          )}
        </div>
        <div>
          <InputCVCSF
            isValid={isValidCVC}
            className={`${styles.secureField__input} ${
              isValidCVC === false ? styles.secureFieldInvalidLite : null
            } ${isValidCVC === true ? styles.secureFieldValidLite : null} ${
              styles.secureFieldLite
            }`}
            itemId={selectedItem?.itemId || 'not-id'}
            showError={false}
          />
        </div>

        <div className={styles.marginBottom}>
          <Input
            placeholder="store/checkoutless.register.card.name"
            errorMessage="store/checkoutless.register.nameError"
            regularExpression={regularExpressions.name}
            name="name"
            maxLength={30}
            {...name}
          />
        </div>
        <div className={styles.marginBottom}>
          <Input
            type="tel"
            placeholder="store/checkoutless.register.card.expiryDate" // Cambiar a Fecha de vencimiento
            errorMessage="store/checkoutless.register.card.expiryDateError"
            blurFunction={onBlurExpiryDate}
            name="expiryDate"
            className={styles.expiryDate}
            {...expiryDate}
            onChange={onChangeExpiryDate}
          />
        </div>

        <div className={styles.marginBottom}>
          <Input
            placeholder="store/checkoutless.register.card.document"
            errorMessage="store/checkoutless.register.documentError"
            regularExpression={regularExpressions.document}
            name="identification"
            {...identification}
          />
        </div>
        <div className={`${styles.marginBottom}`}>
          <SelectDues dues={dues} installments={installments} />
        </div>
        <div data-col="two-col">
          <CouponContainer />
        </div>
      </div>

      <div
        className={`${globalStyles.buyButtonContainer} ${globalStyles.buyButtonContainerFixed}`}
      >
        <Button
          value={'store/checkoutless.register.pay'}
          onClick={() => secureFields?.submit()}
          onClickDisabled={onPaymentDisabled}
          customValue={`${formatter.format(value + totalOfferings)}`}
          disabled={isDisabled || disabled}
          units={units}
          id="kuikpay-purchase-button"
          isFixed={true}
          isPaymentButton={true}
        />
      </div>
    </Fragment>
  )
}

export default PaymentsForm
