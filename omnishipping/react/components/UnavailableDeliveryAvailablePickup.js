import { FormattedMessage } from 'react-intl'
import React, { Component } from 'react'

import { selectDeliveryChannel } from '../actions/component-activity-actions'
import ProductItems from './ProductItems'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUnavailableItems } from '../selectors/unavailable-selectors'
import styles from './UnavailableDelivery.css'
import { PICKUP_IN_STORE } from '../constants'
import Alert from './Alert'

export class UnavailableDeliveryAvailablePickup extends Component {
  handlePickupClick = event => {
    event.preventDefault()
    this.props.selectDeliveryChannel(PICKUP_IN_STORE)
  }
  render() {
    const { unavailableItems } = this.props

    if (!unavailableItems) return null
    const { items } = unavailableItems

    return (
      <Alert
        className={`shp-alert-shipping-unavailable ${styles.alert}`}
        footer={
          <div className={`shp-product-items ${styles.productItems}`}>
            <ProductItems isAvailable={false} items={unavailableItems.items} />
          </div>
        }>
        <p id="shp-unavailable-delivery-available-pickup">
          <FormattedMessage
            id="omnishipping.unavailableDeliveryAvailablePickup"
            values={{
              items: items.length,
            }}
          />
        </p>
        <button
          className={`${
            styles.pickupButton
          } button-unavailable-delivery-pickup`}
          onClick={this.handlePickupClick}>
          <FormattedMessage
            id="omnishipping.pickUpItems"
            values={{
              items: unavailableItems.items.length,
            }}
          />
        </button>
      </Alert>
    )
  }
}

UnavailableDeliveryAvailablePickup.propTypes = {
  selectDeliveryChannel: PropTypes.func.isRequired,
  unavailableItems: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  unavailableItems: getUnavailableItems(state, ownProps),
})

export default connect(
  mapStateToProps,
  {
    selectDeliveryChannel,
  }
)(UnavailableDeliveryAvailablePickup)
