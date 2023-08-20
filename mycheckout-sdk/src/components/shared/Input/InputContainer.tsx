import React from 'react'

import Input from './Input'
import useInput from './useInput'

interface Props {
  children?: any
  className?: string
  deleteBtn?: boolean
  disabled?: boolean
  errorMessage?: string
  floatLabel?: boolean
  icon?: any
  isValid?: boolean | null
  maxLength?: number
  name: string
  placeholder: string
  regularExpression?: RegExp
  showClearButton?: boolean
  showError?: boolean
  type?: string
  value: string
  blurFunction?: () => void
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onCustomKeyUpEvent?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onPaste?: (
    e: React.ClipboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  reset: () => void
  setIsValid?: (state: boolean) => void
}

const InputContainer = (props: Props) => {
  const input = useInput({ ...props })

  return <Input {...input} {...props} />
}

export default InputContainer
