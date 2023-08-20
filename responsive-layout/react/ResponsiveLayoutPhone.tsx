import React, { Fragment, FC } from 'react'
import { useDevice } from 'vtex.device-detector'

const ResponsiveLayoutPhone: FC = ({ children }) => {
  const { device } = useDevice()

  return device === 'phone' ? <Fragment>{children}</Fragment> : null
}

export default ResponsiveLayoutPhone
