import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'
import { isCurrentChannel } from './../utils/DeliveryChannelsUtils'
import PickupContainer from './../containers/PickupContainer'
import styles from './../containers/OmniShipping.css'
import { helpers } from 'vtex.address-form'
const { injectAddressContext } = helpers

export class DeliveryChannelsPickup extends PureComponent {
  render() {
    const {
      activeDeliveryChannel,
      channel,
      index,
      intl,
      googleMapsKey,
      hasSelectedDeliveryChannelPickup,
      onChangeAddress,
      selectedDeliveryChannels,
    } = this.props

    const isCurrentChannelActive = isCurrentChannel(
      activeDeliveryChannel,
      channel
    )

    const isBorderVisible = selectedDeliveryChannels.length > 1 && index === 0

    return (
      (isCurrentChannelActive || hasSelectedDeliveryChannelPickup) && (
        <Fragment>
          {selectedDeliveryChannels.length > 1 && (
            <div className={styles.deliverTitle}>
              {translate(intl, 'pickupSomeItems')}
            </div>
          )}
          <PickupContainer
            googleMapsKey={googleMapsKey}
            onChangeAddress={onChangeAddress}
          />
          {isBorderVisible && <div className={styles.hr} />}
        </Fragment>
      )
    )
  }
}

DeliveryChannelsPickup.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  googleMapsKey: PropTypes.string,
  hasSelectedDeliveryChannelPickup: PropTypes.bool.isRequired,
  hasSlas: PropTypes.bool,
  index: PropTypes.number.isRequired,
  intl: intlShape,
  isValidPostalGeolocation: PropTypes.bool,
  onChangeAddress: PropTypes.func,
  selectedDeliveryChannels: PropTypes.array,
}

export default injectAddressContext(injectIntl(DeliveryChannelsPickup))
