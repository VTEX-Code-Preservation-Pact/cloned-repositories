import React from 'react'
import type { IntlShape } from 'react-intl'

import Style from './style.module.css'
import type { ICredit } from '../../interfaces'
import { CreditApproved } from '../Icons'
import useFormatMessage from '../../i18n/useFormatMessage'
import { formatter } from '../../utils'

export const ApprovedCart = ({
  intl,
  credit,
}: {
  intl: IntlShape
  credit: ICredit
}) => {
  return (
    <div className={Style.cartCustomerCredit}>
      <div className={Style.cartCustomerCreditIcon}>
        <CreditApproved />
      </div>
      <div className={Style.cartCustomerCreditSuccessTitle}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.approved.title',
        })}
      </div>
      <div className={Style.cartCustomerCreditSuccessApproved}>
        {useFormatMessage(
          'store/checkoutless.register.customerCredit.study.approved.description',
          { value: <b>{formatter.format(credit?.approved)}</b> }
        )}
      </div>
      <div className={Style.cartCustomerCreditSuccessMessage}>
        {intl.formatMessage({
          id: 'store/checkoutless.register.customerCredit.study.approved.message',
        })}
      </div>
    </div>
  )
}
