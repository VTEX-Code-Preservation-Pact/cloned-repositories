import React, { useState } from 'react'
import { Tabs, Tab } from 'vtex.styleguide'
import { defineMessages, messages } from 'react-intl'

import { Row } from './Row'
import { ColorStyles } from './ColorStyles'
import type { TypeColorStyle } from '../../../interfaces'

const messages = defineMessages({
  buttonLabel: { id: 'checkoutless.styleSettings.menu-button' },
})

interface Props {
  action: (type: TypeColorStyle, color: string) => void
  getColorStyle: (type: TypeColorStyle) => string
}

export const ButtonSettings = ({ getColorStyle, action }: Props) => {
  const [currentTab, setCurrentTab] = useState(1)

  return (
    <Row label={messages.buttonLabel}>
      <Tabs fullWidth>
        <Tab
          label="Normal"
          active={currentTab === 1}
          onClick={() => setCurrentTab(1)}
        >
          <ColorStyles
            key="normal"
            getColorStyle={getColorStyle}
            action={action}
            buttonStyle="normal"
          />
        </Tab>
        <Tab
          label="Hover"
          active={currentTab === 2}
          onClick={() => setCurrentTab(2)}
        >
          <ColorStyles
            key="hover"
            getColorStyle={getColorStyle}
            action={action}
            buttonStyle="hover"
          />
        </Tab>
      </Tabs>
    </Row>
  )
}
