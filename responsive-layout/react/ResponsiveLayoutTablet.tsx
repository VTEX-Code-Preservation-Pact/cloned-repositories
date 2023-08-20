import React, { Fragment, FC } from 'react'
import { useDevice } from 'vtex.device-detector'

const ResponsiveLayoutTablet: FC = ({ children }) => {
  const { device } = useDevice()

  return device === 'tablet' ? <Fragment>{children}</Fragment> : null
}

export default ResponsiveLayoutTablet
