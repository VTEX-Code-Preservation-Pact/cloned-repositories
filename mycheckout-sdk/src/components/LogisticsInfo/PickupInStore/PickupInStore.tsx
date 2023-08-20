import React from 'react'

import { Select } from '../../shared'
import ScheduleDelivery from '../ScheduleDelivery/ScheduleDeliveryContainer'
import styles from '../logisticsInfo-module.css'
import type { SlaSimulation } from '../../../interfaces/simulation'
import useLogisticBlock from '../../../hooks/useLogisticBlock'

interface Props {
  selectedSla?: SlaSimulation
  formatedStore: any
  selectIcon: () => JSX.Element
  store: any
}

const PickupInStore = (props: Props) => {
  const { selectedSla, formatedStore, selectIcon, store } = props

  const { logisticsBlocked } = useLogisticBlock()

  return (
    <div className={styles.shippingContainer}>
      <Select
        options={formatedStore}
        placeholder="store/checkoutless.register.city"
        icon={selectIcon()}
        {...store}
        disable={logisticsBlocked}
      />
      {selectedSla && <ScheduleDelivery />}
    </div>
  )
}

export default PickupInStore
