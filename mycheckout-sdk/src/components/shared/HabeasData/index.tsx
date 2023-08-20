import React from 'react'

import { HabeasData } from './HabeasData'
import { useHabeasData } from './useHabeasData'

const HabeasDataContainer = () => {
  const habeasData = useHabeasData()

  return <HabeasData {...habeasData} />
}

export default HabeasDataContainer
