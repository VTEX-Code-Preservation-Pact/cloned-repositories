import type { ChangeEvent } from 'react'
import React from 'react'
import { Input } from 'vtex.styleguide'
import { defineMessages, messages, useIntl } from 'react-intl'

import { Row } from './Row'

const messages = defineMessages({
  nameLabel: { id: 'checkoutless.styleSettings.menu-name' },
  nameInputPlaceholder: {
    id: 'checkoutless.styleSettings.menu.button.input-placeholder',
  },
})

interface Props {
  value: string
  action: (args: string) => void
}

export const NameSettings = ({ value, action }: Props) => {
  const { formatMessage } = useIntl()

  return (
    <Row label={messages.nameLabel}>
      <Input
        placeholder={formatMessage(messages.nameInputPlaceholder)}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => action(e.target.value)}
        maxLength={32}
      />
    </Row>
  )
}
