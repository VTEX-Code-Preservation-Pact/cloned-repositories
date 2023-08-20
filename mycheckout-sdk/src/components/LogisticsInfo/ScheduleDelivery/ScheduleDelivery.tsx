import React, { Fragment, useEffect } from 'react'

import { Select } from '../../shared'
import type { SlaSimulation } from '../../../interfaces/simulation'

interface Props {
  deliveryDate: any
  deliveryTime: any
  formatedEstimateDate: any
  formatedEstimateTime: any
  numOfItemsToShow: number
  selectedSla: SlaSimulation
  selectIconCalendar: () => JSX.Element
  selectIconClock: () => JSX.Element
}

const ScheduleDelivery = (props: Props) => {
  const {
    deliveryDate,
    deliveryTime,
    formatedEstimateDate,
    formatedEstimateTime,
    numOfItemsToShow,
    selectedSla,
    selectIconCalendar,
    selectIconClock,
  } = props

  useEffect(() => {
    if (selectedSla?.availableDeliveryWindow.length > 0) return
    deliveryDate.reset()
    deliveryTime.reset()
  }, [selectedSla])

  return (
    <Fragment>
      {selectedSla?.availableDeliveryWindow.length > 0 && (
        <Fragment>
          <Select
            options={formatedEstimateDate}
            placeholder="store/checkoutless.logistics.date"
            icon={selectIconCalendar()}
            numOfItemsToShow={numOfItemsToShow}
            {...deliveryDate}
          />
          <Select
            options={formatedEstimateTime}
            placeholder="store/checkoutless.logistics.date"
            numOfItemsToShow={numOfItemsToShow}
            icon={selectIconClock()}
            {...deliveryTime}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

export default ScheduleDelivery
