import React from 'react'
import { defineMessages } from 'react-intl'

import { RadioSettings } from './Rows/RadioSettings'
import { ButtonSettings } from './Rows/ButtonSettings'
import { FontSettings } from './Rows/FontSettings'
import { IconsSettings } from './Rows/IconsSettings'
import { BackgroundSettings } from './Rows/BackgroundSettings'
import { useModalMenu } from '../../hooks'

const messages = defineMessages({
  radioLabel: { id: 'checkoutless.styleSettings.menu-radio' },
})

export const ModalMenu = () => {
  const {
    font,
    iconsColor,
    borderRadius,
    backgroundColor,
    handleFontAction,
    handleIconsColorAction,
    handleBackgroundAction,
    handleBorderRadiusAction,
    getColorStyle,
    handleButtonStyleAction,
  } = useModalMenu()

  return (
    <>
      <FontSettings value={font} action={handleFontAction} />
      <IconsSettings color={iconsColor} action={handleIconsColorAction} />
      <BackgroundSettings
        color={backgroundColor}
        action={handleBackgroundAction}
      />
      <RadioSettings
        label={messages.radioLabel}
        value={borderRadius}
        action={handleBorderRadiusAction}
      />
      <ButtonSettings
        action={handleButtonStyleAction}
        getColorStyle={getColorStyle}
      />
    </>
  )
}
