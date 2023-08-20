import React from 'react'
import { defineMessages } from 'react-intl'

import {
  ButtonSettings,
  FontSettings,
  NameSettings,
  RadioSettings,
} from './Rows'
import { usePayButtonMenu } from '../../hooks'

const messages = defineMessages({
  radioLabel: { id: 'checkoutless.styleSettings.menu-radio' },
  widthLabel: { id: 'checkoutless.styleSettings.menu-width' },
})

export const PayButtonMenu = () => {
  const {
    borderRadius,
    font,
    valueButton,
    // width,
    getColorStyle,
    handleBorderRadiusAction,
    handleButtonStyleAction,
    handleFontAction,
    handleNameAction,
    // handleWidthAction,
  } = usePayButtonMenu()

  return (
    <>
      <NameSettings value={valueButton} action={handleNameAction} />
      <FontSettings value={font} action={handleFontAction} />
      <RadioSettings
        label={messages.radioLabel}
        value={borderRadius}
        action={handleBorderRadiusAction}
      />
      {/* <RadioSettings
        label={messages.widthLabel}
        maxValue={999}
        value={width}
        action={handleWidthAction}
      /> */}
      <ButtonSettings
        getColorStyle={getColorStyle}
        action={handleButtonStyleAction}
      />
    </>
  )
}
