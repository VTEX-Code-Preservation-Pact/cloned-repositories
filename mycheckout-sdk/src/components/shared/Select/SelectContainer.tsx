import React, { Fragment } from 'react'

import Select from './Select'

interface Props {
  errorMessage?: string
  icon?: any
  isDisabled?: boolean
  isLoading?: boolean
  isValid?: boolean | null
  onBlur?: () => void
  onChange: (option: Option) => void
  onInputChange?: any
  options: Option[]
  placeholder: string
  setIsValid?: (state: boolean) => void
  value: Option
  disable?: boolean
  numOfItemsToShow?: number
}

interface Option {
  label: string
  value: string
}

const CustomSelect = (selectProps: Props) => {
  return (
    <Fragment>
      <Select {...selectProps} />
    </Fragment>
  )
}

export default CustomSelect
