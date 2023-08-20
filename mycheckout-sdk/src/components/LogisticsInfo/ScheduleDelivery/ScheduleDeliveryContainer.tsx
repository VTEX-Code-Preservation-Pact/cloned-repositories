import React from 'react'

import ScheduleDelivery from './ScheduleDelivery'
import useScheduleDelivery from './useScheduleDelivery'

const scheduleDeliveryContainer = () => {
  const scheduleDelivery = useScheduleDelivery()

  return <ScheduleDelivery {...scheduleDelivery} />
}

export default scheduleDeliveryContainer
