import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import { getSearchAddress } from '../selectors/address-form-selectors'
import { getLogisticsInfo } from '../selectors/delivery-selectors'
import {
  changeActivePickupDetails,
  closePickupModal,
} from '../actions/pickup-actions'
import { changeActiveSLAOption } from '../actions/order-form-actions'
import { PickupPointsModal } from 'vtex.pickup-points-modal'
import { helpers } from 'vtex.address-form'
const { injectRules } = helpers

class PickupPointsModalContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      activePickupPoint,
      askForGeolocation,
      isSearching,
      selectedPickupPoint,
      searchAddress,
    } = this.props

    return (
      activePickupPoint !== nextProps.activePickupPoint ||
      selectedPickupPoint !== nextProps.selectedPickupPoint ||
      askForGeolocation !== nextProps.askForGeolocation ||
      isSearching !== nextProps.isSearching ||
      !isEqual(searchAddress, nextProps.searchAddress)
    )
  }

  render() {
    const {
      askForGeolocation,
      activePickupPoint,
      googleMapsKey,
      intl,
      isSearching,
      items,
      logisticsInfo,
      pickupOptions,
      pickupPoints,
      rules,
      searchAddress,
      selectedPickupPoint,
      activeSellerId,
      storePreferencesData,
    } = this.props

    return (
      <PickupPointsModal
        activePickupPoint={activePickupPoint}
        askForGeolocation={askForGeolocation}
        changeActivePickupDetails={this.props.changeActivePickupDetails}
        changeActiveSLAOption={this.props.changeActiveSLAOption}
        closePickupPointsModal={this.props.closePickupModal}
        googleMapsKey={googleMapsKey}
        intl={intl}
        isSearching={isSearching}
        items={items}
        logisticsInfo={logisticsInfo}
        onAddressChange={this.props.onSearchAddressChange}
        pickupOptions={pickupOptions}
        pickupPoints={pickupPoints}
        rules={rules}
        searchAddress={searchAddress}
        selectedPickupPoint={selectedPickupPoint}
        sellerId={activeSellerId}
        storePreferencesData={storePreferencesData}
      />
    )
  }
}

PickupPointsModalContainer.propTypes = {
  activePickupPoint: PropTypes.object,
  activeSellerId: PropTypes.string.isRequired,
  askForGeolocation: PropTypes.bool, // eslint-disable-line
  changeActivePickupDetails: PropTypes.func.isRequired,
  changeActiveSLAOption: PropTypes.func.isRequired,
  closePickupModal: PropTypes.func.isRequired,
  googleMapsKey: PropTypes.string.isRequired,
  intl: intlShape,
  isSearching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  logisticsInfo: PropTypes.array.isRequired,
  onSearchAddressChange: PropTypes.func.isRequired,
  pickupOptions: PropTypes.array.isRequired,
  pickupPoints: PropTypes.array.isRequired,
  rules: PropTypes.object.isRequired,
  searchAddress: PropTypes.object.isRequired,
  selectedPickupPoint: PropTypes.object,
  storePreferencesData: PropTypes.object,
}

const mapStateToProps = state => ({
  activePickupPoint: state.pickup.activePickupPoint,
  askForGeolocation: state.pickup.askForGeolocation,
  googleMapsKey: state.accountInfo.googleMapsKey,
  isSearching: state.pickup.isSearching,
  items: state.orderForm.items,
  logisticsInfo: getLogisticsInfo(state),
  pickupOptions: state.pickup.pickupOptions,
  pickupPoints: state.orderForm.shippingData.pickupPoints,
  searchAddress: getSearchAddress(state),
  selectedPickupPoint: state.pickup.pickupPoint,
  activeSellerId: state.pickup.activeSellerId,
  storePreferencesData: state.orderForm.storePreferencesData,
})

export default connect(
  mapStateToProps,
  {
    changeActivePickupDetails,
    changeActiveSLAOption,
    closePickupModal,
  }
)(injectRules(injectIntl(PickupPointsModalContainer)))
