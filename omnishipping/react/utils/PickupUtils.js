import uniqBy from 'lodash/uniqBy'
import flatten from 'lodash/flatten'
import { isPickup } from '../utils/DeliveryChannelsUtils'

export function getPickupOptions(logisticsInfo) {
  const pickupPoints = uniqBy(
    flatten(logisticsInfo.map(li => li.slas.filter(sla => isPickup(sla)))),
    'id'
  )

  return pickupPoints.map(pickupPoint => {
    const price = logisticsInfo.reduce((accPrice, currLi) => {
      const currentPickupPoint = currLi.slas.find(
        sla => sla.id === pickupPoint.id
      )

      return currentPickupPoint ? accPrice + currentPickupPoint.price : 0
    }, 0)

    return {
      ...pickupPoint,
      price,
    }
  })
}
