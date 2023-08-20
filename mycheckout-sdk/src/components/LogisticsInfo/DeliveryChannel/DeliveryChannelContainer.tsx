import React, { Fragment } from 'react'

import DeliveryChannel from './DeliveryChannel'
import useDeliveryChannel from './useDeliveryChannel'

const DeliveryChannelContainer = () => {
  const deliveryChannel = useDeliveryChannel()

  return (
    <Fragment>
      <DeliveryChannel {...deliveryChannel} />
    </Fragment>
  )
}

export default DeliveryChannelContainer
