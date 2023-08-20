import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import constants from '../../utils/constants'
import { useUserData } from '../../contexts/UserDataProvider'
import type { PaymentForm } from '../../interfaces'
import { formatter } from '../../utils'
import { Button } from '../shared'
import vtexStyles from './vtex-styles.module.css'
import kuikpayStyles from './kuikpay-styles.module.css'
import genericStyles from './generic-styles.module.css'
import { useValidateStyles } from '../../hooks/useValidateStyles'
import { selectTheme } from '../../contexts/global-context/reducers/uiSettingsSlice'
// import globalVtexStyles from '../../vtex-styles.module.css'
// import globalKuikpayStyles from '../../kuikpay-styles.module.css'

interface Error {
  code: string
  message: string
}

const MercadoPagoForm = ({ handlePayment, loading, disabled }: PaymentForm) => {
  const intl = useIntl()
  const { value, clientProfileData, totalOfferings } = useUserData()
  const theme = useSelector(selectTheme)
  const [errors, setErrors] = useState([])
  const [messages, setMessages] = useState<any>({})
  const mp = new MercadoPago(constants.mercadoPagoPublicKey)
  const global = useValidateStyles()

  let styles = kuikpayStyles

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  const loadCardForm = () => {
    const cardForm = mp.cardForm({
      amount: value.toString(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: intl.formatMessage({
            id: 'store/checkoutless.register.creditCardName',
          }),
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: intl.formatMessage({
            id: 'store/checkoutless.register.creditCardNumber',
          }),
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'MM',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'CVC',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número de documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
      },
      callbacks: {
        onFormMounted: (error: string) => {
          if (error) return console.warn('Form Mounted handling error: ', error)
        },
        onCardTokenReceived: (error: any) => {
          if (error) return setErrors(error)
        },
        onSubmit: (event: any) => {
          event.preventDefault()

          setErrors([])

          const {
            paymentMethodId,
            // issuerId,
            // cardholderEmail: email,
            // amount,
            token,
            // installments,
            // identificationNumber,
            // identificationType,
          } = cardForm.getCardFormData()

          handlePayment({
            token,
            number: '1',
            gateway: 'Mercadopago',
            franchise: paymentMethodId,
            paymentMethod: 'tc',
          })
        },
      },
    })
  }

  useEffect(() => {
    setTimeout(() => {
      loadCardForm()
    }, 1000)
  }, [])

  useEffect(() => {
    if (!errors.length) {
      setMessages({})

      return
    }

    const formErrors = {}

    errors.forEach((error: Error) => {
      formErrors[error.code] = error.message
    })

    setMessages(formErrors)
  }, [errors])

  return (
    <form id="form-checkout" className="payment-form">
      <div>
        <input
          type="text"
          name="cardNumber"
          id="form-checkout__cardNumber"
          maxLength={16}
        />
        {messages[205] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.cardNumberError',
            })}
          </p>
        )}

        {messages.E301 && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.invalidCardNumberError',
            })}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="cardExpirationMonth"
            id="form-checkout__cardExpirationMonth"
            maxLength={2}
          />
          {messages[208] && (
            <p className={global.labelError}>
              {intl.formatMessage({
                id: 'store/checkoutless.card.cardExpirationMonthError',
              })}
            </p>
          )}
          {messages[325] && (
            <p className={global.labelError}>
              {intl.formatMessage({
                id: 'store/checkoutless.card.invalidCardExpirationMonthError',
              })}
            </p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="cardExpirationYear"
            id="form-checkout__cardExpirationYear"
            maxLength={2}
          />
          {messages[209] && (
            <p className={global.labelError}>
              {intl.formatMessage({
                id: 'store/checkoutless.card.cardExpirationYearError',
              })}
            </p>
          )}
          {messages[326] && (
            <p className={global.labelError}>
              {intl.formatMessage({
                id: 'store/checkoutless.card.invalidCardExpirationYearError',
              })}
            </p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="cardholderName"
          id="form-checkout__cardholderName"
        />
        {messages[221] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.cardholderNameError',
            })}
          </p>
        )}
        {messages[316] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.invalidcardholderNameError',
            })}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="securityCode"
          id="form-checkout__securityCode"
          maxLength={4}
        />
        {messages[224] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.securityCodeError',
            })}
          </p>
        )}
        {messages.E302 && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.invalidSecurityCodeError',
            })}
          </p>
        )}
      </div>

      <div style={{ display: 'none' }}>
        <select name="issuer" id="form-checkout__issuer"></select>
        {messages[220] && (
          <p className={global.labelError}>
            {intl.formatMessage({ id: 'store/checkoutless.card.issuerError' })}
          </p>
        )}
      </div>

      <div style={{ display: 'none' }}>
        <select
          name="identificationType"
          id="form-checkout__identificationType"
        ></select>
        {messages[212] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.identificationTypeError',
            })}
          </p>
        )}
        {messages[322] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.invalidIdentificationTypeError',
            })}
          </p>
        )}
      </div>

      <div style={{ display: 'none' }}>
        <input
          type="text"
          name="identificationNumber"
          id="form-checkout__identificationNumber"
          defaultValue={clientProfileData.document}
        />
        {messages[214] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.identificationNumberError',
            })}
          </p>
        )}
        {messages[324] && (
          <p className={global.labelError}>
            {intl.formatMessage({
              id: 'store/checkoutless.card.invalidIdentificationNumberError',
            })}
          </p>
        )}
      </div>
      <select name="installments" id="form-checkout__installments"></select>
      <div>
        <Button
          value={
            loading
              ? 'store/checkoutless.register.processingPayment'
              : 'store/checkoutless.register.pay'
          }
          disabled={disabled}
          customValue={`${formatter.format(value + totalOfferings)}`}
          type="submit"
          id="form-checkout__submit"
          isPaymentButton={true}
        />
      </div>
    </form>
  )
}

export default MercadoPagoForm
