import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { pathOr } from 'ramda'

import { useInputValue } from '../../hooks/useInputValue'
import { useUserData } from '../../contexts/UserDataProvider'
import type {
  DataPCIPGetCardInfo,
  DataPCIPSuccess,
  SelectValue,
} from '../../interfaces'
import { PaymentForm } from '../../interfaces'
import { formatter, regularExpressions } from '../../utils'
import { useValidateStyles } from '../../hooks/useValidateStyles'
import { Button, Input } from '../shared'
import kuikpayStyles from './kuikpay-styles.module.css'
import vtexStyles from './vtex-styles.module.css'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import { selectTheme } from '../../contexts/global-context/reducers/uiSettingsSlice'
import genericStyles from './generic-styles.module.css'
import {
  clearNumber,
  copyAttributes,
  formatExpiryDate,
  selectIdImgCard,
} from '../../utils/payments'
import { useUnits } from '../../hooks/useUnits'
import { useSelectValue } from '../../hooks/useSelectValue'
import { SelectDues } from '../UserInfo/SelectDues'
import CouponContainer from '../Coupon/CouponContainer'
import { selectProfile } from '../../contexts/global-context/reducers/orderFormDataSlice'

const beforeOfChangeDocument = (val: string) => {
  return clearNumber(val)
}

const beforeOfChangeExpiryDate = (val: string) => {
  return formatExpiryDate(val)
}

