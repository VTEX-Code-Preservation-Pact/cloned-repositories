import { useState } from 'react'

interface Option {
  label: string
  value: string
}

export const useSelectValue = (initialValue: Option) => {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(null)
  const onChange = (option: Option) => {
    setValue(option)
  }

  const reset = () => {
    setValue(null)
    setIsValid(null)
  }

  return { value, onChange, isValid, setIsValid, reset, setValue }
}
