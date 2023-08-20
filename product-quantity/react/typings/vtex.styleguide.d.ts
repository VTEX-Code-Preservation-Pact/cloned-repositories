declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const NumericStepper: ComponentType<NumericStepperProps>
  export const Dropdown: ComponentType<DropdownProps>
  export const Input: ComponentType<InputProps>

  type NumericSize = 'small' | 'regular' | 'large'

  interface NumericStepperProps {
    size: NumericSize
    value: number
    minValue: number
    maxValue?: number
    unitMultiplier: number
    suffix?: string
    onChange: (e: any) => void
  }

  interface DropdownProps {
    id: string
    testId: string
    onChange: (e: any) => void
    placeholder: string
    options: Array<{
      value: number
      label: string
    }>
    size: NumericSize
    value: number
  }

  interface InputProps {
    id: string
    size: NumericSize
    value: string
    maxLength: number
    onChange: (e: any) => void
    onBlur: () => void
    placeholder: string
  }
}
