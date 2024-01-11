import { createSelector } from 'reselect'
import get from 'lodash/get'
import uniqBy from 'lodash/uniqBy'
import flatten from 'lodash/flatten'
import { isFromCurrentSeller } from '../utils/SellerUtils'
import { isPickup } from '../utils/DeliveryChannelsUtils'

const pickupSelector = {
  activeSellerId: state => state.pickup.activeSellerId,
  pickupPoint: state => state.pickup.pickupPoint,
}

const orderFormSelector = {
  items: state => get(state, 'orderForm.items'),
}

const SDPath = 'orderForm.shippingData'
const hasLogisticsInfo = state => get(state, `${SDPath}.logisticsInfo`)
const shippingDataSelector = {
  logisticsInfo: state => hasLogisticsInfo(state) || [],
}

const pickupPointSelector = (_, props) => props.pickupPoint
const sellerIdSelector = (_, props) => props.sellerId

export const getUnavailableItemsAmount = createSelector(
  orderFormSelector.items,
  shippingDataSelector.logisticsInfo,
  pickupPointSelector,
  sellerIdSelector,
  (items, logisticsInfo, pickupPoint, sellerId) =>
    items.filter(
      (item, index) =>
        item.seller === sellerId &&
        logisticsInfo[index] &&
        !!logisticsInfo[index].deliveryChannels.find(channel =>
          isPickup(channel)
        ) &&
        logisticsInfo[index].slas.find(sla => sla.id === pickupPoint.id) ===
          undefined
    ).length
)

function getPickupPoints(logisticsInfo, pickupPoint, sellerId, items) {
  const selectedSla = uniqBy(
    logisticsInfo
      .filter(
        li => (sellerId ? isFromCurrentSeller({ items, li, sellerId }) : true)
      )
      .map(item => item.slas.find(sla => sla.id === pickupPoint.id)),
    'id'
  )
    .filter(item => item)
    .shift()

  return (
    selectedSla && {
      ...selectedSla,
      price: logisticsInfo
        .filter(
          li => (sellerId ? isFromCurrentSeller({ items, li, sellerId }) : true)
        )
        .map(item => item.slas.find(sla => sla.id === pickupPoint.id))
        .filter(item => item)
        .reduce(
          (previousPrice, nextSla) =>
            nextSla ? previousPrice + nextSla.price : 0,
          0
        ),
    }
  )
}

export const getPickupPointsById = createSelector(
  shippingDataSelector.logisticsInfo,
  pickupPointSelector,
  sellerIdSelector,
  orderFormSelector.items,
  getPickupPoints
)

export const getPickupOptionsBySeller = createSelector(
  shippingDataSelector.logisticsInfo,
  orderFormSelector.items,
  pickupSelector.activeSellerId,
  (logisticsInfo, items, sellerId) =>
    uniqBy(
      flatten(
        logisticsInfo
          .filter(
            li =>
              sellerId ? isFromCurrentSeller({ items, li, sellerId }) : true
          )
          .map(li => li.slas.filter(sla => isPickup(sla)))
      ),
      'id'
    )
)
