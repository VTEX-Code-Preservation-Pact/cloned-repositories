import React, { Fragment } from 'react'

import useFormatMessage from '../../../i18n/useFormatMessage'
import globalStyles from '../../../myCheckout-styles.module.css'
import styles from './alert.css'
import { useAlert } from './useAlert'

export interface Props {
  className?: string
  classNameText?: string
  classNameDescription?: string
  customText?: string
  description?: string
  duration?: number
  enableAutoClose?: boolean
  hideOnClick?: boolean
  icon?: JSX.Element
  isOpen?: boolean
  link?: string
  text: string
  type: 'success' | 'warning' | 'error' | 'relevant'
  handleClick?: () => void
  handleClickClose?: () => void
}

const Alert = ({
  className,
  classNameText,
  classNameDescription,
  customText,
  description,
  duration,
  enableAutoClose = false,
  hideOnClick = true,
  icon,
  isOpen = true,
  link,
  text,
  type,
  handleClick,
  handleClickClose,
}: Props) => {
  const { showAlert, getIcon, handleCloseAlert } = useAlert({
    duration,
    enableAutoClose,
    hideOnClick,
    icon,
    isOpen,
    type,
    handleClickClose,
  })

  return showAlert ? (
    <Fragment>
      <div
        className={`${styles.container} ${styles[className]}`}
        data-type={type}
        onClick={() => handleCloseAlert()}
      >
        <div className={styles.iconContainer}>{getIcon()}</div>
        <div className={styles.textContainer}>
          <p
            className={`${globalStyles.textBase} ${styles.textError} ${styles[classNameText]}`}
          >
            {useFormatMessage(text, { customText })}
            {link && (
              <a
                onClick={handleClick}
                className={`${globalStyles.textBase} ${styles.textError} ${styles.linkError}`}
              >
                {useFormatMessage(link)}
              </a>
            )}
          </p>
          {description && (
            <span
              className={`${styles.alertDescription} ${styles[classNameDescription]}`}
            >
              {useFormatMessage(description)}
            </span>
          )}
        </div>
      </div>
      {type === 'relevant' && <div className={styles.containerArrow}></div>}
    </Fragment>
  ) : null
}

export default Alert
