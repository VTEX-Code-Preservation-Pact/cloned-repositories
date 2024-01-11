import { PICKUP_IN_STORE } from '../constants/index'
import React, { Component, Fragment } from 'react'
import { updateShippingData } from '../actions/order-form-actions'
import {
  editOmnishipping,
  showOmniShippingCompleted,
  showSplit,
  completeOmnishipping,
} from '../actions/component-activity-actions'
import {
  getAddress,
  getSearchAddress,
  isValidAddress,
  isValidPostalGeolocation,
} from '../selectors/address-form-selectors'
import {
  getDefaultShipsTo,
  getSelectedDeliveryChannels,
  getShipsTo,
  isPickupOnly,
} from '../selectors/order-form-selectors'
import {
  getOrderedAvailableDeliveryChannels,
  getShippingDataWithSelectedDelivery,
  hasSelectedPickups,
  hasSlas,
} from '../selectors/delivery-selectors'
import {
  hasSelectedDeliveryChannelDelivery,
  hasSelectedDeliveryChannelPickup,
  isPaymentButtonActive,
  shouldCompleteOmnishipping,
} from '../selectors/omnishipping-selectors'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  searchedPickupAddressEvent,
  shippingStatsEvent,
} from '../actions/metric-actions'
import {
  updateAddressForm,
  validateAddressForm,
  validateAddressFormFields,
  validatePostalCode,
} from '../actions/address-form-actions'
import { isDelivery, isPickup } from '../utils/DeliveryChannelsUtils'
import DeliveryChannelsDelivery from '../components/DeliveryChannelsDelivery'
import DeliveryChannelsPickup from '../components/DeliveryChannelsPickup'
import PickupPointsModalContainer from './PickupPointsModalContainer'
import PropTypes from 'prop-types'
import { SEARCH } from '@vtex/pickup-points-modal/lib/constants'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import styles from './OmniShipping.css'
import { translate } from './../utils/i18nUtils'
import Alert from '../components/Alert'
import DeliveryChannelsLoading from '../components/DeliveryChannelsLoading'
import { components, helpers } from 'vtex.address-form'
const { AddressContainer } = components
const { injectRules } = helpers

const $ = window.$

class DeliveryChannelsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      PickupModal: undefined,
      shipsTo: this.addCountryLabel(props.intl, props.shipsTo),
      isMounted: false,
    }

    this.isEditingOmnishipping = props.isEditingOmnishipping
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.isEditingOmnishipping = nextProps.isEditingOmnishipping

    if (!nextProps.address.postalCode.value) return

    const thisPostalCode = this.props.address.postalCode
    const nextPostalCode = nextProps.address.postalCode

    const thisGeoCoordinates = this.props.address.geoCoordinates
    const nextGeoCoordinates = nextProps.address.geoCoordinates

    const bothHavePostalCodeValue = nextPostalCode.value && thisPostalCode.value
    const bothHaveGeoCoordinatesValue =
      nextGeoCoordinates.value && thisGeoCoordinates.value

    if (bothHavePostalCodeValue || bothHaveGeoCoordinatesValue) {
      const changedPostalCode = thisPostalCode.value !== nextPostalCode.value
      const changedAutoCompleted =
        thisPostalCode.postalCodeAutoCompleted !==
        nextPostalCode.postalCodeAutoCompleted

      const isPostalCodeDifferentAndValid =
        (changedPostalCode || changedAutoCompleted) &&
        ((nextPostalCode.geolocationAutoCompleted && nextPostalCode.valid) ||
          (nextPostalCode.postalCodeAutoCompleted && nextPostalCode.valid) ||
          (!this.hasAutoCompleteAPI() && nextPostalCode.valid))

      const changedGeoCoordinates = !isEqual(
        nextGeoCoordinates.value,
        thisGeoCoordinates.value
      )
      const geoCoordinatesDifferentAndValid =
        changedGeoCoordinates &&
        (nextGeoCoordinates.geolocationAutoCompleted ||
          nextGeoCoordinates.valid)

      if (
        (isPostalCodeDifferentAndValid || geoCoordinatesDifferentAndValid) &&
        !this.props.shouldDisableToggle
      ) {
        this.props.updateShippingData(nextProps.shippingData)
      }
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
    this.isEditingOmnishipping = false
  }

  componentDidMount() {
    this.setState({ isMounted: true })

    const {
      canEditData,
      address,
      validatePostalCode,
      validateAddressForm,
      rules,
    } = this.props

    if (canEditData && address.postalCode.value) {
      validateAddressForm(rules)
      validatePostalCode(rules)
    }
  }

  addCountryLabel(intl, countries) {
    return countries.map(countryCode => ({
      label: intl.formatMessage({ id: `country.${countryCode}` }),
      value: countryCode,
    }))
  }

  handleAddressChange = address => {
    const {
      searchAddress,
      activeDeliveryChannel,
      validatePostalCode,
      rules,
      updateAddressForm,
      validateAddressForm,
    } = this.props

    if (this.isEditingOmnishipping) {
      updateAddressForm({
        address,
        searchAddress: this.getSearchAddress(address, searchAddress),
        channel: activeDeliveryChannel,
        rules,
      })

      validatePostalCode(rules)
      validateAddressForm(rules)
    }
  }

  hasAutoCompleteAPI = () => {
    const postalCode =
      this.props.rules &&
      this.props.rules.fields.find(field => field.name === 'postalCode')

    return postalCode && postalCode.postalCodeAPI
  }

  handleCompleteOmnishipping = () =>
    this.props.completeOmnishipping(this.props.rules)

  broadcastOmniShippingStatus = omniShippingStatus => {
    $(window).trigger('omniShippingChanged.vtex', [omniShippingStatus])
  }

  handleSearchAddressChange = searchAddress => {
    const {
      address,
      rules,
      shippingData,
      updateAddressForm,
      searchedPickupAddressEvent,
      updateShippingData,
    } = this.props

    if (this.isEditingOmnishipping) {
      updateAddressForm({
        address,
        searchAddress: {
          ...searchAddress,
          addressType: {
            value: 'search',
          },
        },
        channel: PICKUP_IN_STORE,
        rules,
      })

      updateShippingData(shippingData)
      searchedPickupAddressEvent()
    }
  }

  getSearchAddress(address, searchAddress) {
    if (
      address.postalCode &&
      searchAddress.geoCoordinates &&
      searchAddress.postalCode.postalCodeAutoCompleted &&
      address.postalCode.value !== searchAddress.postalCode.value &&
      !searchAddress.geoCoordinates.geolocationAutoCompleted
    ) {
      return {
        ...address,
        addressId: searchAddress.addressId,
        addressType: SEARCH,
      }
    }
    return searchAddress
  }

  render() {
    const {
      accountName,
      activeDeliveryChannel,
      address,
      availableDeliverychannels,
      canEditData,
      googleMapsKey,
      hasSelectedDeliveryChannelDelivery,
      hasSelectedDeliveryChannelPickup,
      hasSelectedPickups,
      isSplitActive,
      hasSlas,
      intl,
      isLoggedIn,
      isModalActive,
      isPaymentButtonActive,
      isPickupOnly,
      isValidPostalGeolocation,
      rules,
      searchAddress,
      selectedDeliveryChannels,
      shouldCompleteOmnishipping,
      shouldDisableToggle,
    } = this.props

    const { PickupModal, shipsTo } = this.state
    document.body.style.overflow = isModalActive ? 'hidden' : ''

    const hasSplitAndActive =
      selectedDeliveryChannels.length > 1 ? isSplitActive : true
    return (
      <Fragment>
        {this.broadcastOmniShippingStatus(shouldCompleteOmnishipping)}
        {shouldDisableToggle ? (
          <DeliveryChannelsLoading />
        ) : (
          <Fragment>
            {isPickupOnly && (
              <Alert className="shp-alert-all-items-pickup">
                <FormattedMessage id="omnishipping.allItemsPickup" />
              </Alert>
            )}
            <AddressContainer
              accountName={accountName}
              address={address}
              autoCompletePostalCode={this.hasAutoCompleteAPI()}
              onChangeAddress={this.handleAddressChange}
              rules={rules}
              shouldAddFocusToNextInvalidField={false}
              shouldHandleAddressChangeOnMount={false}>
              <Fragment>
                {availableDeliverychannels.map((channel, index) => (
                  <Fragment key={channel}>
                    {isPickup(channel) && (
                      <DeliveryChannelsPickup
                        activeDeliveryChannel={activeDeliveryChannel}
                        channel={channel}
                        googleMapsKey={googleMapsKey}
                        hasSelectedDeliveryChannelPickup={
                          hasSelectedDeliveryChannelPickup
                        }
                        hasSlas={hasSlas}
                        index={index}
                        intl={intl}
                        isValidPostalGeolocation={isValidPostalGeolocation}
                        selectedDeliveryChannels={selectedDeliveryChannels}
                      />
                    )}
                    {isDelivery(channel) && (
                      <DeliveryChannelsDelivery
                        activeDeliveryChannel={activeDeliveryChannel}
                        canEditData={canEditData}
                        channel={channel}
                        googleMapsKey={googleMapsKey}
                        hasSelectedDeliveryChannelDelivery={
                          hasSelectedDeliveryChannelDelivery
                        }
                        hasSelectedDeliveryChannelPickup={
                          hasSelectedDeliveryChannelPickup
                        }
                        hasSelectedPickups={hasSelectedPickups}
                        hasSlas={hasSlas}
                        index={index}
                        intl={intl}
                        isLoggedIn={isLoggedIn}
                        isSplitActive={isSplitActive}
                        rules={rules}
                        searchAddress={searchAddress}
                        selectedDeliveryChannels={selectedDeliveryChannels}
                        shipsTo={shipsTo}
                        showSplit={this.props.showSplit}
                      />
                    )}
                  </Fragment>
                ))}
              </Fragment>
            </AddressContainer>
            {hasSplitAndActive &&
              !shouldDisableToggle &&
              isPaymentButtonActive && (
              <p
                className={`${
                  styles.submitPaymentButton
                } btn-submit-wrapper btn-go-to-payment-wrapper`}>
                <button
                  className={
                    'submit  btn-go-to-payment btn btn-large btn-success'
                  }
                  id="btn-go-to-payment"
                  onClick={this.handleCompleteOmnishipping}
                  type="button">
                  {translate(intl, 'paymentCTA')}
                </button>
              </p>
            )}
          </Fragment>
        )}
        {isModalActive && (
          <PickupPointsModalContainer
            onSearchAddressChange={this.handleSearchAddressChange}
            PickupModal={PickupModal}
          />
        )}
      </Fragment>
    )
  }
}

