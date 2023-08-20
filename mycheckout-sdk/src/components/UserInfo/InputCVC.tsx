import React, { useRef, useEffect } from 'react'

import globalStyles from '../../myCheckout-styles.module.css'
import useFormatMessage from '../../i18n/useFormatMessage'

interface PropsInputCVCSF {
  className: any
  isValid?: boolean
  itemId: string
  showError?: boolean
  onRenderCvvContainer?: () => void
}

/**
 * Input CVC of Secure Field
 */

export const InputCVCSF = (props: PropsInputCVCSF) => {
  const { className, isValid, showError = true, onRenderCvvContainer } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref?.current || !onRenderCvvContainer) return
    onRenderCvvContainer()
  }, [ref])

  return (
    <div id={`cvv-container-inside`}>
      <div
        ref={ref}
        id={`cvv-placeholder`}
        className={`${className || ''}`}
      ></div>

      {showError && !isValid && isValid !== null && (
        <p className={globalStyles.labelError}>
          {useFormatMessage('store/checkoutless.card.invalidSecurityCodeError')}
        </p>
      )}
    </div>
  )
}
