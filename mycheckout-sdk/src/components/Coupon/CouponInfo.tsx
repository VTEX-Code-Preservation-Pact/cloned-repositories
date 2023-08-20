import React from 'react'
import type { IntlShape } from 'react-intl'

import type { MarketingData } from '../../interfaces'

interface Props {
  global?: any
  intl: IntlShape
  marketingData: MarketingData
}

const CouponInfo = (props: Props) => {
  const { global, intl, marketingData } = props

  return (
    <div>
      <p className={`${global.textSm} ${global.gray}`}>
        {intl.formatMessage({ id: 'store/checkoutless.coupon' })}
      </p>
      <p>{marketingData?.coupon}</p>
    </div>
  )
}

export default CouponInfo
