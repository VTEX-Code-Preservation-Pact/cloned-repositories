import React from 'react'
import type { IntlShape } from 'react-intl'

import { VerifiedCredit } from '../Icons'
import Style from './style.module.css'

export const VerifyCart = ({ intl }: { intl: IntlShape }) => {
  return (
    <div className={Style.cartCustomerCredit}>
      <div className={Style.cartCustomerCreditIcon}>
        <VerifiedCredit />
      </div>
      <div className={Style.cartCustomerCreditTitle}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.title',
        })}
      </div>
      <div className={Style.cartCustomerCreditDescription}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.description',
        })}
      </div>
    </div>
  )
}
