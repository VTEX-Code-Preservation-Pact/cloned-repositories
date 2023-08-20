import React from 'react'
import { Alert } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { useStyleSettings } from '../../hooks'

export const AlertMessage = () => {
  const { alert, clearAlert } = useStyleSettings()
  const { formatMessage } = useIntl()

  return alert.message.id !== '' ? (
    <div className="mb5">
      <Alert type={alert.type} onClose={clearAlert}>
        {formatMessage(alert.message)}
      </Alert>
    </div>
  ) : null
}
