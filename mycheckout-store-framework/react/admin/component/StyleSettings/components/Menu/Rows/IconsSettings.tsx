import React from 'react'
import { defineMessages, messages } from 'react-intl'

import { Row } from './Row'
import { ColorPicker } from './ColorPicker'

const messages = defineMessages({
  iconsLabel: { id: 'checkoutless.styleSettings.menu-icons' },
  iconsColorLabel: { id: 'checkoutless.styleSettings.menu.icons-color' },
})

interface Props {
  color: string
  action: (color: string) => void
}

export const IconsSettings = ({ color, action }: Props) => {
  return (
    <Row label={messages.iconsLabel}>
      <div style={{ paddingTop: 8 }}>
        <ColorPicker
          label={messages.iconsColorLabel}
          color={color}
          action={action}
          position="bottom"
        />
      </div>
    </Row>
  )
}
