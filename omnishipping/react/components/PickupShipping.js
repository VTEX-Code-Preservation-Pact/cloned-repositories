import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import { PICKUP_IN_STORE } from '../constants'
import PickupPoint from './PickupPoint'
import PickupPriceAndShippingEstimate from './PickupPriceAndShippingEstimate'
import PropTypes from 'prop-types'
import ScheduledDeliveryToggle from './ScheduledDeliveryToggle'
import PickupReceiver from './PickupReceiver'
import styles from './PickupShipping.css'
import { translate } from '../utils/i18nUtils'
import { hasDeliveryWindows } from '../utils/SlasUtils'

class PickupShipping extends Component {
  state = {
    isEditingReceiverName: false,
  }

  handleClickPickupModal = () => this.props.onClickPickupModal()

  handleClickPickupModalList = () => this.props.onClickPickupModalList()

  handleEditReceiverName = () => {
    if (!this.props.canEditData) {
      this.props.onLogin()
    } else {
      this.setState({
        isEditingReceiverName: true,
      })
    }
  }

  handleChangeReceiverName = e => {
    const { onChangeReceiverName } = this.props
    onChangeReceiverName && onChangeReceiverName(e)
  }

  render() {
    const {
      hasLIWithOnlyScheduledDelivery,
      hasSplit,
      intl,
      pickupPackage,
      selectedSlaItem,
      selectedRules,
      storePreferencesData,
      clientProfileData,
      sellers,
      receiverName,
    } = this.props

    const { isEditingReceiverName } = this.state

    const customerName =
      clientProfileData &&
      `${clientProfileData.firstName} ${clientProfileData.lastName}`

    const hasSelectedSlaAndDeliveryWindows =
      selectedSlaItem && hasDeliveryWindows(selectedSlaItem)
    return (
      <div
        className={`${styles.deliveryGroupContent} delivery-group-content`}
        key={pickupPackage.selectedSla}>
        {selectedSlaItem && (
          <div className={styles.findPickup}>
            <PickupPoint
              onClickPickupModal={this.handleClickPickupModal}
              onClickPickupModalList={this.handleClickPickupModalList}
              pickupPoint={selectedSlaItem}
              selectedRules={selectedRules}
            />
          </div>
        )}

        {hasSelectedSlaAndDeliveryWindows && (
          <ScheduledDeliveryToggle channel={PICKUP_IN_STORE} />
        )}

        {selectedSlaItem &&
          !hasDeliveryWindows(selectedSlaItem) &&
          !hasLIWithOnlyScheduledDelivery && (
          <PickupPriceAndShippingEstimate
            hasSplit={hasSplit}
            items={pickupPackage.items}
            price={pickupPackage.price}
            shippingEstimate={pickupPackage.shippingEstimate}
            storePreferencesData={storePreferencesData}
          />
        )}

        {selectedSlaItem &&
          sellers.length > 1 && (
          <p className={styles.sellerText}>
            {translate(intl, 'productsFromSeller', {
              seller: pickupPackage.sellerName,
            })}
          </p>
        )}

        {clientProfileData && (
          <PickupReceiver
            isEditing={isEditingReceiverName}
            onChange={this.handleChangeReceiverName}
            onEdit={this.handleEditReceiverName}
            value={receiverName || customerName}
          />
        )}
      </div>
    )
  }
}

PickupShipping.propTypes = {
  canEditData: PropTypes.bool,
  clientProfileData: PropTypes.object,
  hasLIWithOnlyScheduledDelivery: PropTypes.bool.isRequired,
  hasSplit: PropTypes.bool.isRequired,
  intl: intlShape,
  onChangeReceiverName: PropTypes.func,
  onClickPickupModal: PropTypes.func.isRequired,
  onClickPickupModalList: PropTypes.func.isRequired,
  onLogin: PropTypes.func,
  pickupPackage: PropTypes.object.isRequired,
  receiverName: PropTypes.string,
  selectedRules: PropTypes.object.isRequired,
  selectedSlaItem: PropTypes.object.isRequired,
  sellers: PropTypes.array.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
}

export default injectIntl(PickupShipping)
