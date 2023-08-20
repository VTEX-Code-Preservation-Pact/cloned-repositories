import React, { Fragment, FC } from 'react'
import { useDevice } from 'vtex.device-detector'

const ResponsiveLayoutDesktop: FC = ({ children }) => {
  const { device } = useDevice()

  return device === 'desktop' ? <Fragment>{children}</Fragment> : null
}

export default ResponsiveLayoutDesktop
