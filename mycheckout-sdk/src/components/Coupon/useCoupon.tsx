import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { useActions } from '../../contexts/ActionsProviderV2'
import { useUserData } from '../../contexts/UserDataProvider'
import { useInputValue } from '../../hooks/useInputValue'
import type { Message } from '../../interfaces'
import { EnterCouponEvent } from '../../events'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'

const useCoupon = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const { hasGoogleAnalytics } = useSelector(selectSettings)

  const coupon = useInputValue('')
  const intl = useIntl()
  const { insertCoupon } = useActions()
  const { messages, marketingData } = useUserData()

  const handleClick = () => {
    insertCoupon(coupon.value)
  }

  const deleteCoupon = () => {
    insertCoupon('')
  }

  const onBlur = () => {
    if (coupon.value.length === 0) coupon.setIsValid(null)
  }

  useEffect(() => {
    const err = messages?.find(
      (message: Message) =>
        message.code === 'couponNotFound' || message.code === 'couponExpired'
    )

    if (coupon.value && marketingData?.coupon === coupon.value) {
      setSuccess(true)
      coupon.setIsValid(true)
    } else {
      setSuccess(false)
    }

    if (!err) {
      setError(null)

      return
    }

    setError(err)

    if (err) {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }

    if (err && coupon.value) coupon.setIsValid(false)
  }, [messages, marketingData])

  useEffect(() => {
    if (coupon.value.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [coupon.value])

  useEffect(() => {
    if (success) EnterCouponEvent({ option: coupon.value, hasGoogleAnalytics })
  }, [success])

  return {
    coupon,
    disabled,
    error,
    intl,
    marketingData,
    success,
    deleteCoupon,
    handleClick,
    onBlur,
  }
}

export default useCoupon
