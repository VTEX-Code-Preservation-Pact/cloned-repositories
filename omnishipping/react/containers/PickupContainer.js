import '@vtex/pickup-points-modal/lib/styles.css'

import { PICKUP_IN_STORE } from '../constants/index'
import React, { Component, Fragment } from 'react'
import {
  changeActivePickupDetails,
  changeActivePickupSeller,
} from '../actions/pickup-actions'
import { updateAddressForm } from '../actions/address-form-actions'
import { startVtexID } from '../actions/account-info-actions'
import {
  getSearchAddress,
  getSearchAddressReceiverName,
  isValidPostalGeolocation,
} from '../selectors/address-form-selectors'
import {
  getSelectedPickupPackages,
  hasSlas,
} from '../selectors/delivery-selectors'
import {
  hasLIWithOnlyScheduledDelivery,
  hasSelectedScheduledDelivery,
} from '../selectors/scheduled-delivery-selectors'

import AskForGeolocation from '../components/AskForGeolocation'
import PickupShipping from '../components/PickupShipping'
import PropTypes from 'prop-types'
import UnavailableDelivery from '../components/UnavailableDelivery'
import { connect } from 'react-redux'
import {
  getSellers,
  getSelectedDeliveryChannels,
} from '../selectors/order-form-selectors'
import { getUnavailableItems } from '../selectors/unavailable-selectors'
import { isDelivery, isPickup } from '../utils/DeliveryChannelsUtils'
import { helpers } from 'vtex.address-form'
const { injectRules } = helpers

class PickupContainer extends Component {
  handlePickupModal = pickupPackage => {
    this.props.changeActivePickupDetails({
      pickupPoint: this.getSLAItem(pickupPackage),
      askForGeolocation: false,
    })
    this.props.changeActivePickupSeller(pickupPackage.seller)
  }

  handlePickupModalList = pickupPackage => {
    this.props.changeActivePickupDetails({
      activePickupPoint: this.getSLAItem(pickupPackage),
      askForGeolocation: false,
    })
    this.props.changeActivePickupSeller(pickupPackage.seller)
  }

  handleChangeReceiverName = event => {
    const receiverName = { value: event.currentTarget.value }
    this.props.updateAddressForm({
      searchAddress: {
        ...this.props.searchAddress,
        receiverName,
      },
    })
  }

  getSLAItem = pickupPackage =>
    pickupPackage.slas.find(sla => sla.id === pickupPackage.selectedSla)

  render() {
    const {
      activeDeliveryChannel,
      canEditData,
      clientProfileData,
      hasLIWithOnlyScheduledDelivery,
      hasSlas,
      isValidPostalGeolocation,
      pickupPackages,
      receiverName,
      rules,
      sellers,
      selectedDeliveryChannels,
      startVtexID,
      storePreferencesData,
      unavailableItems,
    } = this.props

    const noPickupPackages = pickupPackages.length === 0

    const hasSplit = selectedDeliveryChannels.length > 1

    const showUnavailable =
      isPickup(activeDeliveryChannel) &&
      unavailableItems &&
      unavailableItems.items.length > 0 &&
      hasSlas

    return (
      <Fragment>
        {(!hasSlas || noPickupPackages) && <AskForGeolocation />}

        {showUnavailable && (
          <UnavailableDelivery
            activeDeliveryChannel={activeDeliveryChannel}
            unavailableItems={unavailableItems}
          />
        )}

        {(((isValidPostalGeolocation || !hasSlas) &&
          isDelivery(activeDeliveryChannel)) ||
          isPickup(activeDeliveryChannel)) &&
          pickupPackages &&
          pickupPackages.map(pickupPackage => (
            <PickupShipping
              canEditData={canEditData}
              clientProfileData={clientProfileData}
              hasLIWithOnlyScheduledDelivery={hasLIWithOnlyScheduledDelivery}
              hasSplit={hasSplit}
              key={pickupPackage.selectedSla + pickupPackage.shippingEstimate}
              onChangeReceiverName={this.handleChangeReceiverName}
              onClickPickupModal={() => this.handlePickupModal(pickupPackage)}
              onClickPickupModalList={() =>
                this.handlePickupModalList(pickupPackage)
              }
              onLogin={startVtexID}
              pickupPackage={pickupPackage}
              receiverName={receiverName}
              selectedRules={rules}
              selectedSlaItem={this.getSLAItem(pickupPackage)}
              sellers={sellers}
              storePreferencesData={storePreferencesData}
            />
          ))}
      </Fragment>
    )
  }
}

PickupContainer.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  canEditData: PropTypes.bool,
  changeActivePickupDetails: PropTypes.func.isRequired,
  changeActivePickupSeller: PropTypes.func.isRequired,
  clientProfileData: PropTypes.object,
  hasLIWithOnlyScheduledDelivery: PropTypes.bool.isRequired,
  hasSlas: PropTypes.bool.isRequired,
  isValidPostalGeolocation: PropTypes.bool.isRequired,
  pickupPackages: PropTypes.array,
  receiverName: PropTypes.string,
  searchAddress: PropTypes.object.isRequired,
  selectedDeliveryChannels: PropTypes.array.isRequired,
  rules: PropTypes.object.isRequired,
  sellers: PropTypes.array.isRequired,
  startVtexID: PropTypes.func.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
  unavailableItems: PropTypes.object,
  updateAddressForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  searchAddress: getSearchAddress(state),
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  hasSelectedScheduledDelivery: hasSelectedScheduledDelivery(state),
  hasLIWithOnlyScheduledDelivery: hasLIWithOnlyScheduledDelivery(state, {
    channel: PICKUP_IN_STORE,
  }),
  hasSlas: hasSlas(state),
  isValidPostalGeolocation: isValidPostalGeolocation(state),
  pickupPackages: getSelectedPickupPackages(state),
  receiverName: getSearchAddressReceiverName(state),
  sellers: getSellers(state),
  selectedDeliveryChannels: getSelectedDeliveryChannels(state),
  unavailableItems: getUnavailableItems(state),
  storePreferencesData: state.orderForm.storePreferencesData,
  clientProfileData: state.orderForm.clientProfileData,
  canEditData: state.orderForm.canEditData,
})

export default connect(
  mapStateToProps,
  {
    changeActivePickupSeller,
    changeActivePickupDetails,
    updateAddressForm,
    startVtexID,
  }
)(injectRules(PickupContainer))
