import React, { Fragment, useMemo } from 'react'
import { pathOr } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Loader } from '../shared'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { usePayment } from '../../contexts/PaymentContext'
import {
  selectPaymentDataSection,
  selectUserRegistrationSections,
  setNextUserRegistrationSections,
  setPaymentDataSection,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import CreditCart from './Components/CreditCart'
import CustomPayment from './Components/CustomPayment'
import Orion from './Components/Orion'
import PaymentOption from './Components/PaymentOption'
import { setPaymetId } from '../../contexts/global-context/reducers/orderFormDataSlice'
import { selectGroupAvailablePaymentMethods } from '../../contexts/global-context/reducers/simulationSlice'
import { useActions } from '../../contexts/ActionsProviderV2'

interface PaymentsRenderProps {
  units: number
  paymentInfo?: any
  totalOfferings: number
}

const PaymentsRender = ({ units, totalOfferings }: PaymentsRenderProps) => {
  const dispatchGlobal = useDispatch()
  const userRegistrationSections = useSelector(selectUserRegistrationSections)

  const { styles, paymentMethod: SelectPayment, paymentSystem } = usePayment()

  const { showPaymentMethods } = useActions()
  const paymentDataSection = useSelector(selectPaymentDataSection)

  const availablePaymentMethods = useSelector(
    selectGroupAvailablePaymentMethods
  )?.filter((availablePayment) => {
    const paymentId = availablePayment?.paymentMethods[0]?.id
    const foundPayment = showPaymentMethods?.find(
      (test) => test?.id === paymentId
    )

    return foundPayment?.id ? foundPayment?.show : true
  })

  const settings = useSelector(selectSettings)

  const orion = useMemo(() => pathOr(false, ['orion'], settings), [settings])

  return (
    <Fragment>
      <div className={styles.paymentMethodContainer} style={{ padding: 0 }}>
        {availablePaymentMethods.map((payment, index) => {
          if (payment.isCreditCard) {
            return (
              <PaymentOption
                key={payment.groupName}
                payments={payment}
                selected={SelectPayment === payment.groupName}
                paymentDataSection={paymentDataSection}
              >
                <CreditCart
                  key={`credit-payment-${index}`}
                  payments={payment}
                />
              </PaymentOption>
            )
          }

          return (
            <PaymentOption
              key={payment.groupName}
              payments={payment}
              selected={SelectPayment === payment.groupName}
              paymentDataSection={paymentDataSection}
            >
              <CustomPayment
                key={`custom-payment-${index}`}
                payments={payment}
                units={units}
                totalOfferings={totalOfferings}
              />
            </PaymentOption>
          )
        })}
        {orion && (
          <PaymentOption
            selected={
              paymentDataSection === 'details' && SelectPayment === 'creditpay'
            }
            paymentDataSection={paymentDataSection}
            payments={null}
            orion
          >
            <Orion units={units} totalOfferings={totalOfferings} />
          </PaymentOption>
        )}
        <PaymentOption
          customLabel="store/checkoutless.userInfo.otherPaymentMethod"
          payments={{ groupName: 'otherPayments' }}
          selected={SelectPayment === 'otherPayments'}
          paymentDataSection={paymentDataSection}
        >
          <Loader text="store/checkoutless.loading.almostThere" />
        </PaymentOption>
        {paymentDataSection === 'list' && (
          <Button
            value={'store/checkoutless.next'}
            disabled={!SelectPayment}
            onClick={() => {
              if (SelectPayment === 'otherPayments') {
                setTimeout(
                  () => window.open('/checkout/#/profile', '_blank'),
                  1500
                )
              }

              dispatchGlobal(setPaymetId(paymentSystem))

              if (userRegistrationSections >= 3) {
                dispatchGlobal(setNextUserRegistrationSections())
              } else {
                dispatchGlobal(setPaymentDataSection('details'))
              }
            }}
          />
        )}
      </div>
    </Fragment>
  )
}

export default PaymentsRender
