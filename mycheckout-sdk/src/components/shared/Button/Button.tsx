import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setShowingBuyButton } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import styles from './button.css'

interface Props {
  value: string
  onClick?: (e: any) => void
  onClickDisabled?: () => void
  disabled?: boolean
  customValue?: string
  secondary?: boolean
  type?: string
  id?: string
  units?: number
  isFixed?: boolean
  className?: string
  isPaymentButton?: boolean
}

const Button = ({
  value,
  onClick,
  onClickDisabled,
  disabled = false,
  customValue,
  secondary,
  type = 'button',
  id,
  units,
  isFixed = false,
  className = '',
  isPaymentButton = false,
}: Props) => {
  const dispatchGlobal = useDispatch()

  useEffect(() => {
    if (!isPaymentButton || !isFixed) return undefined
    dispatchGlobal(setShowingBuyButton(true))

    return () => {
      dispatchGlobal(setShowingBuyButton(false))
    }
  }, [])

  return (
    <div className={isFixed ? styles.buttonPosition : global.w100}>
      {
        <div className={styles.buttonContent}>
          <input
            className={`${styles.buttonContainer} ${className}`}
            onClick={onClick}
            type={type}
            value={`${useFormatMessage(value, {
              price: customValue,
            })}${units ? ` - ${units} Und` : ''}`}
            disabled={disabled}
            id={id}
            data-secondary={secondary ? 'on' : 'off'}
          />
          {disabled && onClickDisabled && (
            <button
              className={styles.buttonDisabled}
              value=""
              onClick={onClickDisabled}
            />
          )}
        </div>
      }
    </div>
  )
}

export default Button
