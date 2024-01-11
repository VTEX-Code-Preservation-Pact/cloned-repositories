import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import OmniShippingContainer from './OmniShippingContainer'
import WaitingState from '../components/WaitingState'
import ErrorBoundary from './ErrorBoundary'
import { addNewAddresses } from '../actions/address-form-actions'
import { showOmniShipping } from '../actions/component-activity-actions'
import { openPickupModal } from '../actions/pickup-actions'
import {
  getAddress,
  getSearchAddress,
} from '../selectors/address-form-selectors'
import { helpers } from 'vtex.address-form'
const { injectRules } = helpers

class OrderFormContainer extends Component {
  checkIfIsWaitingState() {
    const {
      stateOrderForm,
      isOmniShippingOpen,
      address,
      searchAddress,
    } = this.props

    const noAddress = !address && !searchAddress
    const { orderFormId, shippingData, storePreferencesData } = stateOrderForm

    return (
      noAddress ||
      (!orderFormId ||
        !shippingData ||
        (shippingData && !shippingData.logisticsInfo) ||
        !storePreferencesData ||
        !isOmniShippingOpen)
    )
  }

  render() {
    const { intl } = this.props

    return (
      <ErrorBoundary intl={intl}>
        {this.checkIfIsWaitingState() ? (
          <WaitingState />
        ) : (
          <OmniShippingContainer />
        )}
      </ErrorBoundary>
    )
  }
}

OrderFormContainer.propTypes = {
  address: PropTypes.object,
  intl: intlShape,
  isOmniShippingOpen: PropTypes.bool.isRequired,
  openPickupModal: PropTypes.func.isRequired,
  rules: PropTypes.object,
  searchAddress: PropTypes.object,
  showOmniShipping: PropTypes.func.isRequired,
  stateOrderForm: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  address: getAddress(state),
  searchAddress: getSearchAddress(state),
  stateOrderForm: state.orderForm,
  isOmniShippingOpen: state.componentActivity.isOmniShippingOpen,
})

export default connect(
  mapStateToProps,
  {
    showOmniShipping,
    addNewAddresses,
    openPickupModal,
  }
)(injectRules(injectIntl(OrderFormContainer)))
