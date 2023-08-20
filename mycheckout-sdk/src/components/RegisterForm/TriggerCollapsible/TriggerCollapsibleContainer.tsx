import React from 'react'

import type { Section } from '../../ViewValidate'
import { TriggerCollapsible } from './TriggerCollapsible'
import useTriggerCollapsible from './useTriggerCollapsible'

interface Props {
  text?: string
  icon?: JSX.Element
  open?: boolean
  id: Section
  show?: boolean
}

const TriggerCollapsibleContainer = (props: Props) => {
  const { validateAddressAlterAndLogistic } = useTriggerCollapsible(props.id)

  return (
    <TriggerCollapsible
      {...props}
      validateAddressAlterAndLogistic={validateAddressAlterAndLogistic}
    />
  )
}

export default TriggerCollapsibleContainer
