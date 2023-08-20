import React from 'react'

import useFormatMessage from '../../../../i18n/useFormatMessage'
import styles from '../input.css'

interface Props {
  children?: any
  disabled?: boolean
  icon?: any
  isValid?: boolean | null
  name: string
  placeholder: string
  value: string
  blurValidation: () => void
  keyUpValidation: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export default function Select(props: Props) {
  const {
    children,
    disabled,
    icon,
    isValid,
    name,
    placeholder,
    value,
    blurValidation,
    keyUpValidation,
    onChange,
  } = props

  return (
    <select
      className={`${styles.input} ${isValid && styles.inputValid} ${
        isValid === false && styles.inputInvalid
      } ${icon && styles.inputIcon}`}
      placeholder={useFormatMessage(placeholder)}
      value={value}
      onChange={onChange}
      onKeyUp={keyUpValidation}
      onBlur={blurValidation}
      id={name}
      name={name}
      disabled={disabled}
    >
      {children}
    </select>
  )
}
