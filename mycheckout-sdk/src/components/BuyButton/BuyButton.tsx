import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '../shared'
import { formatter } from '../../utils'
import globalStyles from '../../myCheckout-styles.module.css'
import { setShowingBuyButton } from '../../contexts/global-context/reducers/uiSettingsSlice'

interface Props {
  canBuy: boolean
  className?: string
  classNameContainer?: string
  disabled: boolean
  forceDisabled: boolean
  loadingOrder: boolean
  isSimulationReady: boolean
  secondary?: boolean
  totalOfferings: number
  units: number
  value: number
  onClickDisabled?: () => void
  preHandleClick: () => void
}

export const BuyButton = ({
  canBuy,
  className,
  classNameContainer,
  disabled,
  forceDisabled,
  loadingOrder,
  isSimulationReady,
  secondary,
  totalOfferings,
  units,
  value,
  onClickDisabled,
  preHandleClick,
}: Props) => {
  const dispatchGlobal = useDispatch()

  useEffect(() => {
    dispatchGlobal(setShowingBuyButton(true))

    return () => {
      dispatchGlobal(setShowingBuyButton(false))
    }
  }, [])

  return (
    <div className={`${globalStyles.buyButtonContainer} ${classNameContainer}`}>
      <Button
        value={
          !isSimulationReady
            ? 'Calculando'
            : loadingOrder
            ? 'store/checkoutless.register.processingPayment'
            : 'store/checkoutless.register.pay'
        }
        onClick={preHandleClick}
        disabled={disabled || canBuy !== true || forceDisabled}
        customValue={`${formatter.format(value + totalOfferings)}`}
        units={units}
        className={className}
        secondary={secondary}
        onClickDisabled={onClickDisabled}
      />
    </div>
  )
}
