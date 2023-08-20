import React from 'react'

import { Totals } from './Totals'
import { useTotals } from './useTotals'

const TotalsContainer = () => {
  const totals = useTotals()

  return <Totals {...totals} />
}

export default TotalsContainer
