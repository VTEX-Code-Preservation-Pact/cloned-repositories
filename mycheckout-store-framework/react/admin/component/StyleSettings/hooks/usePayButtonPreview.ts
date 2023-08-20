import { useEffect, useRef } from 'react'

import { useStyleSettings } from './context'
import { addButtonEvent, setStylesButton } from '../utils'

const CLASS = '_kuikpay-myCheckoutButton__myCheckoutButtonContent'

export const usePayButtonPreview = () => {
  const refPayButton = useRef(null)
  const {
    deviceSelected,
    state: { buttonStyles },
  } = useStyleSettings()

  useEffect(() => {
    if (refPayButton === null) return
    const { normal, borderRadius, font, width } = buttonStyles
    const payButton = document.getElementsByClassName(CLASS)

    setStylesButton(payButton[0], { ...normal, borderRadius, font, width })
    addButtonEvent('mouseout', payButton[0], {
      ...normal,
      borderRadius,
      font,
      width,
    })
  }, [refPayButton, buttonStyles])

  useEffect(() => {
    if (refPayButton === null) return
    const { hover, borderRadius, font, width } = buttonStyles
    const payButton = document.getElementsByClassName(CLASS)

    addButtonEvent('mouseover', payButton[0], {
      ...hover,
      borderRadius,
      font,
      width,
    })
  }, [refPayButton, buttonStyles.hover, buttonStyles])

  return { refPayButton, deviceSelected, value: buttonStyles.value }
}
