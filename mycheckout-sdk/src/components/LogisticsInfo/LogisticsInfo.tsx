import React, { useMemo } from 'react'

import Delivery from './Delivery/DeliveryContainer'
import PickupInStore from './PickupInStore/PickupInStoreContainer'
import { usePackagesManager } from './Packages/usePackagesManager'

const LogisticsInfo = () => {
  const { deliveryChannel } = usePackagesManager()

  return useMemo(
    () => (
      <div>
        {deliveryChannel === 'delivery' ? <Delivery /> : <PickupInStore />}
      </div>
    ),
    [deliveryChannel]
  )
}

export default LogisticsInfo
