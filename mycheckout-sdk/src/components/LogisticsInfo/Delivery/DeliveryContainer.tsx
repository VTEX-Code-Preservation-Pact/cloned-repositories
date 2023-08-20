import React from 'react'

import Delivery from './Delivery'
import useDelivery from './useDelivery'

const DeliveryContainer = () => {
  const delivery = useDelivery()

  return <Delivery {...delivery} />
}

export default DeliveryContainer
