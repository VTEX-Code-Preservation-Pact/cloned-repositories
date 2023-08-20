import React from 'react'

import { PaymentPending } from '../Icons'
import useFormatMessage from '../../i18n/useFormatMessage'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './orderPlaced.modules.css'

export const OrderPlacedPending = () => {
  return (
    <div className={styles.orderPlacedContainer}>
      <div className={styles.orderPlacedContent}>
        <PaymentPending
          className={styles.orderPlacedIcon}
          fill={globalStyles.iconSecondary}
        />

        <p className={styles.orderPlacedTextTitlePending}>
          {useFormatMessage('store/checkoutless.orderPlaced.pending')}
        </p>
        <p className={`${styles.orderPlacedTextPending}`}>
          {useFormatMessage('store/checkoutless.orderPlaced.pendingMessage')}
        </p>
      </div>
    </div>
  )
}
