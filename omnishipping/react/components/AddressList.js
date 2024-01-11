import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'
import { startVtexID } from '../actions/account-info-actions'
import { addDeliveryAddress } from '../actions/address-form-actions'
import {
  showAddressList,
  showAddress,
  editAddress,
  newAddressEvent,
} from '../actions/component-activity-actions'

import {
  getSelectedDeliveryAddress,
  getAvailableDeliveryAddresses,
} from '../selectors/order-form-selectors'

import { isGiftRegistry, isSearch } from '../utils/AddressFormUtils'

import AddressItem from '../components/AddressItem'
import styles from './AddressList.css'
import { helpers } from 'vtex.address-form'

const { injectRules } = helpers

class AddressList extends Component {
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.canEditData &&
      nextProps.isLoggedIn &&
      nextProps.isEditAddressActive
    ) {
      this.editSelectedAddress()
    } else if (
      nextProps.canEditData &&
      nextProps.isLoggedIn &&
      nextProps.newAddressEvent &&
      nextProps.isNewAddressActive
    ) {
      this.newAddress()
    }
  }

  handleEditSelectAddress = () => {
    const isGiftList = isGiftRegistry(this.props.selectedAddress)
    if (this.props.canEditData && (this.props.isLoggedIn || isGiftList)) {
      this.editSelectedAddress()
    } else {
      this.props.startVtexID(this.props.editAddress)
    }
  }

  handleAddNewAddress = () => {
    const isGiftList = isGiftRegistry(this.props.selectedAddress)
    if (this.props.canEditData && (this.props.isLoggedIn || isGiftList)) {
      this.newAddress()
    } else {
      this.props.startVtexID(this.props.newAddressEvent)
    }
  }

  editSelectedAddress = () => {
    this.props.editAddress(true)
    this.props.showAddress(true)
    this.props.showAddressList(false)
  }

  newAddress = () => {
    this.props.addDeliveryAddress()
    this.props.showAddress(true)
    this.props.showAddressList(false)
  }

  render() {
    const {
      availableDeliveryAddresses,
      giftRegistryData,
      intl,
      selectedAddress,
      rules,
    } = this.props

    return (
      <div className={`address-list ${styles.addressList}`}>
        {availableDeliveryAddresses.length > 0 &&
          availableDeliveryAddresses
            .filter(address => !isSearch(address))
            .map(availableAddress => {
              const hasAddresses = selectedAddress && availableAddress

              const selected =
                hasAddresses &&
                selectedAddress.addressId === availableAddress.addressId

              return (
                <AddressItem
                  address={availableAddress}
                  isSelected={selected}
                  key={availableAddress.addressId}
                  rules={rules}
                  selectedAddress={selectedAddress}
                />
              )
            })}
        {!giftRegistryData && (
          <p className="link edit address-edit">
            <button
              className={`btn btn-link ${styles.buttonEditAddress}`}
              id="edit-address-button"
              onClick={this.handleEditSelectAddress}
              type="button">
              <i className="icon-edit" />{' '}
              {translate(intl, 'editSelectedAddressButton')}
            </button>
          </p>
        )}
        <p className="link create address-create">
          <button
            className={`btn btn-link ${styles.buttonCreateAddress}`}
            id="new-address-button"
            onClick={this.handleAddNewAddress}
            type="button">
            <i className="icon-plus" />{' '}
            {translate(intl, 'addDeliveryPlaceButton')}
          </button>
        </p>
      </div>
    )
  }
}

AddressList.propTypes = {
  addDeliveryAddress: PropTypes.func.isRequired,
  availableDeliveryAddresses: PropTypes.array.isRequired,
  canEditData: PropTypes.bool.isRequired,
  editAddress: PropTypes.func.isRequired,
  giftRegistryData: PropTypes.object,
  intl: intlShape,
  isEditAddressActive: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isNewAddressActive: PropTypes.bool.isRequired,
  newAddressEvent: PropTypes.func.isRequired,
  selectedAddress: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  showAddress: PropTypes.func.isRequired,
  showAddressList: PropTypes.func.isRequired,
  startVtexID: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  canEditData: state.orderForm.canEditData,
  giftRegistryData: state.orderForm.giftRegistryData,
  isEditAddressActive: state.componentActivity.editAddressActive,
  isNewAddressActive: state.componentActivity.newAddressActive,
  isLoggedIn: state.orderForm.loggedIn,
  selectedAddress: getSelectedDeliveryAddress(state),
  availableDeliveryAddresses: getAvailableDeliveryAddresses(state),
})

export default connect(
  mapStateToProps,
  {
    addDeliveryAddress,
    showAddressList,
    showAddress,
    startVtexID,
    editAddress,
    newAddressEvent,
  }
)(injectRules(injectIntl(AddressList)))
