import React from 'react'
import ReactDOM from 'react-dom'

import Wrapper from './KuikpayWrapper'
import { useRender } from './utils'

export const renderWrapper = () => {
  const { wrapper } = useRender()

  if (!wrapper) return
  ReactDOM.render(<Wrapper />, wrapper)
}
