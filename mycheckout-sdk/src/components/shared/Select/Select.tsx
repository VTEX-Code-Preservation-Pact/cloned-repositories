import React, { useEffect, useState } from 'react'
import Select, { components } from 'react-select'

import useFormatMessage from '../../../i18n/useFormatMessage'
import { BellIcon, Dropdown } from '../../Icons'
import globalStyles from '../../../myCheckout-styles.module.css'
import styles from './select.module.css'
import Alert from '../Alert/Alert'

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

interface State {
  isFocused: boolean
}
interface Option {
  label: string
  value: string
}

const CustomSelect = (selectProps: Props) => {
  const [alertNonEditable, setAlertNonEditable] = useState(false)
  const {
    errorMessage,
    icon,
    isDisabled = false,
    isLoading,
    isValid,
    onBlur,
    onChange,
    onInputChange,
    options = [],
    placeholder,
    setIsValid,
    value,
    disable,
    numOfItemsToShow = 2,
  } = selectProps

  const error = isValid !== null ? (value?.value ? false : !isValid) : false

  const borderColor = '#a1c10c'
  const selectedColor = '#434343'

  const customStyles = {
    control: (provided: any, state: State) => {
      let borderBottom = '1px solid #707685'

      if (state.isFocused) {
        borderBottom = '1px solid #707685'
      } else if (isValid) {
        borderBottom = `1px solid ${borderColor}`
      } else if (error) {
        borderBottom = `1px solid #d7263d`
      }

      return {
        ...provided,
        width: '100%',
        borderRadius: '0px',
        margin: '0px 0px',
        boxShadow: '0',
        border: '0px',
        borderBottom,
        minHeight: '20px',
        background: 'none',
        height: '23px',
        paddingLeft: '3px',
      }
    },
    singleValue: (provided: any) => {
      let fontWeight = '300'

      if (isValid) fontWeight = '400 !important'

      return {
        ...provided,
        fontWeight,
      }
    },
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0px',
      marginBottom: '0px',
      position: 'relative',
      top: '-3px',
    }),
    menu: (provided: any) => ({
      ...provided,
      top: 'auto',
      position: 'absolute',
      zIndex: '101',
      border: '1px solid #898F9E',
      margin: '0px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: `${37.5 * numOfItemsToShow}px`,
      paddingBottom: '0px',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#FFF',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px solid #919191',
      backgroundColor: state.isSelected ? '#E0E2E796' : '#FFF',
      color: state.isSelected
        ? `${selectedColor} !important`
        : '#616161 !important',
      textAlign: 'center',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: '0px',
    }),
  }

  const Control = ({ children, ...props }: any) => {
    return (
      <components.Control {...props}>
        <span>{icon || ''}</span>
        {children}
      </components.Control>
    )
  }

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Dropdown
          fill={
            disable ? globalStyles.iconDisable : globalStyles.iconAlternative
          }
        />
      </components.DropdownIndicator>
    )
  }

  useEffect(() => {
    if (value !== null && value?.value !== 'placeholder') {
      setIsValid(true)
    }
  }, [value])

  const noOptionsMessage = useFormatMessage(
    'store/checkoutless.register.noOptions'
  )

  const loadingMessage = useFormatMessage(
    'store/checkoutless.register.alt.loading'
  )

  const PlaceHolder = (
    <div className={styles.selectPlaceholder}>
      {placeholder && useFormatMessage(placeholder)}
    </div>
  )

  return (
    <div>
      {disable && (
        <button
          className={styles.blockedPlaceholder}
          onClick={() => {
            setAlertNonEditable(true)
            setTimeout(() => {
              setAlertNonEditable(false)
            }, 10000)
          }}
        ></button>
      )}
      <Select
        components={
          icon ? { Control, DropdownIndicator } : { DropdownIndicator }
        }
        styles={customStyles}
        value={value}
        onChange={onChange}
        options={options}
        isLoading={isLoading}
        placeholder={PlaceHolder}
        onInputChange={onInputChange}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        isDisabled={isDisabled}
        onBlur={onBlur}
      />
      {alertNonEditable && (
        <div className={globalStyles.floatAlert}>
          <Alert
            type="warning"
            text="store/checkoutless.summary.nonEditableDelivery"
            icon={<BellIcon />}
          />
        </div>
      )}
      {error && errorMessage && (
        <p className={styles.labelError}>{useFormatMessage(errorMessage)}</p>
      )}
    </div>
  )
}

export default CustomSelect
