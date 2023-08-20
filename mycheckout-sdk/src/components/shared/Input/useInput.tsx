import type React from 'react'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  children?: any
  className?: string
  disabled?: boolean
  errorMessage?: string
  isValid?: boolean | null
  maxLength?: number
  name: string
  placeholder: string
  regularExpression?: RegExp
  showError?: boolean
  type?: string
  value: string
  blurFunction?: () => void
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onCustomKeyDownEvent?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onCustomKeyUpEvent?: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  reset: () => void
  setIsValid?: (state: boolean) => void
}

const useInput = (props: Props) => {
  const [info, setInfo] = useState(false)
  const intl = useIntl()
  const {
    children,
    className = '',
    disabled,
    errorMessage,
    isValid,
    maxLength,
    name,
    placeholder,
    regularExpression,
    showError = true,
    type = 'text',
    value,
    blurFunction,
    onChange,
    onCustomKeyUpEvent,
    reset,
    setIsValid,
  } = props

  const keyUpValidation = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onCustomKeyUpEvent && onCustomKeyUpEvent(ev)
    if (regularExpression) {
      if (regularExpression.test(value)) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }
  }

  const blurValidation = () => {
    if (regularExpression) {
      if (regularExpression.test(value)) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }

    if (blurFunction) blurFunction()
  }

  useEffect(() => {
    if (value?.length > 0) setIsValid(true)
  }, [])

  return {
    children,
    className,
    disabled,
    errorMessage,
    info,
    intl,
    isValid,
    maxLength,
    name,
    placeholder,
    showError,
    type,
    value,
    blurValidation,
    keyUpValidation,
    onChange,
    reset,
    setInfo,
  }
}

export default useInput
