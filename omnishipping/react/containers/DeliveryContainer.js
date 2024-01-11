import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import {
  editAddress,
  newAddressEvent,
  showAddress,
  showAddressList,
} from '../actions/component-activity-actions'
import {
  hasSelectedSlas,
  hasSlas,
  hasLogisticsInfoWithOnlyPickup,
} from '../selectors/delivery-selectors'

import AddressList from '../components/AddressList'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getFirstAvailableAddress } from '../selectors/order-form-selectors'
import { hasGeolocation } from '../selectors/account-info-selectors'
import { isAddressListActive } from '../selectors/omnishipping-selectors'
import { hasPostalCodeOnlyNumber } from '../utils/AddressFormUtils'
import {
  isValidPostalGeolocation,
  isAddressGiftRegistry,
} from '../selectors/address-form-selectors'
import { selectAddressItem } from '../actions/order-form-actions'
import omniStyles from './../containers/OmniShippingContainer.css'
import styles from '../containers/OmniShipping.css'
import { translate } from './../utils/i18nUtils'
import { validateAddressFormFields } from '../actions/address-form-actions'
import { startVtexID } from '../actions/account-info-actions'
import { DELIVERY, PICKUP_IN_STORE } from '../constants'
import UnavailableDelivery from '../components/UnavailableDelivery'
import UnavailableDeliveryAvailablePickup from '../components/UnavailableDeliveryAvailablePickup'
import { getUnavailableItems } from '../selectors/unavailable-selectors'
import { isActiveDeliveryChannelDelivery } from '../selectors/delivery-channels-selectors'
import LeanShipping from '../components/LeanShipping'

import { components, inputs } from 'vtex.address-form'
const {
  GoogleMapsContainer,
  Map,
  PostalCodeGetter,
  CountrySelector,
  AutoCompletedFields,
  AddressForm,
} = components
const { DefaultInput, GeolocationInput } = inputs

function hasSomeAutoCompleted(address) {
  return Object.keys(address).some(addressKey => {
    return (
      address[addressKey].postalCodeAutoCompleted ||
      address[addressKey].geolocationAutoCompleted
    )
  })
}

class DeliveryContainer extends Component {
  hasAddressPostalCodeOrGeolocation() {
    const { address } = this.props

    return hasSomeAutoCompleted(address)
  }

  handleBackToAddressList = () => {
    this.props.editAddress(false)
    this.props.newAddressEvent(false)
    this.props.showAddress(false)
    this.props.showAddressList(true)
    this.props.selectAddressItem(this.props.firstAvailableAddress)
    this.props.validateAddressFormFields(this.props.rules)
  }

  handleLogin = event => {
    event.preventDefault()
    this.props.startVtexID()
  }

