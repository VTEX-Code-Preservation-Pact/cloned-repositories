import React from 'react'
import { FormattedMessage } from 'react-intl'

export const OptionsMessage = () => {
  return (
    <div className="dn">
      <FormattedMessage id="checkoutless.statistics.filter.select" />
      <FormattedMessage id="checkoutless.statistics.filter.today" />
      <FormattedMessage id="checkoutless.statistics.filter.yesterday" />
      <FormattedMessage id="checkoutless.statistics.filter.lastWeek" />
      <FormattedMessage id="checkoutless.statistics.filter.lastMonth" />
      <FormattedMessage id="checkoutless.statistics.filter.person" />
    </div>
  )
}
