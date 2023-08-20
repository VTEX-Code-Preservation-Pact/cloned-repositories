import React, { useEffect, useMemo } from 'react'

import { usePayment } from '../../../contexts/PaymentContext'
import { PaymentsList } from '../Models/payments'
import useFormatMessage from '../../../i18n/useFormatMessage'
import type { LabelProps } from './Label'
import Label from './Label'
import { useCustomerCredit } from '../../../hooks/useCustomerCredit'
import { formatter } from '../../../utils'
import CustomerCreditPayment from '../../CustomerCreditPayment'
import { Button } from '../../shared'
import globalStyles from '../../../myCheckout-styles.module.css'
import CouponContainer from '../../Coupon/CouponContainer'

interface OrionProps {
  units: number
  totalOfferings: number
}

const Orion = ({ units, totalOfferings }: OrionProps) => {
  const { styles, paymentMethod, loadingOrder, handleClick, disabled, value } =
    usePayment()

  const {
    simulationCredit,
    credit,
    onSimulationCredit,
    showMinMessage,
    onChangePaymet,
    validateCredit,
    canPayWithCredit,
  } = useCustomerCredit()

  useEffect(() => {
    if (paymentMethod === PaymentsList.Orion) {
      onSimulationCredit()
    }

    onChangePaymet()
  }, [paymentMethod])

  const label: LabelProps = {
    type: PaymentsList.Orion,
    label: useFormatMessage('store/checkoutless.register.customerCredit', {
      store: <b>ORION</b>,
    }),
    useCustomLabel: true,
  }

  const showCustomerCreditPaymentMessage = useMemo(
    () => credit?.credit && showMinMessage,
    [credit, showMinMessage]
  )

  const showCustomerCreditPayment = useMemo(
    () => paymentMethod === PaymentsList.Orion && !showMinMessage,
    [paymentMethod, showMinMessage]
  )

  const showBuyButton = useMemo(
    () => paymentMethod === PaymentsList.Orion,
    [paymentMethod]
  )

  const message = useFormatMessage(
    'store/checkoutless.register.customerCredit.study.initialmessage',
    {
      value: (
        <b>{formatter.format(simulationCredit?.quotaValue)}, sin interés.</b>
      ),
      quantity: <b>{simulationCredit?.quotaQuantity} cuotas mensuales</b>,
    }
  )

  return (
    <div className={styles.paymentMethodContainer}>
      <Label {...label}>
        {simulationCredit && !showMinMessage && (
          <div
            className={styles.paymentCustomCreditLabel}
            style={{
              marginLeft: paymentMethod === 'bnpl' ? -28 : 0,
              boxShadow: paymentMethod === 'bnpl' && 'none',
            }}
          >
            {message}
          </div>
        )}
        {showCustomerCreditPaymentMessage && (
          <div className={styles.paymentCustomCreditLabel}>
            {useFormatMessage(
              'store/checkoutless.register.customerCredit.study.approved.minmessage',
              { value: <b>{formatter.format(credit?.approved)}</b> }
            )}
          </div>
        )}
      </Label>
      {showCustomerCreditPayment && (
        <CustomerCreditPayment
          credit={credit}
          validateCredit={validateCredit}
        />
      )}
      <CouponContainer />
      {showBuyButton && (
        <div className={globalStyles.buyButtonContainer}>
          <Button
            value={
              loadingOrder
                ? 'store/checkoutless.register.processingPayment'
                : 'store/checkoutless.register.pay'
            }
            onClick={() =>
              handleClick({
                paymentMethod: 'BNPL',
                gateway: 'creditpay',
              })
            }
            disabled={!canPayWithCredit || disabled}
            customValue={`${formatter.format(value + totalOfferings)}`}
            units={units}
            isPaymentButton={true}
          />
        </div>
      )}
    </div>
  )
}

export default Orion
