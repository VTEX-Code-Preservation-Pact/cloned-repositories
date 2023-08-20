import React from 'react'

import PickupInStore from './PickupInStore'
import usePickupInStore from './usePickupInStore'

const PickupInStoreContainer = () => {
  const pickupInStore = usePickupInStore()

  return <PickupInStore {...pickupInStore} />
}

export default PickupInStoreContainer
