import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import React from 'react'
import type { IntlShape } from 'react-intl'

import type { MarketingData, Message } from '../../interfaces'
import { LiteDelete, Offer } from '../Icons'
import { Button, Input } from '../shared'
import CouponInfo from './CouponInfo'
import global from '../../myCheckout-styles.module.css'
import styles from './coupon.css'
import InfoItem from '../shared/InfoItem'
import { Tag } from '../Icons/Tag'

interface CouponType {
  isValid: any
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  reset: () => void
  setIsValid: Dispatch<any>
  setValue: Dispatch<SetStateAction<string>>
}

interface Props {
  borderBottom: boolean
  coupon: CouponType
  disabled: boolean
  error: Message
  intl: IntlShape
  marketingData: MarketingData
  deleteCoupon: () => void
  handleClick: () => void
  onBlur: () => void
}

const Coupon = (props: Props) => {
  const {
    borderBottom,
    coupon,
    disabled,
    intl,
    marketingData,
    deleteCoupon,
    handleClick,
    onBlur,
  } = props

  return (
    <div className={global.w100}>
      {marketingData?.coupon ? (
        <div className={`${styles.inputValid}`}>
          <InfoItem>
            <InfoItem.Icon>
              <Offer />
            </InfoItem.Icon>
            <InfoItem.Content>
              <CouponInfo
                global={global}
                intl={intl}
                marketingData={marketingData}
              />
            </InfoItem.Content>
            <InfoItem.Edit
              style={{ flex: 0, justifyContent: 'end' }}
              className={global.cursorPointer}
              icon={<LiteDelete fill={global.iconAlternative} />}
              onClick={deleteCoupon}
            />
          </InfoItem>
        </div>
      ) : (
        <div
          className={`${styles.couponContainer} ${
            borderBottom ? global.borderBottom : ''
          }`}
        >
          <div className={styles.couponContentInput}>
            <Input
              placeholder="store/checkoutless.coupon.textInput"
              name="coupon"
              className={styles.couponInput}
              {...coupon}
              errorMessage="store/checkoutless.coupon.error"
              floatLabel={false}
              icon={<Tag width={18} height={18} />}
              showClearButton={true}
              blurFunction={onBlur}
            />
          </div>
          <div className={styles.couponContentButon}>
            {!disabled && (
              <Button
                onClick={handleClick}
                value={'store/checkoutless.coupon.action'}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Coupon
