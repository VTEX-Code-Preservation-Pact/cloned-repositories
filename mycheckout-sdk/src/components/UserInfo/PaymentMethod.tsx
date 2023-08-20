import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { pathOr } from 'ramda'

import type { DataPCIChange } from '../../interfaces'
import { clearNumber, getImgFranchise } from '../../utils/payments'
import { OutlineCancel, Info } from '../Icons'
import styles from './userInfo-module.css'
import genericStyles from '../../generic-styles.module.css'
import useFormatMessage from '../../i18n/useFormatMessage'
import { InputCVCSF } from './InputCVC'
import { SelectDues } from './SelectDues'
import {
  selectIsMobile,
  selectSettings,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { ToolTip } from '../shared/Tooltip/Tooltip'
import { selectItemData } from '../../contexts/global-context/reducers/cartSlice'
import { usePCIScript } from '../../hooks/usePCIScript'
import global from '../../myCheckout-styles.module.css'
import { Input } from '../shared'
import { useFonts } from '../../hooks/useFonts'
import type { Card } from '../../interfaces/orderForm'
import { useCurrentPaymentMethod } from '../../hooks/usePaymentInfo'

interface Props {
  cvv: any
  dues: any
  handleDelete: any
  isValidCVC?: boolean
  loadInputCVC?: boolean
  paymentMethod: Card
  selectedPaymentMethod: string
  setIsValidCVC?: any
  setSecureFields?: any
  onSelectPaymentMethod: (id: string, paymentSystem: string) => void
}

const PaymentMethod = (props: Props) => {
  const {
    cvv,
    dues,
    handleDelete,
    isValidCVC,
    loadInputCVC,
    paymentMethod,
    selectedPaymentMethod,
    setIsValidCVC,
    setSecureFields,
    onSelectPaymentMethod,
  } = props

  const { cardId, number, franchise } = paymentMethod

  const origin = pathOr<'checkoutless' | 'store'>(
    'checkoutless',
    ['paymentMethod', 'origin'],
    props
  )

  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const { merchantID } = usePCIScript()

  const { selectedItem } = useSelector(selectItemData)

  const { cvcRequired } = useSelector(selectSettings)

  const currentPaymentMethod = useCurrentPaymentMethod(paymentMethod)

  const placeholder = {
    cvv: useFormatMessage('store/checkoutless.card.cvv'),
  }

  const { fonts } = useFonts()

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
    const cvvValid = cvv.value.length >= 3

    cvv.setIsValid(cvvValid)
    setIsValidCVC(cvvValid)
  }

  const onClick = () => {
    onSelectPaymentMethod(cardId, currentPaymentMethod.id)
  }

  useEffect(() => {
    if (
      paymentMethod.gateway === 'paymentez' ||
      !loadInputCVC ||
      cardId !== selectedPaymentMethod
    ) {
      return
    }

    setIsValidCVC(null)
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
      colorPlaceholder: 'color: #919191',
      colorCvv: 'color: #011d1a',
      fontSize: 'font-size: 16px',
      fontFamily: `font-family: ${fonts}`,
      paddingLeft: '5px',
    }

    sf.on('ready', () => {
      sf.setPlaceholder('cvv', placeholder.cvv)
      sf.setStyle('cvv', stylesCvv.fontSize)
      sf.setStyle('cvv', stylesCvv.colorCvv)
      sf.setStyle('cvv', stylesCvv.fontFamily)
      sf.setStyle('cvv', stylesCvv.paddingLeft)
      sf.setStyle('cvv::placeholder', stylesCvv.colorPlaceholder)
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
          if (isLiteVersion && isMobile) {
            sf.setStyle('cvv', 'color: #bc4c47')
          }
        }

        if (fields.cvv.valid) {
          setIsValidCVC(true)
          if (isLiteVersion && isMobile) {
            sf.setStyle('cvv', 'color: #919191')
          }
        }
      }
    })

    setSecureFields(sf)
  }, [loadInputCVC, selectedPaymentMethod])

  return (
    <div className={`${global.borderBottom} ${styles.paymentContainer}`}>
      <div className={styles.paymentContainer}>
        <div className={styles.paymentContainer} onClick={() => onClick()}>
          <div className={styles.iconContainer}>
            <input
              className={global.cursorPointer}
              type="radio"
              checked={cardId === selectedPaymentMethod}
            />
          </div>
          <div className={styles.cardImgContainer}>
            <img src={`${getImgFranchise(franchise)}`} alt="Franchise" />
          </div>
          <div className={styles.textContainer}>
            <p>{`** ${number}`}</p>
          </div>
        </div>
      </div>
      {cardId === selectedPaymentMethod && cvcRequired && loadInputCVC && (
        <div className={styles.paymentFieldsContainer}>
          <div className={styles.paymentDuesContainer}>
            <SelectDues
              dues={dues}
              installments={currentPaymentMethod?.installmentsOptions || []}
            />
          </div>
          <div className={styles.paymentCvvContainer}>
            {
              // TODO: Desde el back se debe enviar el gateway paymentez
              paymentMethod.gateway === 'paymentez' ? (
                <Input
                  type="tel"
                  placeholder="store/checkoutless.card.cvv"
                  {...cvv}
                  errorMessage="store/checkoutless.card.invalidSecurityCodeError"
                  name="cvc"
                  maxLength={4}
                  onChange={onChangeCvv}
                  className={genericStyles.cvcInput}
                  blurFunction={onBlurCvv}
                  deleteBtn={false}
                  showError={false}
                />
              ) : (
                <InputCVCSF
                  isValid={isValidCVC}
                  className={`${styles.secureField__input} ${
                    isValidCVC === false ? styles.secureFieldInvalidLite : null
                  } ${
                    isValidCVC === true ? styles.secureFieldValidLite : null
                  } ${styles.secureFieldLite} ${styles.borderBottom}`}
                  itemId={selectedItem?.itemId || 'not-id'}
                  showError={false}
                />
              )
            }
          </div>
        </div>
      )}
      <div className={styles.iconsContainer}>
        <div className={styles.edit}></div>
        {origin !== 'store' ? (
          <a
            className={styles.delete}
            onClick={() => {
              if (cardId !== selectedPaymentMethod) handleDelete(cardId)
            }}
          >
            {cardId !== selectedPaymentMethod && <OutlineCancel />}
          </a>
        ) : (
          cardId !== selectedPaymentMethod && (
            <ToolTip
              tooltip={
                <div className={styles.CheckoutlessInfoMessage}>
                  <div>Este medio de pago no puede ser eliminado</div>
                </div>
              }
            >
              <Info />
            </ToolTip>
          )
        )}
      </div>
    </div>
  )
}

export default PaymentMethod
