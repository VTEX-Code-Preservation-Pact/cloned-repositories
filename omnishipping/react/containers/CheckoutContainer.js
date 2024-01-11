import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLocale } from '../selectors/order-form-selectors'
import { PICKUP_IN_STORE, OMNISHIPPING, PICKUP } from '../constants'
import { isGiftRegistry } from '../utils/AddressFormUtils'
import {
  getAddress,
  getSearchAddress,
} from '../selectors/address-form-selectors'
import { shouldCompleteOmnishipping } from '../selectors/omnishipping-selectors'
import { getShippingDataWithSelectedDelivery } from '../selectors/delivery-selectors'

import {
  updateOrderForm,
  changeActiveTab,
  updateShippingData,
  selectScheduledDelivery,
  changeActiveDeliveryPackage,
  toggleScheduledDelivery,
} from '../actions/order-form-actions'
import {
  showOmniShipping,
  showOmniShippingCompleted,
  editOmnishipping,
  changeActiveDeliveryChannel,
  enableOmnishipping,
  disableOmnishipping,
} from '../actions/component-activity-actions'
import { checkIfHasDeniedGeolocation } from '../actions/pickup-actions'
import { validateAddressForm } from '../actions/address-form-actions'
import {
  shippingStatsEvent,
  omnishippingPageView,
} from '../actions/metric-actions'

import { isPickup } from '../utils/DeliveryChannelsUtils'
import { getItem, safelyParseJSON } from '../utils/LocalStorageUtils'
import {
  DISABLE,
  ENABLE,
  COMPONENT_VALIDATED,
  COMPONENT_DONE,
  SHIPPING_INFO_UPDATED,
  ORDER_FORM_UPDATED,
} from '../constants/checkout-events'
import queryString from 'query-string'
import { helpers } from 'vtex.address-form'
import { modules } from 'vtex.country-codes'

const { injectRules } = helpers
// Importing country codes for vtex io to insert in the context
const { toAlpha2 } = modules // eslint-disable-line

const $ = window.$
const $shippingData = $ && $('#shipping-data')

class CheckoutContainer extends Component {
  constructor() {
    super()

    this.state = {
      alreadyOnSummary: false,
    }
  }

  componentDidMount() {
    setTimeout(() => this.props.omnishippingPageView(), 1000)
    this.props.checkIfHasDeniedGeolocation()

    if (
      window.vtexjs &&
      window.vtexjs.checkout &&
      window.vtexjs.checkout.orderForm
    ) {
      this.orderFormUpdated(null, window.vtexjs.checkout.orderForm, true)
    }

    $(window).trigger(COMPONENT_DONE)
    $shippingData.on(ENABLE, event => {
      event.stopPropagation()
      this.props.enableOmnishipping()
    })

    $shippingData.on(DISABLE, event => {
      event.stopPropagation()
      this.props.disableOmnishipping({
        hasPickups: this.hasPickups(),
        hasGoToShipping: this.hasGoToShipping(),
      })
    })
    $(window).on(SHIPPING_INFO_UPDATED, this.shippingInformationUpdated)
    $(window).on(ORDER_FORM_UPDATED, this.orderFormUpdated)
  }

  componentDidUpdate() {
    const {
      canEditData,
      disableOmnishipping,
      shouldCompleteOmnishipping,
      isAddressValid,
      isEditingOmnishipping,
      isOmniShippingCompleted,
      rules,
      selectedPackages,
    } = this.props

    if (!rules || isAddressValid === null) return

    $shippingData.trigger(COMPONENT_VALIDATED, shouldCompleteOmnishipping)

    if (this.state.alreadyOnSummary) return

    const hasPickups = this.hasPickups()
    const hasGoToShipping = this.hasGoToShipping()
    const cannotEditDataAndShouldStayInShipping =
      !canEditData && (hasPickups || hasGoToShipping)

    const giftAddress =
      selectedPackages &&
      selectedPackages.availableAddresses &&
      selectedPackages.availableAddresses.find(li => isGiftRegistry(li))

    if (
      shouldCompleteOmnishipping &&
      !isEditingOmnishipping &&
      (!cannotEditDataAndShouldStayInShipping || !!giftAddress)
    ) {
      $(window).trigger(COMPONENT_DONE)
      this.setState({ alreadyOnSummary: true })
      disableOmnishipping()
    }

    if (!isOmniShippingCompleted && cannotEditDataAndShouldStayInShipping) {
      $shippingData.trigger(COMPONENT_VALIDATED, false)
    }
  }

  hasPickups = () => {
    const { canEditData, shippingData } = this.props

    return (
      !canEditData &&
      shippingData &&
      shippingData.logisticsInfo &&
      shippingData.logisticsInfo.some(li => li.slas.some(sla => isPickup(sla)))
    )
  }

  hasGoToShipping = () => {
    const search = queryString.parse(window.location.search)
    return !this.props.canEditData && search.goToShipping
      ? safelyParseJSON(search.goToShipping)
      : false
  }

  orderFormUpdated = (_, orderForm, shouldSimulate = true) => {
    let orderFormAction = { orderForm }

    if (orderForm.items && orderForm.items.length === 0) {
      $shippingData.trigger(COMPONENT_VALIDATED, false)
    }

    if (this.props.address && this.props.searchAddress) {
      orderFormAction = {
        ...orderFormAction,
        address: this.props.address,
        searchAddress: this.props.searchAddress,
        channel: this.props.activeDeliveryChannel,
      }
    }

    this.props.updateOrderForm(
      orderFormAction,
      shouldSimulate,
      this.props.rules
    )
  }

