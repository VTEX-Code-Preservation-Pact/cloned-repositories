import React, { useMemo } from 'react'

import { usePayment } from '../../../contexts/PaymentContext'
import type { LabelProps } from './Label'
import Label from './Label'
import { formatter } from '../../../utils'
import { Button } from '../../shared'
import globalStyles from '../../../myCheckout-styles.module.css'
import CouponContainer from '../../Coupon/CouponContainer'
import type { GroupPaymentMethods } from '../../../interfaces/simulation'

interface CreditCardProps {
  payments: GroupPaymentMethods
  units: number
  totalOfferings: number
}

const CustomPayment = ({
  payments,
  units,
  totalOfferings,
}: CreditCardProps) => {
  const { handleClick, styles, loadingOrder, disabled, value, paymentMethod } =
    usePayment()

  const payment = useMemo(() => payments.paymentMethods[0], [payments])

  const label: LabelProps = useMemo(
    () => ({
      type: payment.groupName,
      label: payment.name,
    }),
    [payment]
  )

  const show = useMemo(
    () => paymentMethod === payment.groupName,
    [paymentMethod, payment]
  )

  return useMemo(
    () => (
      <div className={styles.paymentMethodContainer}>
        <Label {...label} />
        {show && (
          <div>
            <div className={styles.paymentMethodPromissory}>
              {payment.description || label?.label}
            </div>
            <CouponContainer />
            <div className={globalStyles.buyButtonContainer}>
              <Button
                value={
                  loadingOrder
                    ? 'store/checkoutless.register.processingPayment'
                    : 'store/checkoutless.register.pay'
                }
                onClick={() =>
                  handleClick({
                    paymentMethod: payment.id,
                    gateway: 'custom',
                  })
                }
                disabled={disabled}
                customValue={`${formatter.format(value + totalOfferings)}`}
                units={units}
                isPaymentButton={true}
                isFixed={false}
              />
            </div>
          </div>
        )}
      </div>
    ),
    [show, value]
  )
}

export default CustomPayment
