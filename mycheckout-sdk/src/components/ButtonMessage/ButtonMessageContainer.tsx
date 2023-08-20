import React, { Fragment, useMemo } from 'react'

import ButtonMessage from './ButtonMessage'
import useButtonMessage from './useButtonMessage'

interface Props {
  isVisible: boolean
}

const ButtonMessageContainer = (props: Props) => {
  const { isVisible } = props

  const { buttonMessage, isConfigured, message, styles } = useButtonMessage()
  const propsButton = { message, styles }

  return useMemo(() => {
    if (!isVisible || !isConfigured) return <Fragment />
    if (!message) return <Fragment />

    return <ButtonMessage {...propsButton} />
  }, [buttonMessage, isConfigured, isVisible, message])
}

export default ButtonMessageContainer
