import React, { Fragment } from 'react'

import useFormatMessage from '../../../../i18n/useFormatMessage'
import global from '../../../../myCheckout-styles.module.css'
import { CvcCard, Danger, LiteDelete } from '../../../Icons'
import styles from '../input.css'

interface Props {
  blurValidation: () => void
  className?: string
  disabled?: boolean
  icon?: any
  info: boolean
  isValid?: boolean | null
  keyUpValidation: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  maxLength?: number
  name: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onPaste?: (
    e: React.ClipboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  placeholder: string
  reset: () => void
  setInfo: React.Dispatch<React.SetStateAction<boolean>>
  type?: string
  value: string
  showClearButton?: boolean
  floatLabel?: boolean
}

export const Text = (props: Props) => {
  const {
    blurValidation,
    className = '',
    disabled,
    icon,
    info,
    isValid,
    keyUpValidation,
    maxLength,
    name,
    onChange,
    onPaste,
    onKeyDown,
    placeholder,
    reset,
    setInfo,
    type = 'text',
    value,
    showClearButton = false,
    floatLabel = true,
  } = props

  return (
    <Fragment>
      {icon && <div className={styles.inputIconContainer}>{icon}</div>}
      <input
        className={`${styles.input} ${
          isValid && !disabled && styles.inputValid
        } ${isValid === false && styles.inputInvalid} ${className} ${
          icon && styles.inputWithIcon
        }`}
        type={type}
        value={value}
        onChange={onChange}
        onKeyUp={keyUpValidation}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onBlur={blurValidation}
        placeholder={useFormatMessage(placeholder)}
        autoComplete="off"
        id={name}
        disabled={disabled}
        maxLength={maxLength}
      />
      {floatLabel && (
        <label
          className={`${styles.labelPlaceholder} ${
            icon && styles.labelWithIcon
          }`}
        >
          {useFormatMessage(placeholder)}
        </label>
      )}
      {showClearButton && value?.length > 0 && disabled !== true && (
        <div
          className={`${styles.inputIconContainer} ${styles.inputDeleteIcon}`}
        >
          <a onClick={reset} className={global.cursorPointer}>
            <LiteDelete fill={global.iconAlternative} />
          </a>
        </div>
      )}
      {type === 'password' && value?.length < 1 && disabled !== true && (
        <div
          className={styles.inputIconContainer}
          onClick={() => setInfo(!info)}
        >
          <a onClick={reset} className={global.cursorPointer}>
            <Danger fill={'#FF9900'} />
          </a>
        </div>
      )}
      {type === 'password' && info && value?.length < 1 && (
        <div className={styles.inputIconContainer}>
          <p>{useFormatMessage('store/checkoutless.card.cvcInfo')}</p>
          <CvcCard />
        </div>
      )}
    </Fragment>
  )
}
