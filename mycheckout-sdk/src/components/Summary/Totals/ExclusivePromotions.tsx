import React from 'react'
import { useIntl } from 'react-intl'

import { formatter } from '../../../utils'
import global from '../../../myCheckout-styles.module.css'

const messages = {
  free: {
    id: 'store/checkoutless.summary.free',
  },
}

interface Props {
  isGift?: boolean
  key: number
  text: string | number
}

export const ExclusivePromotions = ({ isGift = false, key, text }: Props) => {
  const intl = useIntl()

  if (typeof text === 'string') {
    if (text.length >= 28) text = `${text.substring(0, 27)}...`

    return <p>{text}</p>
  }

  return (
    <p key={key} className={`${global.textBase}`}>
      {isGift
        ? intl.formatMessage(messages.free)
        : formatter.format(text / 100)}
    </p>
  )
}
