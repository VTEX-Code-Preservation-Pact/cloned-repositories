import React, { Fragment, FC } from 'react'
import { useDevice } from 'vtex.device-detector'

const ResponsiveLayoutMobile: FC = ({ children }) => {
  const { isMobile } = useDevice()

  return isMobile ? <Fragment>{children}</Fragment> : null
}

export default ResponsiveLayoutMobile