const PaymentezForm = ({
  handlePayment,
  setError,
  disabled,
  setFranchiseImg,
  selectedCard,
  handledPaymentDisabled,
  payments,
}: PaymentForm) => {
  const { value, items, paymentData, totalOfferings } = useUserData()

  const { email } = useSelector(selectProfile)

  const [IsValidFranchise, setIsValidFranchise] = useState(true)

  const [installments, setInstallments] = useState([])

  const dispatchActions = useActionsDispatch()

  const name = useInputValue('')
  const identification = useInputValue('', beforeOfChangeDocument)
  const cvv = useInputValue('')
  const expiryDate = useInputValue('', beforeOfChangeExpiryDate)
  const cardNumber = useInputValue('')
  const globalStyles = useValidateStyles(true)
  const theme = useSelector(selectTheme)
  const dues: SelectValue = useSelectValue(null)

  const units = useUnits(items)

  const styles = {
    kuikpay: kuikpayStyles,
    vtex: vtexStyles,
    generic: genericStyles,
  }[theme]

  const isDisabled = !(
    name.isValid &&
    identification.isValid &&
    dues.isValid &&
    expiryDate.isValid &&
    cardNumber.isValid &&
    cvv.isValid
  )

  const onBlurExpiryDate = () => {
    expiryDate.setIsValid(
      PaymentForm.isExpiryValid(
        PaymentForm.ctx.getExpiryMonth(),
        PaymentForm.ctx.getExpiryYear()
      )
    )
  }

  const onChangeExpiryDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    PaymentForm.ctx.expiryMonthYearInput.val(e.target.value.substring(0, 5))
    PaymentForm.ctx.expiryYearInput.val(e.target.value.substring(3, 5))
    PaymentForm.ctx.expiryMonthInput.val(PaymentForm.ctx.expiryMonth())

    if (PaymentForm.ctx.expiryMonthYearInput.val().length === 5) {
      expiryDate.setIsValid(
        PaymentForm.isExpiryValid(
          PaymentForm.ctx.getExpiryMonth(),
          PaymentForm.ctx.getExpiryYear()
        )
      )
    }

    expiryDate.onChange(e)
  }

  const onChangeCvv = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    PaymentForm.ctx.cvcInput.val(PaymentForm.numbersOnlyString(e.target.value))
    if (PaymentForm.ctx.cvcInput.val().length >= 3) {
      PaymentForm.ctx.cvcLenght = PaymentForm.ctx.cvcInput.val().length
      cvv.setIsValid(PaymentForm.ctx.isCvcValid())
    }

    cvv.onChange(e)
  }

  const onBlurCvv = () => {
    cvv.setIsValid(PaymentForm.ctx.isCvcValid())
  }

  const onKeyDownCardNumber = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    PaymentForm.handleMaskedNumberInputKey(
      e,
      PaymentForm.ctx.creditCardNumberMask
    )
    PaymentForm.ctx.cardNumberInput.val($(e.target).val())
    cardNumber.setValue(PaymentForm.ctx.cardNumberInput.val())
  }

  const onBlurCardNumber = () => {
    cardNumber.setIsValid(PaymentForm.ctx.isCardNumberValid())
  }

  const refreshCardType = () => {
    const { setIsValid } = cardNumber

    const bin = PaymentForm.ctx.cardNumberInput
      .val()
      .replaceAll(' ', '')
      .substring(0, 6)

    if (bin.length >= 6 && !PaymentForm.ctx.cardType) {
      Payment.getBinInformation(
        bin,
        PaymentForm.ctx,
        (r: { brand_name: string; card_type: string; nip: string }) => {
          const paymentMethod = r.brand_name

          PaymentForm.ctx.cardType = r.card_type
          PaymentForm.ctx.nip = r.nip
          if (paymentMethod) {
            const dataPaymentMethod = selectIdImgCard(paymentMethod)

            const { installmentsOptions: installment } =
              payments.paymentMethods.find(
                (item) =>
                  item.name
                    .toLowerCase()
                    .includes(dataPaymentMethod?.nameComplete?.toLowerCase()) ||
                  payments.paymentMethods.length === 1
              ) || null

            if (
              installment &&
              installment.length > 0 &&
              payments.paymentMethods?.find(
                (p: { name: string }) =>
                  p.name.toLowerCase() === dataPaymentMethod?.nameComplete
              )
            ) {
              PaymentForm.ctx.numberBin = bin
              setFranchiseImg(dataPaymentMethod?.name)
              setIsValidFranchise(true)
              setInstallments(installment || [])
            } else {
              setInstallments([])
              dues.reset()
              setIsValidFranchise(false)
              setIsValid(false)
            }
          }

          return paymentMethod
        },
        () => {
          setIsValidFranchise(false)
        }
      )
    } else if (bin.length < 6) {
      PaymentForm.ctx.cardType = ''
      setInstallments([])
      dues.reset()
      setFranchiseImg(null)
    }
  }

  const onPasteCardNumber = (
    e: React.ClipboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data = e.clipboardData.getData('Text')

    PaymentForm.ctx.cardType = ''
    PaymentForm.ctx.cardNumberInput.val(PaymentForm.numbersOnlyString(data))
    refreshCardType()
    PaymentForm.ctx.refreshCreditCardNumberFormat()
    cardNumber.setValue(PaymentForm.ctx.cardNumberInput.val())
    e.preventDefault()
  }

  useEffect(() => {
    dispatchActions({
      type: 'SET_IS_LOADING_CVV_FIELD',
      args: true,
    })

    const base = `.payment`

    PaymentForm.ctx = $(base).PaymentForm('init').data('paymentform')

    const cvcNode = $(`${base} .custom-cvc`)
    const cardNode = $(`${base} .custom-card-number`)
    const expiryMonthNode = $(`${base} .custom-expiry-month`)
    const expiryYearNode = $(`${base} .custom-expiry-year`)
    const expiryMonthYearNode = $(`${base} .custom-expiry`)

    copyAttributes(`${base} .cvc`, cvcNode, [
      'class',
      'placeholder',
      'maxlength',
    ])
    copyAttributes(`${base} .card-number`, cardNode, ['class', 'placeholder'])
    copyAttributes(`${base} .expiry-year`, expiryYearNode, ['class'])
    copyAttributes(`${base} .expiry-month`, expiryMonthNode, ['class'])
    copyAttributes(`${base} .expiry`, expiryMonthYearNode, [
      'class',
      'placeholder',
    ])
    PaymentForm.ctx.cvcInput = cvcNode
    PaymentForm.ctx.cardNumberInput = cardNode
    PaymentForm.ctx.expiryYearInput = expiryYearNode
    PaymentForm.ctx.expiryMonthInput = expiryMonthNode
    PaymentForm.ctx.expiryMonthYearInput = expiryMonthYearNode

    $(`${base} .card-number-wrapper`).remove()
    $(`${base} .cvc-wrapper`).remove()
    $(`${base} .expiry-wrapper`).remove()

    dispatchActions({
      type: 'SET_IS_LOADING_CVV_FIELD',
      args: false,
    })
  }, [])

  const successCallback = (data: DataPCIPSuccess) => {
    setError(null)
    const { card } = data
    const type = PaymentForm.ctx.cardType.toLowerCase()
    const limitDigits = { [type]: 4, ax: 3, di: 2 }[type]
    const franchise = {
      [type]: type,
      vi: 'visa',
      mci: 'master',
      mc: 'master',
      di: 'diner',
      ax: 'amex',
    }[type]

    const number = card.number.substring(
      card.number.length,
      card.number.length - limitDigits
    )

    const paymentSystem =
      pathOr('', ['temporalPaymentSystem'], paymentData) ||
      pathOr('', ['paymentSystem'], selectedCard)

    const dataCard = {
      additionalData: [
        {
          key: 'installments',
          value: dues?.value?.value,
        },
        {
          key: 'paymentSystem',
          value: paymentSystem,
        },
      ],
      token: card.token,
      expirationDate: expiryDate.value,
      holderName: name.value,
      holderDocument: identification.value,
      gateway: 'noop',
      bin: card.bin,
      cvv: cvv.value,
      paymentMethod: 'tc',
      franchise,
      number,
    }

    handlePayment(dataCard)
  }

  const onPaymentDisabled = () => {
    if (handledPaymentDisabled) handledPaymentDisabled()
    if (name.isValid === null) name.setIsValid(false)
    if (identification.isValid === null) identification.setIsValid(false)
    if (dues.isValid === null) dues.setIsValid(false)
    if (expiryDate.isValid === null) expiryDate.setIsValid(false)
    if (cvv.isValid === null) cvv.setIsValid(false)
    if (cardNumber.isValid === null) cardNumber.setIsValid(false)
  }

  const handleClick = () => {
    const { card } = PaymentForm.ctx.getCard() as DataPCIPGetCardInfo

    try {
      card.holder_name = name.value
      Payment.addCard(
        email,
        email,
        { card },
        successCallback,
        (e: { error: { type: string } }) => {
          if (e.error.type.includes('Card already added')) {
            successCallback({
              card: {
                ...card,
                bin: PaymentForm.ctx.numberBin,
                expiry_month: card.expiry_month.toString(),
                expiry_year: card.expiry_year.toString(),
                token: e.error.type.split('Card already added: ')[1],
                message: e.error.type,
              },
            })
          } else {
            setError('store/checkoutless.register.creditCardError')
          }
        }
      )
    } catch {
      setError('store/checkoutless.register.creditCardError')
    }
  }

  return (
    <Fragment>
      <div
        className={`${globalStyles.gridFormTwoCols} ${'payment'}`}
        id="my-card"
        data-more-left="true"
      >
        <div className={styles.marginBottom}>
          <Input
            type="tel"
            placeholder="store/checkoutless.card.cardNumber"
            {...cardNumber}
            errorMessage={
              !IsValidFranchise && IsValidFranchise !== null
                ? 'store/checkoutless.register.card.franchiseError'
                : 'store/checkoutless.register.card.numberError'
            }
            className="custom-card-number"
            name="card-number"
            blurFunction={onBlurCardNumber}
            onKeyDown={onKeyDownCardNumber}
            onPaste={onPasteCardNumber}
            onCustomKeyUpEvent={refreshCardType}
          />
        </div>

        <div className={styles.marginBottom}>
          <Input
            type="tel"
            placeholder="store/checkoutless.card.cvv"
            errorMessage="store/checkoutless.card.invalidSecurityCodeError"
            {...cvv}
            className={`custom-cvc`}
            name="cvc"
            maxLength={4}
            onChange={onChangeCvv}
            blurFunction={onBlurCvv}
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
            placeholder="store/checkoutless.register.card.expiryDate"
            errorMessage="store/checkoutless.register.card.expiryDateError"
            blurFunction={onBlurExpiryDate}
            name="expiry"
            className={`custom-expiry ${styles.expiryDate}`}
            {...expiryDate}
            onChange={onChangeExpiryDate}
          />
          <input className="custom-expiry-month" type="hidden"></input>
          <input className="custom-expiry-year" type="hidden"></input>
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
          onClick={handleClick}
          onClickDisabled={onPaymentDisabled}
          customValue={`${formatter.format(value + totalOfferings)}`}
          disabled={isDisabled || disabled}
          units={units}
          id="kuikpay-purchase-button"
          isFixed={false}
          isPaymentButton={true}
        />
      </div>
    </Fragment>
  )
}

export default PaymentezForm
