import { createSelector } from 'reselect'
import {
  isPickup,
  isDelivery,
  isCurrentChannel,
} from '../utils/DeliveryChannelsUtils'

const componentActivitySelector = {
  activeDeliveryChannel: state => state.componentActivity.activeDeliveryChannel,
}

const currentChannelFromProps = (_, props) => props.channel

export const isActiveDeliveryChannelDelivery = createSelector(
  componentActivitySelector.activeDeliveryChannel,
  deliveryChannel => isDelivery(deliveryChannel)
)

export const isActiveDeliveryChannelPickup = createSelector(
  componentActivitySelector.activeDeliveryChannel,
  deliveryChannel => isPickup(deliveryChannel)
)

export const isCurrentChannelActive = createSelector(
  componentActivitySelector.activeDeliveryChannel,
  currentChannelFromProps,
  (deliveryChannel, channel) => isCurrentChannel(deliveryChannel, channel)
)
