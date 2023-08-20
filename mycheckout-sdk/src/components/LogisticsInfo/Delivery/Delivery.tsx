import React from 'react'

import { Select } from '../../shared'
import ScheduleDelivery from '../ScheduleDelivery/ScheduleDeliveryContainer'
import styles from '../logisticsInfo-module.css'
import gridStyles from '../../../grid.module.css'
import globalStyles from '../../../myCheckout-styles.module.css'

interface Props {
  selectedSla: string
  formatedEstimateTime: any
  selectIcon: () => JSX.Element
  delivery: any
}

const Delivery = (props: Props) => {
  const { formatedEstimateTime, selectIcon, delivery, selectedSla } = props

  return (
    <div
      className={`${styles.shippingContainer} ${gridStyles.gridFormTwoCols} ${globalStyles.bigMarginBottom}`}
    >
      <div data-col="two-col">
        <Select
          options={formatedEstimateTime}
          placeholder="store/checkoutless.register.city"
          icon={selectIcon()}
          {...delivery}
        />
      </div>
      {selectedSla !== '' && <ScheduleDelivery />}
    </div>
  )
}

export default Delivery
