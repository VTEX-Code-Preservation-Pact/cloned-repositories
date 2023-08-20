import React from 'react'
import type { IntlShape } from 'react-intl'

import styles from './input.css'
import Select from './Select/Select'
import { Text } from './Text/Text'

interface Props {
  children?: any
  className?: string
  deleteBtn?: boolean
  disabled?: boolean
  errorMessage?: string
  floatLabel?: boolean
  icon?: any
  info: boolean
  intl: IntlShape
  isValid?: boolean | null
  maxLength?: number
  name: string
  placeholder: string
  showClearButton?: boolean
  showError?: boolean
  type?: string
  value: string
  blurValidation: () => void
  keyUpValidation: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onFocus?: (
    e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onPaste?: (
    e: React.ClipboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  reset: () => void
  setInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const Input = (props: Props) => {
  const {
    type = 'text',
    errorMessage,
    isValid = false,
    className = '',
    showError = true,
    intl,
  } = props

  return (
    <div className={`${styles.inputContent} ${className}`}>
      <div className={styles.groupInput}>
        {type === 'select' ? <Select {...props} /> : <Text {...props} />}
      </div>
      {showError && isValid === false && errorMessage && (
        <p className={styles.inputLabelError}>
          {intl.formatMessage({ id: errorMessage })}
        </p>
      )}
    </div>
  )
}

export default Input