DeliveryChannelsContainer.propTypes = {
  accountName: PropTypes.string,
  activeDeliveryChannel: PropTypes.string.isRequired,
  address: PropTypes.object,
  availableDeliverychannels: PropTypes.array,
  canEditData: PropTypes.bool.isRequired,
  completeOmnishipping: PropTypes.func.isRequired,
  defaultShipsTo: PropTypes.string,
  defaultCountry: PropTypes.string,
  editOmnishipping: PropTypes.func.isRequired,
  googleMapsKey: PropTypes.string,
  hasSelectedDeliveryChannelDelivery: PropTypes.bool.isRequired,
  hasSelectedDeliveryChannelPickup: PropTypes.bool.isRequired,
  hasSelectedPickups: PropTypes.bool,
  hasSlas: PropTypes.bool.isRequired,
  intl: intlShape,
  isEditingOmnishipping: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isModalActive: PropTypes.bool.isRequired,
  isOmniShippingCompleted: PropTypes.bool.isRequired,
  isPaymentButtonActive: PropTypes.bool.isRequired,
  isPickupOnly: PropTypes.bool.isRequired,
  isSplitActive: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool,
  isValidPostalGeolocation: PropTypes.bool.isRequired,
  rules: PropTypes.object.isRequired,
  searchAddress: PropTypes.object.isRequired,
  searchedPickupAddressEvent: PropTypes.func.isRequired,
  selectedDeliveryChannels: PropTypes.array.isRequired,
  shippingData: PropTypes.object.isRequired,
  shippingStatsEvent: PropTypes.func.isRequired,
  shipsTo: PropTypes.array,
  shouldCompleteOmnishipping: PropTypes.bool.isRequired,
  shouldDisableToggle: PropTypes.bool.isRequired,
  showOmniShippingCompleted: PropTypes.func.isRequired,
  showSplit: PropTypes.func.isRequired,
  updateAddressForm: PropTypes.func.isRequired,
  updateShippingData: PropTypes.func.isRequired,
  validateAddressForm: PropTypes.func.isRequired,
  validateAddressFormFields: PropTypes.func.isRequired,
  validatePostalCode: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  activePickupPoint: state.pickup.activePickupPoint,
  activeSellerId: state.pickup.activeSellerId,
  address: getAddress(state),
  askForGeolocation: state.pickup.askForGeolocation,
  availableDeliverychannels: getOrderedAvailableDeliveryChannels(state),
  canEditData: state.orderForm.canEditData,
  defaultCountry: state.orderForm.storePreferencesData.countryCode,
  defaultShipsTo: getDefaultShipsTo(state),
  googleMapsKey: state.accountInfo.googleMapsKey,
  hasSelectedDeliveryChannelDelivery: hasSelectedDeliveryChannelDelivery(state),
  hasSelectedDeliveryChannelPickup: hasSelectedDeliveryChannelPickup(state),
  hasSelectedPickups: hasSelectedPickups(state),
  hasSlas: hasSlas(state),
  isEditingOmnishipping: state.componentActivity.isEditingOmnishipping,
  isSplitActive: state.componentActivity.isSplitActive,
  isLoggedIn: state.orderForm.loggedIn,
  isModalActive: state.pickup.isModalActive,
  isOmniShippingCompleted: state.componentActivity.isOmniShippingCompleted,
  isPaymentButtonActive: isPaymentButtonActive(state),
  isPickupOnly: isPickupOnly(state),
  isValidAddress: isValidAddress(state),
  isValidPostalGeolocation: isValidPostalGeolocation(state),
  searchAddress: getSearchAddress(state),
  selectedDeliveryChannels: getSelectedDeliveryChannels(state),
  shippingData: getShippingDataWithSelectedDelivery(state),
  shipsTo: getShipsTo(state),
  shouldCompleteOmnishipping: shouldCompleteOmnishipping(state),
  shouldDisableToggle: state.delivery.shouldDisableToggle,
})

export default connect(
  mapStateToProps,
  {
    editOmnishipping,
    searchedPickupAddressEvent,
    shippingStatsEvent,
    showOmniShippingCompleted,
    updateAddressForm,
    updateShippingData,
    validateAddressForm,
    validateAddressFormFields,
    validatePostalCode,
    showSplit,
    completeOmnishipping,
  }
)(injectRules(injectIntl(DeliveryChannelsContainer)))
