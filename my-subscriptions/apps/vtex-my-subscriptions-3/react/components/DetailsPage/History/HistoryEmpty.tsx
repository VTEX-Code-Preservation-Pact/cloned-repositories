import React from 'react'
import { FormattedMessage } from 'react-intl'

const HistoryEmpty = () => (
  <div className="tc">
    <div className="mt5 lh-copy f5 serious-black">
      <FormattedMessage id="subscription.execution.no-order" />
    </div>
    <div className="lh-title f6 c-muted-1">
      <FormattedMessage id="subscription.execution.awaiting-first-cycle" />
    </div>
  </div>
)

export default HistoryEmpty
