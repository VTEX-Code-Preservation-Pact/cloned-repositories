import React, { useEffect, useRef, useState } from 'react'

import { Danger, UnfilledCheck } from '../../Icons'

interface Props {
  duration?: number
  enableAutoClose: boolean
  hideOnClick: boolean
  icon?: JSX.Element
  isOpen: boolean
  type: 'success' | 'warning' | 'error' | 'relevant'
  handleClickClose?: () => void
}

export const useAlert = ({
  duration,
  enableAutoClose,
  hideOnClick,
  icon,
  isOpen,
  type,
  handleClickClose,
}: Props) => {
  const [showAlert, setShowAlert] = useState<boolean>(isOpen)
  const timeoutId = useRef<number>()

  const handleCloseAlert = () => {
    if (handleClickClose) handleClickClose()
    if (hideOnClick) setShowAlert(false)
  }

  useEffect(() => {
    if (enableAutoClose && isOpen) {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      setShowAlert(true)
      timeoutId.current = window.setTimeout(
        () => handleCloseAlert(),
        duration * 1000 || 5000
      )
    }
  }, [isOpen, enableAutoClose])

  const getIcon = () => {
    if (icon) {
      return icon
    }

    switch (type) {
      case 'success':
        return <UnfilledCheck width={16} height={16} fill={'#009e4e'} />

      case 'warning':
        return <Danger fill={'#FF9900'} warn="c" />

      case 'error':
        return <Danger fill={'#cb4242'} />

      case 'relevant':
        return <Danger fill={'#FFFFFF'} warn="c" />

      default:
        return <UnfilledCheck width={16} height={16} fill={'#009e4e'} />
    }
  }

  return {
    showAlert,
    getIcon,
    handleCloseAlert,
  }
}
