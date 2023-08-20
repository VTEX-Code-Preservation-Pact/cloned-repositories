import React, { Fragment } from 'react'

import useFormatMessage from '../../../i18n/useFormatMessage'
import { Alert } from '../../Icons'
import { MessageResendAwait } from './MessageResendAwait'
import styles from '../accessKeyForm.css'

interface Props {
  second: number
  canSendCode: boolean
  handleClick: () => void
}

export const MessageAwaitFullPage = ({
  canSendCode,
  second,
  handleClick,
}: Props) => {
  return (
    <div className={styles.accessKeyFullPageContainer}>
      <div className={styles.accessKeyIconContent}>
        <Alert
          className={styles.accessKeyIcon}
          fill={styles.accessKeyIconFill}
          stroke={styles.accessKeyIconStroke}
        />
      </div>
      <Fragment>
        <h3 className={`${styles.accessKeyTitleMessage}`}>
          {useFormatMessage('store/checkoutless.accessKey.sessionExpireTitle')}
        </h3>
        <p className={`${styles.accessKeyTextMessage}`}>
          {useFormatMessage('store/checkoutless.accessKey.sessionExpireText', {
            minutes: Math.ceil(second / 60),
          })}
        </p>
      </Fragment>
      <Fragment>
        <MessageResendAwait
          {...{ canSendCode, handleClick, second }}
        ></MessageResendAwait>
      </Fragment>
    </div>
  )
}
