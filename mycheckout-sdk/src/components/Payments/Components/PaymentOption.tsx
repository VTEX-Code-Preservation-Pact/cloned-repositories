import React, { Fragment, useMemo } from 'react'

import { PaymentKey, PaymentsList } from '../Models/payments'
import type { LabelProps } from './Label'
import Label from './Label'
import useFormatMessage from '../../../i18n/useFormatMessage'
import globalStyle from '../../../myCheckout-styles.module.css'
import type { GroupPaymentMethods } from '../../../interfaces/simulation'

interface PaymentOptionProps {
  payments: Partial<GroupPaymentMethods>
  orion?: boolean
  customLabel?: string
  children?: React.ReactNode
  selected?: boolean
  paymentDataSection: string
}

const PaymentOption = ({
  payments,
  orion = false,
  customLabel,
  children,
  selected = false,
  paymentDataSection,
}: PaymentOptionProps) => {
  const orionText = useFormatMessage(
    'store/checkoutless.register.customerCredit',
    {
      store: <b>ORION</b>,
    }
  )

  const label: LabelProps = useMemo(() => {
    return customLabel
      ? {
          type: payments.groupName,
          label: customLabel,
          useCustomLabel: true,
        }
      : orion
      ? {
          type: PaymentsList.Orion,
          label: orionText,
          useCustomLabel: true,
        }
      : {
          type: payments.groupName,
          paymentSystem: payments.paymentMethods[0].id,
          label:
            payments.groupName !== PaymentKey.CreditCard
              ? payments.paymentMethods[0].name ||
                'store/checkoutless.register.creditCard'
              : 'store/checkoutless.register.creditCard',
          useCustomLabel: payments.groupName === PaymentKey.CreditCard,
        }
  }, [payments, orion, customLabel])

  return paymentDataSection === 'list' ? (
    <div className={globalStyle.borderBottom}>
      <Label {...label} />
    </div>
  ) : selected ? (
    <div>{children}</div>
  ) : (
    <Fragment />
  )
}

export default PaymentOption
