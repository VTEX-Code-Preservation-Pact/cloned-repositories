import { useEffect, useRef, useState } from 'react'

import type { Message } from '../interfaces/interfaces'

interface Props {
  toastMessage: Message
  onClose?: () => void
}

export const useToast = ({ toastMessage, onClose }: Props) => {
  const [message, setMessage] = useState<Message>(null)
  const timeoutId = useRef<number>()

  const resetToast = () => {
    setMessage(null)
    if (onClose) onClose()
  }

  const handledClick = () => {
    resetToast()
  }

  useEffect(() => {
    if (toastMessage) {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      setMessage(toastMessage)
      timeoutId.current = window.setTimeout(() => resetToast(), 5000)
    }
  }, [toastMessage])

  return {
    message,
    resetToast,
    handledClick,
  }
}
