import React, { Fragment } from 'react'

import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import styles from '../accessKeyForm.css'

interface Props {
  canSendCode: boolean
  handleClick: () => void
  message?: string | boolean
  second: number
}

export const MessageResendAwaitInfo = (props: Props) => {
  const { canSendCode, handleClick, message, second } = props

  return (
    <Fragment>
      {canSendCode ? (
        <Fragment>
          {message && (
            <p className={styles.accessKeyCountdownSecondsMessage}>{message}</p>
          )}
          <a
            onClick={handleClick}
            className={`${global.underline} ${styles.accessKeyColorGreen}`}
          >
            {useFormatMessage('store/checkoutless.accessKey.resendCode')}
          </a>
        </Fragment>
      ) : (
        <Fragment>
          <p className={styles.accessKeyCountdownSecondsMessage}>
            {useFormatMessage(
              'store/checkoutless.accessKey.countdownSecondsMessage'
            )}
          </p>
          <p className={styles.accessKeyColorGreen}>
            {useFormatMessage('store/checkoutless.accessKey.countdownSeconds', {
              seconds: second,
            })}
          </p>
        </Fragment>
      )}
    </Fragment>
  )
}
