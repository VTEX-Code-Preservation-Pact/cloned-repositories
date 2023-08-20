import type { FunctionComponent } from 'react'
import React, { Fragment } from 'react'

import { useSimulation } from './useSimulation'

export const Simulation: FunctionComponent = ({ children }) => {
  useSimulation()

  return <Fragment>{children}</Fragment>
}
