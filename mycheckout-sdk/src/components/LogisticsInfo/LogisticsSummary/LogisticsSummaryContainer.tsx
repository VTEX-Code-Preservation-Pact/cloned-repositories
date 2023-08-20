import React from 'react'

import LogisticsSummary from './LogisticsSummary'
import useLogisticsSummary from './useLogisticsSummary'

interface Props {
  className?: string
  onClick: () => void
  disabledAction?: boolean
  alternativeAction?: () => void
}

const LogisticsSummaryContainer = (props: Props) => {
  const logisticsSummary = useLogisticsSummary()

  return <LogisticsSummary {...props} {...logisticsSummary} />
}

export default LogisticsSummaryContainer
