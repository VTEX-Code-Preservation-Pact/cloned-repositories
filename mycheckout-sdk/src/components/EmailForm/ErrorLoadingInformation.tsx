import React from 'react'

import { Button } from '../shared'
import styles from './emailForm.css'
import { ErrorLoading } from '../Icons/ErrorLoading'
import useFormatMessage from '../../i18n/useFormatMessage'
import globalStyles from '../../myCheckout-styles.module.css'

interface Props {
  handleClick: () => void
}

export const ErrorLoadingInformation = ({ handleClick }: Props) => {
  return (
    <div className={styles.errorLoadingInfoContainer}>
      <ErrorLoading />

      <div className={styles.errorLoadinInfoTextContainer}>
        <h4>{useFormatMessage('store/checkoutless.user.sorry')}</h4>
        <p className={globalStyles.textBase}>
          {useFormatMessage('store/checkoutless.user.error')}
        </p>
      </div>

      <Button
        value="store/checkoutless.user.error.retry"
        onClick={handleClick}
      />
    </div>
  )
}
