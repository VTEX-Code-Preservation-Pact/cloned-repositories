import React from 'react'

import { OrderPlacedPending } from './OrderPlacedPending'
import { OrderPlaced } from './OrderPlaced'
import { useOrderPlaced } from './useOrderPlaced'

const OrderPlacedContainer = () => {
  const { status } = useOrderPlaced()

  if (status === 'pending') return <OrderPlacedPending />

  return <OrderPlaced />
}

export default OrderPlacedContainer
