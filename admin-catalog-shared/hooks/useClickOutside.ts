import { useState, useEffect, useRef } from 'react'

export function useClickOutside(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState<boolean>(false)
  const exceptionRef = useRef(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current) {
        setVisible(false)
        return
      }

      if (
        ref.current === event.target ||
        ref.current.contains(event.target as Node)
      ) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  function handleExceptionClick() {
    exceptionRef.current = true
  }

  return { visible, setVisible, handleExceptionClick }
}
