import React, { Fragment } from 'react'

import Button from './Button'
import useButton from './useButton'

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

const ButtonContainer = (props: Props) => {
  const button = useButton()

  return (
    <Fragment>
      <Button {...props} {...button} />
    </Fragment>
  )
}

export default ButtonContainer
