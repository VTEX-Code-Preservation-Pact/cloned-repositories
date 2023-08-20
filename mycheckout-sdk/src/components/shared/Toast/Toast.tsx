import React from 'react'

import useFormatMessage from '../../../i18n/useFormatMessage'
import { Check, LiteClose, BellIcon } from '../../Icons'
import type { Message } from '../interfaces/interfaces'
import { useToast } from './useToast'
import styles from './toast.modules.css'

interface Props {
  toastMessage: Message
  onClose?: () => void
}

export const Toast = ({ toastMessage, onClose }: Props) => {
  const { message, handledClick } = useToast({
    toastMessage,
    onClose,
  })

  return message ? (
    <div className={styles.toastContainer}>
      {message.type === 'success' && (
        <Check
          classNameCircule={styles.toastIconCheckCircule}
          fill={styles.toastIconCheck}
          height={24}
          width={24}
        />
      )}
      {message.type === 'info' && (
        <div className={styles.toastCircle}>
          <BellIcon />
        </div>
      )}

      <div className={styles.toastContent}>
        {message.header && (
          <span className={styles.toastContentHeader}>
            {useFormatMessage(message.header)}
          </span>
        )}
        {message.text && (
          <span className={styles.toastContentMessage}>
            {useFormatMessage(message.text)}
          </span>
        )}
      </div>

      <button
        className={styles.toastIconCloseContent}
        onClick={() => handledClick()}
      >
        <LiteClose fill={styles.toastIconClose} />
      </button>
    </div>
  ) : null
}
