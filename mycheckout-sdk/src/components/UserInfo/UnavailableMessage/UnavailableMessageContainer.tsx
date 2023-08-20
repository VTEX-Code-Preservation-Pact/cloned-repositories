import React from 'react'

import UnavailableMessage from './UnavailableMessage'
import useUnavailableMessage from './useUnavailableMessage'

const UnavailableMessageContainer = () => {
  const unavailableMessage = useUnavailableMessage()

  return <UnavailableMessage {...unavailableMessage} />
}

export default UnavailableMessageContainer
