import React, { Fragment } from 'react'

import Summary from '../Summary'
import UnavailableMessage from './UnavailableMessage/UnavailableMessageContainer'
import globalStyles from '../../myCheckout-styles.module.css'

const Cart = () => {
  return (
    <Fragment>
      <UnavailableMessage />
      <Summary className={globalStyles.inMobile} isCollapsible={false} />
    </Fragment>
  )
}

export default Cart
