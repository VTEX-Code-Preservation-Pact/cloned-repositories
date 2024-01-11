import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { updateShippingData } from '../actions/order-form-actions'
import {
  showOmniShippingCompleted,
  editOmnishipping,
  selectDeliveryChannel,
} from '../actions/component-activity-actions'
import { shippingStatsEvent } from '../actions/metric-actions'
import { validateAddressFormFields } from '../actions/address-form-actions'
import { isValidAddress, getAddress } from '../selectors/address-form-selectors'
import {
  getDefaultShipsTo,
  getShippingData,
  isPickupOnly,
  getAvailableDeliveryChannels,
} from '../selectors/order-form-selectors'
import {
  isPaymentButtonActive,
  shouldCompleteOmnishipping,
} from '../selectors/omnishipping-selectors'

import OmniShippingHeading from '../components/OmniShippingHeading'
import OmniShippingBody from '../components/OmniShippingBody'

import styles from './OmniShippingContainer.css'
import { helpers } from 'vtex.address-form'

const { injectRules } = helpers

class OmniShippingContainer extends Component {
  handleModifyDeliveryOptions = () => {
    this.props.showOmniShippingCompleted(false)
    this.props.editOmnishipping(true)
  }

  render() {
    const {
      address,
      giftRegistryData,
      availableDeliveryChannels,
      isOmniShippingCompleted,
      isOmniShippingOpen,
      hasAvailableDeliveryChannelPickup,
      shouldDisableToggle,
    } = this.props

    return (
      <div
        className={classNames(
          'step accordion-group shipping-data',
          [styles.shippingData],
          {
            [styles.shippingDataDev]: process.env.NODE_ENV !== 'production',
            [styles.container]: !isPaymentButtonActive,
            active: isOmniShippingOpen && !isOmniShippingCompleted,
          }
        )}>
        <OmniShippingHeading
          isOmniShippingCompleted={isOmniShippingCompleted}
          onHandleModifyDeliveryOptions={this.handleModifyDeliveryOptions}
        />
        <OmniShippingBody
          address={address}
          giftRegistryData={giftRegistryData}
          availableDeliveryChannels={availableDeliveryChannels}
          hasAvailableDeliveryChannelPickup={hasAvailableDeliveryChannelPickup}
          isOmniShippingCompleted={isOmniShippingCompleted}
          isPaymentButtonActive={isPaymentButtonActive}
          shouldDisableToggle={shouldDisableToggle}
        />
      </div>
    )
  }
}

OmniShippingContainer.propTypes = {
  address: PropTypes.object,
  availableDeliveryChannels: PropTypes.array,
  defaultShipsTo: PropTypes.string,
  editOmnishipping: PropTypes.func.isRequired,
  giftRegistryData: PropTypes.object,
  hasAvailableDeliveryChannelPickup: PropTypes.bool.isRequired,
  isOmniShippingCompleted: PropTypes.bool.isRequired,
  isOmniShippingOpen: PropTypes.bool.isRequired,
  isPaymentButtonActive: PropTypes.bool,
  isPickupOnly: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool,
  rules: PropTypes.object,
  selectDeliveryChannel: PropTypes.func.isRequired,
  shippingData: PropTypes.object,
  shippingStatsEvent: PropTypes.func.isRequired,
  shouldCompleteOmnishipping: PropTypes.bool.isRequired,
  shouldDisableToggle: PropTypes.bool.isRequired,
  showOmniShippingCompleted: PropTypes.func.isRequired,
  updateShippingData: PropTypes.func.isRequired,
  validateAddressFormFields: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  address: getAddress(state),
  defaultShipsTo: getDefaultShipsTo(state),
  giftRegistryData: state.orderForm.giftRegistryData,
  isOmniShippingCompleted: state.componentActivity.isOmniShippingCompleted,
  isOmniShippingOpen: state.componentActivity.isOmniShippingOpen,
  shouldDisableToggle: state.delivery.shouldDisableToggle,
  isPaymentButtonActive: isPaymentButtonActive(state),
  availableDeliveryChannels: getAvailableDeliveryChannels(state),
  isValidAddress: isValidAddress(state),
  shippingData: getShippingData(state),
  shouldCompleteOmnishipping: shouldCompleteOmnishipping(state),
  hasAvailableDeliveryChannelPickup: state.componentActivity.hasPickup,
  isPickupOnly: isPickupOnly(state),
})

export default connect(
  mapStateToProps,
  {
    editOmnishipping,
    shippingStatsEvent,
    showOmniShippingCompleted,
    updateShippingData,
    validateAddressFormFields,
    selectDeliveryChannel,
  }
)(injectRules(OmniShippingContainer))
