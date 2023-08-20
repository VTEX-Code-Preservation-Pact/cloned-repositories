import React from 'react'

import { Check } from '../Icons'
import useFormatMessage from '../../i18n/useFormatMessage'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './orderPlaced.modules.css'

export const OrderPlaced = () => {
  return (
    <div className={styles.orderPlacedContainer}>
      <div className={styles.orderPlacedContent}>
        <Check
          className={styles.orderPlacedIcon}
          fill={globalStyles.iconSecondary}
        />

        <p className={styles.orderPlacedTextThanks}>
          {useFormatMessage('store/checkoutless.orderPlaced.thanks')}
        </p>
        <p className={`${styles.orderPlacedText} ${globalStyles.inDesktop}`}>
          {useFormatMessage(
            'store/checkoutless.orderPlaced.confirmationMessage'
          )}
        </p>
      </div>
    </div>
  )
}
