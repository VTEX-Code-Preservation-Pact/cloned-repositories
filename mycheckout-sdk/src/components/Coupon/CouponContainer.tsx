import React from 'react'

import Coupon from './Coupon'
import useCoupon from './useCoupon'

interface Props {
  borderBottom?: boolean
}

const CouponContainer = ({ borderBottom }: Props) => {
  const couponProps = { ...useCoupon(), borderBottom }

  return <Coupon {...couponProps} />
}

export default CouponContainer