  render() {
    const {
      activeDeliveryChannel,
      address,
      giftRegistryData,
      googleMapsKey,
      hasSelectedSlas,
      hasSlas,
      hasLogisticsInfoWithOnlyPickup,
      intl,
      isActiveDeliveryChannelDelivery,
      isAddressActive,
      isAddressListActive,
      isEditAddressActive,
      isGeolocationInput,
      isGiftRegistry,
      isNewAddressActive,
      isValidPostalGeolocation,
      onChangeAddress,
      rules,
      shipsTo,
      shouldDisableToggle,
      unavailableItems,
    } = this.props

    const isDeliveryAndIsNotOnlyPickup =
      activeDeliveryChannel === DELIVERY
        ? !hasLogisticsInfoWithOnlyPickup
        : true

    const unavailableHasPickup =
      unavailableItems &&
      unavailableItems.logisticsInfo &&
      unavailableItems.logisticsInfo.some(item =>
        item.deliveryChannels.some(
          deliveryChannel => deliveryChannel.id === PICKUP_IN_STORE
        )
      )

    if (!isAddressActive && !isAddressListActive) {
      return (
        <div className="mb5">
          <FormattedMessage id="omnishipping.noAddressTitle" />
          <br />
          <FormattedMessage
            id="omnishipping.noAddressCTA"
            values={{
              action: (
                // Disable href="#" warning
                // eslint-disable-next-line
                <a href="#" onClick={this.handleLogin}>
                  <FormattedMessage id="omnishipping.noAddressAction" />
                </a>
              ),
            }}
          />
        </div>
      )
    }

    return (
      <Fragment>
        <div
          className={`${styles.addressFormPart1} ${
            isGeolocationInput ? styles.geolocation : ''
          }`}>
          {isAddressListActive &&
            !isGiftRegistry &&
            !giftRegistryData && <AddressList />}
          {giftRegistryData && (
            <p>
              {`${translate(intl, 'deliveryAddressTitle')}: `}
              <b>{`${giftRegistryData.giftRegistryTypeName}`}</b>
              <hr className="mh0 mv1 b--black-10 bb bb-0 w-100" />
            </p>
          )}
          {isAddressActive &&
            (isNewAddressActive || isEditAddressActive) && (
            <button
              className={`btn btn-link ${styles.backToAddressList}`}
              id="back-to-address-list"
              onClick={this.handleBackToAddressList}>
              {translate(intl, 'backToAddressList')}
            </button>
          )}
          {isAddressActive &&
            shipsTo &&
            shipsTo.length > 1 && (
            <CountrySelector
              address={address}
              Input={DefaultInput}
              onChangeAddress={onChangeAddress}
              shipsTo={shipsTo}
            />
          )}
          {isDeliveryAndIsNotOnlyPickup &&
            !isGiftRegistry &&
            isAddressActive &&
            (isGeolocationInput ? (
              <GoogleMapsContainer apiKey={googleMapsKey} locale={intl.locale}>
                {({ loading, googleMaps }) => {
                  const coordinatesValid =
                    address.geoCoordinates && address.geoCoordinates.valid
                  return (
                    <Fragment>
                      <GeolocationInput
                        address={address}
                        googleMaps={googleMaps}
                        loadingGoogle={loading}
                        onChangeAddress={onChangeAddress}
                        rules={rules}
                      />

                      {coordinatesValid && (
                        <Map
                          geoCoordinates={address.geoCoordinates.value}
                          googleMaps={googleMaps}
                          loadingGoogle={loading}
                          mapProps={{
                            className: `google-maps-map ${styles.mapStyles}`,
                          }}
                          onChangeAddress={onChangeAddress}
                          rules={rules}
                        />
                      )}
                    </Fragment>
                  )
                }}
              </GoogleMapsContainer>
            ) : (
              <PostalCodeGetter
                address={address}
                autoFocus={!isEditAddressActive}
                Input={DefaultInput}
                onChangeAddress={onChangeAddress}
                rules={rules}
                shouldShowNumberKeyboard={hasPostalCodeOnlyNumber(rules.mask)}
              />
            ))}
        </div>
        {isActiveDeliveryChannelDelivery &&
          unavailableItems &&
          unavailableItems.items &&
          unavailableItems.items.length > 0 && (
          <div className={styles.deliveryGroup}>
            {unavailableHasPickup ? (
              <UnavailableDeliveryAvailablePickup />
            ) : (
              <UnavailableDelivery />
            )}
          </div>
        )}

        {!shouldDisableToggle &&
          (isValidPostalGeolocation || !hasSlas) && <LeanShipping />}
        {!shouldDisableToggle &&
          !isGiftRegistry &&
          isValidPostalGeolocation &&
          isAddressActive &&
          hasSelectedSlas && (
          <div className={styles.addressForm}>
            <p
              className={`${
                omniStyles.shippingSectionTitle
              } delivery-address-title`}>
              {translate(intl, 'deliveryAddressTitle')}
            </p>
            <div
              className={classNames(styles.addressSummary, {
                [styles.addressSummaryActive]: this.hasAddressPostalCodeOrGeolocation(),
              })}>
              <AutoCompletedFields
                address={address}
                onChangeAddress={onChangeAddress}
                rules={rules}>
                <a
                  className={`${styles.linkEdit} link-edit`}
                  id="force-shipping-fields">
                  {translate(intl, 'modifyPostalCode')}
                </a>
              </AutoCompletedFields>
            </div>
            <div className={styles.address}>
              <AddressForm
                address={address}
                Input={DefaultInput}
                onChangeAddress={onChangeAddress}
                rules={rules}
              />
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

DeliveryContainer.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  address: PropTypes.object,
  editAddress: PropTypes.func.isRequired,
  firstAvailableAddress: PropTypes.object,
  giftRegistryData: PropTypes.object,
  googleMapsKey: PropTypes.string,
  hasLogisticsInfoWithOnlyPickup: PropTypes.bool.isRequired,
  hasSelectedSlas: PropTypes.bool.isRequired,
  hasSlas: PropTypes.bool.isRequired,
  intl: intlShape,
  isActiveDeliveryChannelDelivery: PropTypes.bool.isRequired,
  isAddressActive: PropTypes.bool,
  isAddressListActive: PropTypes.bool,
  isEditAddressActive: PropTypes.bool.isRequired,
  isGeolocationInput: PropTypes.bool.isRequired,
  isGiftRegistry: PropTypes.bool.isRequired,
  isNewAddressActive: PropTypes.bool.isRequired,
  isValidPostalGeolocation: PropTypes.bool.isRequired,
  newAddressEvent: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  selectAddressItem: PropTypes.func.isRequired,
  shipsTo: PropTypes.array.isRequired,
  shouldDisableToggle: PropTypes.bool.isRequired,
  showAddress: PropTypes.func.isRequired,
  showAddressList: PropTypes.func.isRequired,
  startVtexID: PropTypes.func.isRequired,
  unavailableItems: PropTypes.array,
  validateAddressFormFields: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  firstAvailableAddress: getFirstAvailableAddress(state),
  giftRegistryData: state.orderForm.giftRegistryData,
  hasLogisticsInfoWithOnlyPickup: hasLogisticsInfoWithOnlyPickup(state),
  hasSelectedSlas: hasSelectedSlas(state),
  hasSlas: hasSlas(state),
  isAddressListActive: isAddressListActive(state),
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  isActiveDeliveryChannelDelivery: isActiveDeliveryChannelDelivery(state),
  isEditAddressActive: state.componentActivity.editAddressActive,
  isGeolocationInput: hasGeolocation(state),
  isNewAddressActive: state.componentActivity.newAddressActive,
  isAddressActive: state.componentActivity.isAddressActive,
  isValidPostalGeolocation: isValidPostalGeolocation(state),
  isGiftRegistry: isAddressGiftRegistry(state),
  shouldDisableToggle: state.delivery.shouldDisableToggle,
  unavailableItems: getUnavailableItems(state),
})

export default connect(
  mapStateToProps,
  {
    editAddress,
    showAddress,
    showAddressList,
    selectAddressItem,
    validateAddressFormFields,
    newAddressEvent,
    startVtexID,
  }
)(injectIntl(DeliveryContainer))
