import React from 'react'

import { BuyButton } from './BuyButton'
import { useBuyButton } from './useBuyButton'

interface Props {
  canBuy?: boolean
  className?: string
  classNameContainer?: string
  cvv?: string
  dues?: string
  forceDisabled?: boolean
  handleSubmit?: any
  secondary?: boolean
  onClickDisabled?: () => void
}

const BuyButtonContainer = ({
  canBuy = true,
  className,
  classNameContainer,
  cvv,
  dues,
  forceDisabled = false,
  handleSubmit,
  secondary = false,
  onClickDisabled,
}: Props) => {
  const buyButton = useBuyButton(
    canBuy,
    className,
    classNameContainer,
    cvv,
    dues,
    forceDisabled,
    handleSubmit,
    secondary
  )

  return <BuyButton {...buyButton} onClickDisabled={onClickDisabled} />
}

export default BuyButtonContainer
