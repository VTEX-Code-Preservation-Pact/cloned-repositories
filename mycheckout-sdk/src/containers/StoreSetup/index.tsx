import type { FunctionComponent } from 'react'
import React, { Fragment } from 'react'

import type { InitialProps } from '../../interfaces'
import { useStoreSetup } from './useStoreSetup'

const StoreSetup: FunctionComponent<InitialProps> = ({
  children,
  ...props
}) => {
  useStoreSetup(props)

  return <Fragment>{children}</Fragment>
}

export default StoreSetup
