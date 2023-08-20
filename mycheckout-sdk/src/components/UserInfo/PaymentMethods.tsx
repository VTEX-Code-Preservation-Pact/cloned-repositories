import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectIsMobile,
  selectSettings,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import PaymentMethod from './PaymentMethod'
import type { SelectValue } from '../../interfaces'
import { Add, CreditCard } from '../Icons'
import { Alert } from '../shared'
import PaymentForm from '../RegisterForm/PaymentForm'
import constant from '../../utils/constants'
import { useScript } from '../../hooks/useScript'
import useFormatMessage from '../../i18n/useFormatMessage'
import { useValidateStyles } from '../../hooks/useValidateStyles'
import LoadingProcessOrder from './LoadingProcessOrder/LoadingProcessOrderContainer'
import { useInputValue } from '../../hooks/useInputValue'
import { useInitSecureFields } from '../../hooks/useInitSecureFields'
import UnavailableMessage from './UnavailableMessage/UnavailableMessageContainer'
import {
  selectFormAction,
  selectLoadingOrder,
  setFormAction,
  setPaymentDataSection,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import { usePCIScript } from '../../hooks/usePCIScript'
import useAvailablePaymentMethods from '../../hooks/useAvailablePaymentMethods'
import { useActions } from '../../contexts/ActionsProviderV2'
import globalStyles from '../../myCheckout-styles.module.css'
import BuyButtonContainer from '../BuyButton'
import { useBuyButton } from './useBuyButton'
import {
  selectItems,
  selectMainPayment,
  selectOrderForm,
  setCardInfo,
  setPayments,
  setPaymetId,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import type { Card } from '../../interfaces/orderForm'
import { useSelectValue } from '../../hooks/useSelectValue'
import Title from '../shared/Title'
import Coupon from '../Coupon/CouponContainer'
import styles from './userInfo-module.css'

const DELETE_PAYMENT = gql`
  mutation deletePayment($id: ID!) {
    deletePayment(id: $id)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      message
      data {
        id
      }
    }
  }
`

const PaymentMethods = () => {
  const { cvcRequired } = useSelector(selectSettings)
  const loadingOrder = useSelector(selectLoadingOrder)
  const isMobile = useSelector(selectIsMobile)
  const items = useSelector(selectItems)
  const {
    payments: { availableCards },
  } = useSelector(selectOrderForm)

  const selectedMainPaymentMethod = useSelector(selectMainPayment)
  const formAction = useSelector(selectFormAction)

  const dispatchGlobal = useDispatch()
  const { sandbox } = useActions()
  const initialRender = useRef(true)
  const [isDelete, setIsDelete] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [dataLoad, setDataLoad] = useState(false)
  const [warning, setWarning] = useState({ show: false, id: '', number: '' })
  const [loadPaymentForm, setLoadPaymentForm] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    selectedMainPaymentMethod?.cardId
  )

  const { availablePaymentMethods } = useAvailablePaymentMethods()

  const { PCI_PROXY_SCRIPT } = usePCIScript()
  const global = useValidateStyles()
  const dues: SelectValue = useSelectValue(null)
  const cvv = useInputValue('')
  const gateway = localStorage.getItem('gateway')
  const { loadPaymentForm: loadFS } = useInitSecureFields(
    gateway,
    selectedMainPaymentMethod?.paymentMethod,
    cvcRequired
  )

  const {
    handleSubmit: handleSubmitBuyButton,
    canBuy,
    forceDisabled,
    isValidCVC,
    setIsValidCVC,
    setSecureFields,
  } = useBuyButton(dues, dataLoad)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      if (!selectedPaymentMethod) return
      dispatchGlobal(
        setCardInfo({
          ...availableCards?.find(
            (paymentMethod: Card) =>
              paymentMethod.cardId === selectedPaymentMethod
          ),
          paymentMethod: 'tc',
        })
      )
      setWarning({ show: false, id: '', number: '' })
    }
  }, [selectedPaymentMethod])

  useEffect(() => {
    dispatchGlobal(setPaymentDataSection('list'))
    dispatchGlobal(setFormAction('none'))
  }, [])

  const [deletePayment] = useMutation(DELETE_PAYMENT, {
    onCompleted: ({ deletePayment: paymentDelete }) => {
      const filteredPayment = availableCards?.filter(
        (payment) => payment.cardId !== paymentDelete.data?.id
      )

      setIsDelete(true)
      setHasError(false)
      dispatchGlobal(
        setPayments({
          availableCards: filteredPayment,
        })
      )
    },
    onError: (e) => {
      setHasError(true)
      setIsDelete(false)
      console.error('error: ', e)
    },
  })

  const handleDelete = (id: string) => {
    const selectedPaymentDelete = availableCards?.find(
      (payment) => payment.cardId === id
    )

    setWarning({
      show: true,
      id: selectedPaymentDelete?.cardId,
      number: selectedPaymentDelete?.number,
    })
  }

  const handleCreate = () => {
    dispatchGlobal(setFormAction('add'))
  }

  useEffect(() => {
    if (!(window as any).PaymentezLoad) {
      useScript(constant.JQUERY_SCRIPT[0], constant.JQUERY_SCRIPT[1]).then(
        () => {
          useScript(
            constant.PAYMENTEZ_SCRIPT[0],
            constant.PAYMENTEZ_SCRIPT[1]
          ).then(() => {
            // eslint-disable-next-line prettier/prettier
            ;(window as any).PaymentezLoad = true
            Payment.init(
              ...constant.PAYMENTEZ_CREDENTIALS[sandbox ? 'stg' : 'prod']
            )
            setLoadPaymentForm(true)
          })
        }
      )
    }

    if (!(window as any).SecureFieldsLoad) {
      useScript(constant.JQUERY_SCRIPT[0], constant.JQUERY_SCRIPT[1]).then(
        () => {
          useScript(PCI_PROXY_SCRIPT[0], PCI_PROXY_SCRIPT[1]).then(() => {
            ;(window as any).SecureFieldsLoad = true
            setLoadPaymentForm(true)
          })
        }
      )
    }

    if (
      ((window as any).PaymentezLoad && !loadPaymentForm) ||
      ((window as any).SecureFieldsLoad && !loadPaymentForm)
    ) {
      setLoadPaymentForm(true)
    }

    if (
      !selectedMainPaymentMethod ||
      (!selectedMainPaymentMethod.paymentId &&
        !selectedMainPaymentMethod.cardId)
    ) {
      dispatchGlobal(setFormAction('add'))
    }
  }, [])

  useEffect(() => {
    if (items?.length) setDataLoad(true)
  }, [items])

  const handleClick = () => {
    deletePayment({
      variables: {
        id: warning.id,
      },
    })
    setWarning({ show: false, id: '', number: '' })
  }

  const handleSelectPaymentMethod = (id: string, paymentSystem: string) => {
    setSelectedPaymentMethod(id)

    // TODO: Revisar si se usa para seleccionar el payment system que se lleva en el flujo
    dispatchGlobal(setPaymetId(paymentSystem))
  }

  return (
    <div>
      {loadingOrder && <LoadingProcessOrder />}

      <div style={{ display: loadingOrder ? 'none' : '' }}>
        {!!availablePaymentMethods.length && formAction === 'none' && (
          <div className={isMobile ? styles.paymentList : ''}>
            <Title>
              <Title.Item title="store/checkoutless.userInfo.myCards">
                <CreditCard
                  fill={globalStyles.iconPrimary}
                  width={24}
                  height={24}
                />
              </Title.Item>
            </Title>

            {isDelete && (
              <Alert
                type="success"
                text="store/checkoutless.userInfo.paymentDeleted"
              />
            )}
            {hasError && (
              <Alert
                type="error"
                text="store/checkoutless.userInfo.deletePaymentError"
              />
            )}
            {warning.show && (
              <Alert
                type="warning"
                text={`store/checkoutless.userInfo.confirmDeletePayment`}
                link="store/checkoutless.userInfo.deleteLink"
                handleClick={handleClick}
                customText={warning.number}
              />
            )}
            <UnavailableMessage />
            {availablePaymentMethods?.map((paymentMethod) => {
              return (
                <PaymentMethod
                  key={paymentMethod.cardId}
                  paymentMethod={paymentMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                  onSelectPaymentMethod={handleSelectPaymentMethod}
                  handleDelete={handleDelete}
                  dues={dues}
                  cvv={cvv}
                  isValidCVC={isValidCVC}
                  setIsValidCVC={setIsValidCVC}
                  loadInputCVC={loadFS}
                  setSecureFields={setSecureFields}
                />
              )
            })}
            <a
              className={`${globalStyles.flexContainer} ${globalStyles.cursorPointer}`}
              onClick={handleCreate}
            >
              <Add fill={global.iconSecondary} />
              <p>
                {useFormatMessage(
                  'store/checkoutless.userInfo.otherPaymentMethod'
                )}
              </p>
            </a>
            {/* {!habeasData && <HabeasData />} */}

            <div className={styles.paymentMethodCouponContainer}>
              <Coupon />
            </div>

            <BuyButtonContainer
              canBuy={canBuy}
              classNameContainer={globalStyles.w100}
              cvv={cvv?.value}
              dues={dues?.value?.value}
              forceDisabled={forceDisabled}
              handleSubmit={handleSubmitBuyButton}
              secondary={true}
            />
          </div>
        )}
        {(!selectedMainPaymentMethod ||
          (formAction === 'add' && loadPaymentForm)) && (
          <Fragment>
            <UnavailableMessage />
            <PaymentForm gateway={gateway} />
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default PaymentMethods
