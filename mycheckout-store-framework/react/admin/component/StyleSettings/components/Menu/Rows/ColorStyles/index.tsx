import React from 'react'
import { defineMessages, messages } from 'react-intl'

import type { TypeColorStyle } from '../../../../interfaces'
import { ColorPicker } from '../ColorPicker'
import styles from './styles.css'

const messages = defineMessages({
  textLabel: { id: 'checkoutless.styleSettings.menu.button.color-text' },
  outlineLabel: { id: 'checkoutless.styleSettings.menu.button.color-outline' },
  backgroundLabel: {
    id: 'checkoutless.styleSettings.menu.button.color-background',
  },
})

interface Props {
  action: (type: TypeColorStyle, color: string) => void
  getColorStyle: (type: TypeColorStyle) => string
  buttonStyle: 'normal' | 'hover'
}

export const ColorStyles = ({ buttonStyle, getColorStyle, action }: Props) => {
  const isNormal = buttonStyle === 'normal'
  const textType = isNormal ? 'normal_text' : 'hover_text'
  const backgroundType = isNormal ? 'normal_background' : 'hover_background'
  const outlineType = isNormal ? 'normal_outline' : 'hover_outline'

  return (
    <div>
      <div className={styles.colorPickerContainer}>
        <ColorPicker
          label={messages.textLabel}
          action={(color) => action(textType, color)}
          color={getColorStyle(textType)}
        />
      </div>
      <div className={styles.colorPickerContainer}>
        <ColorPicker
          label={messages.backgroundLabel}
          action={(color) => action(backgroundType, color)}
          color={getColorStyle(backgroundType)}
        />
      </div>
      <div className={styles.colorPickerContainer}>
        <ColorPicker
          label={messages.outlineLabel}
          action={(color) => action(outlineType, color)}
          color={getColorStyle(outlineType)}
        />
      </div>
    </div>
  )
}