  shippingInformationUpdated = () => {
    const {
      activeDeliveryChannel,
      activeDeliveryOption,
      changeActiveTab,
      changeActiveDeliveryChannel,
      changeActiveDeliveryPackage,
      isScheduledDeliveryActive,
      rules,
      selectScheduledDelivery,
      toggleScheduledDelivery,
      validateAddressForm,
    } = this.props

    const aditionalShippingData = getItem('aditionalShippingData')

    if (
      !aditionalShippingData ||
      aditionalShippingData.originComponent === OMNISHIPPING
    ) {
      return
    }

    this.setState({ alreadyOnSummary: false })

    const activeTab =
      aditionalShippingData.activeTab === PICKUP
        ? PICKUP_IN_STORE
        : aditionalShippingData.activeTab

    const activeTabChanged = activeDeliveryChannel !== activeTab

    const deliveryOptionChanged =
      activeDeliveryOption !== aditionalShippingData.selectedLeanShippingOption

    const scheduledDeliveryChanged =
      isScheduledDeliveryActive !==
      aditionalShippingData.isScheduledDeliveryActive

    if (
      scheduledDeliveryChanged &&
      aditionalShippingData.isScheduledDeliveryActive
    ) {
      selectScheduledDelivery(aditionalShippingData.isScheduledDeliveryActive)
    } else {
      toggleScheduledDelivery(aditionalShippingData.isScheduledDeliveryActive)
    }

    if (activeTabChanged) {
      changeActiveDeliveryChannel(activeTab)
    }

    if (deliveryOptionChanged) {
      changeActiveDeliveryPackage(
        aditionalShippingData.selectedLeanShippingOption
      )
    }

    if (
      activeTabChanged ||
      (scheduledDeliveryChanged &&
        !aditionalShippingData.isScheduledDeliveryActive)
    ) {
      changeActiveTab({
        channel: activeTab,
        loading: true,
        shouldUpdate: false,
      })

      validateAddressForm(rules)
    }
  }

  render() {
    return this.props.render()
  }
}

CheckoutContainer.propTypes = {
  activeDeliveryChannel: PropTypes.string,
  activeDeliveryOption: PropTypes.string,
  address: PropTypes.object,
  canEditData: PropTypes.bool,
  changeActiveDeliveryChannel: PropTypes.func.isRequired,
  changeActiveDeliveryPackage: PropTypes.func.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
  checkIfHasDeniedGeolocation: PropTypes.func.isRequired,
  disableOmnishipping: PropTypes.func.isRequired,
  editOmnishipping: PropTypes.func.isRequired,
  enableOmnishipping: PropTypes.func.isRequired,
  hasOrderForm: PropTypes.bool.isRequired,
  isAddressValid: PropTypes.bool,
  isEditingOmnishipping: PropTypes.bool.isRequired,
  isOmniShippingCompleted: PropTypes.bool.isRequired,
  isScheduledDeliveryActive: PropTypes.bool.isRequired,
  items: PropTypes.array,
  locale: PropTypes.string,
  omnishippingPageView: PropTypes.func.isRequired,
  orderFormId: PropTypes.string,
  render: PropTypes.func.isRequired,
  searchAddress: PropTypes.object,
  selectScheduledDelivery: PropTypes.func.isRequired,
  selectedPackages: PropTypes.object,
  shippingData: PropTypes.object,
  rules: PropTypes.object,
  shippingStatsEvent: PropTypes.func.isRequired,
  shouldCompleteOmnishipping: PropTypes.bool.isRequired,
  showOmniShipping: PropTypes.func.isRequired,
  showOmniShippingCompleted: PropTypes.func.isRequired,
  toggleScheduledDelivery: PropTypes.func.isRequired,
  updateOrderForm: PropTypes.func.isRequired,
  updateShippingData: PropTypes.func.isRequired,
  validateAddressForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  address: getAddress(state),
  hasOrderForm: !!(state.orderForm && state.orderForm.orderFormId),
  canEditData: state.orderForm.canEditData,
  orderFormId: state.orderForm.orderFormId,
  items: state.orderForm.items,
  isAddressValid: state.addressForm.valid,
  shouldCompleteOmnishipping: shouldCompleteOmnishipping(state),
  isOmniShippingCompleted: state.componentActivity.isOmniShippingCompleted,
  isEditingOmnishipping: state.componentActivity.isEditingOmnishipping,
  activeDeliveryOption: state.delivery.activeDeliveryOption,
  isScheduledDeliveryActive: state.delivery.isScheduledDeliveryActive,
  locale: getLocale(state),
  searchAddress: getSearchAddress(state),
  shippingData: getShippingDataWithSelectedDelivery(state),
})

export default connect(
  mapStateToProps,
  {
    checkIfHasDeniedGeolocation,
    changeActiveDeliveryChannel,
    changeActiveDeliveryPackage,
    changeActiveTab,
    disableOmnishipping,
    editOmnishipping,
    enableOmnishipping,
    omnishippingPageView,
    selectScheduledDelivery,
    shippingStatsEvent,
    showOmniShipping,
    showOmniShippingCompleted,
    toggleScheduledDelivery,
    updateShippingData,
    updateOrderForm,
    validateAddressForm,
  }
)(injectRules(CheckoutContainer))
