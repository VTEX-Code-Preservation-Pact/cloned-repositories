import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDeliveryChannel } from '../actions/component-activity-actions'
import { DELIVERY, PICKUP_IN_STORE } from '../constants'
import {
  getSearchAddress,
  hasValidPostalCode,
} from '../selectors/address-form-selectors'
import { isActiveDeliveryChannelDelivery } from '../selectors/delivery-channels-selectors'
import { hasPickups } from '../selectors/delivery-selectors'
import { checkIfHasGeoCoordinates } from '../utils/AddressFormUtils'
import styles from './DeliveryChannelsToggle.css'
import ToggleButton from './ToggleButton'

export class DeliveryChannelsToggle extends Component {
  handleClick = value => {
    const { isDisabled, selectDeliveryChannel } = this.props

    if (isDisabled) return

    selectDeliveryChannel(value)
  }

  render() {
    const {
      activeDeliveryChannel,
      isActiveDeliveryChannelDelivery,
      hasValidPostalCode,
      hasPickups,
      isDisabled,
      searchAddress,
      shouldShowToggle,
    } = this.props

    const hasGeoCoordinates = checkIfHasGeoCoordinates(searchAddress)

    return (
      <div
        className={classNames(
          styles.deliveryChannelsWrapper,
          'shipping-method-wrapper',
          {
            'is-active': shouldShowToggle,
            [styles.isActive]: shouldShowToggle,
            'shipping-valid-postal-code': hasValidPostalCode,
            'shipping-has-pickups': hasPickups || hasGeoCoordinates,
            [styles.isLoading]: isDisabled,
          }
        )}>
        <div
          className={classNames(
            'shipping-method-toggle',
            styles.deliveryChannelsToggle,
            {
              'shipping-method-toggle-delivery': isActiveDeliveryChannelDelivery,
              [`shipping-method-toggle-pickup ${
                styles.deliveryChannelsTogglePickup
              }`]: !isActiveDeliveryChannelDelivery,
            }
          )}
        />
        <ToggleButton
          activeTab={activeDeliveryChannel}
          isDisabled={isDisabled}
          onClick={this.handleClick}
          tabValue={DELIVERY}
          translateString={'deliver'}
        />
        <ToggleButton
          activeTab={activeDeliveryChannel}
          isDisabled={isDisabled}
          onClick={this.handleClick}
          tabValue={PICKUP_IN_STORE}
          translateString={'pickup'}
        />
      </div>
    )
  }
}

DeliveryChannelsToggle.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  hasPickups: PropTypes.bool,
  hasValidPostalCode: PropTypes.bool,
  isActiveDeliveryChannelDelivery: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  searchAddress: PropTypes.object,
  selectDeliveryChannel: PropTypes.func.isRequired,
  shouldShowToggle: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  isOmnishippingCompleted: state.componentActivity.isOmnishippingCompleted,
  isActiveDeliveryChannelDelivery: isActiveDeliveryChannelDelivery(state),
  searchAddress: getSearchAddress(state),
  hasPickups: hasPickups(state),
  hasValidPostalCode: hasValidPostalCode(state),
})

export default connect(
  mapStateToProps,
  {
    selectDeliveryChannel,
  }
)(DeliveryChannelsToggle)
