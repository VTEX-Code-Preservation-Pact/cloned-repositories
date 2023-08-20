import React, { useMemo } from 'react'
import classNames from 'classnames'

import { usePayment } from '../../../contexts/PaymentContext'
import globalStyles from '../../../myCheckout-styles.module.css'
import labelStyles from './label.css'

export interface LabelProps {
  children?: any
  label: string
  paymentSystem?: string
  type: string
  useCustomLabel?: boolean
}

const Label = ({
  children,
  label,
  paymentSystem,
  type,
  useCustomLabel,
}: LabelProps) => {
  const { global, styles, paymentMethod, intl, onSelectedPayment } =
    usePayment()

  const labelClasses = classNames(
    paymentMethod === type && global.enphasis,
    paymentMethod === type && styles.radioEmphasis
  )

  return useMemo(
    () => (
      <div
        className={labelStyles.paymentLabelContainer}
        onClick={() => {
          onSelectedPayment(type, paymentSystem)
        }}
      >
        <input
          id={`payment-${type}`}
          type="radio"
          value={type}
          checked={paymentMethod === type}
          readOnly
          className={globalStyles.cursorPointer}
        />
        <label htmlFor={`payment-${type}`} className={labelClasses}>
          {useCustomLabel ? intl.formatMessage({ id: label }) : label}
          {children}
        </label>
      </div>
    ),
    [paymentMethod, type, label, intl]
  )
}

export default Label
