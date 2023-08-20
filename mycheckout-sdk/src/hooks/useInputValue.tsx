import { useState } from 'react'

export const useInputValue = (
  initialValue: string,
  beforeOfChange?: (value: string) => string,
  beforeOfReset?: () => void
) => {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(null)
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let newValue = e.target.value

    if (beforeOfChange && beforeOfChange instanceof Function) {
      newValue = beforeOfChange(newValue)
    }

    setValue(newValue)
  }

  const reset = () => {
    if (beforeOfReset && beforeOfChange instanceof Function) {
      beforeOfReset()
    }

    setValue('')
    setIsValid(null)
  }

  return { value, isValid, setIsValid, onChange, reset, setValue }
}
