import React from 'react'
import type { IntlShape } from 'react-intl'

import { DenyCredit } from '../Icons'
import Style from './style.module.css'

export const DenyCart = ({ intl }: { intl: IntlShape }) => {
  return (
    <div className={Style.cartCustomerCredit}>
      <div className={Style.cartCustomerCreditIcon}>
        <DenyCredit />
      </div>
      <div className={Style.cartCustomerCreditDenyTitle}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.deny.title',
        })}
      </div>
      <div className={Style.cartCustomerCreditDenyMessage}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.deny.description',
        })}
      </div>
    </div>
  )
}
