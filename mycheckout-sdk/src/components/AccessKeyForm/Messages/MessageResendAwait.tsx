import React, { Fragment } from 'react'

import { MessageResendAwaitInfo } from './MessageResendAwaitInfo'
import styles from '../accessKeyForm.css'

interface Props {
  canSendCode: boolean
  second: number
  handleClick: () => void
  message?: string | boolean
}

export const MessageResendAwait = (props: Props) => {
  return (
    <Fragment>
      <div className={styles.accessKeyMessageContainer}>
        <MessageResendAwaitInfo {...props} />
      </div>
    </Fragment>
  )
}
