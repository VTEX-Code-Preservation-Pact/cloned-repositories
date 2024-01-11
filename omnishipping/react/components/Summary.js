import { SHIPPING_HASH } from '../constants'
import React, { Component, Fragment } from 'react'
import {
  editOmnishipping,
  showOmniShippingCompleted,
} from '../actions/component-activity-actions'
import {
  getSelectedPackages,
  getSelectedPickupPackages,
  getSelectedLeanOption,
} from '../selectors/delivery-selectors'
import { injectIntl, intlShape } from 'react-intl'

import PropTypes from 'prop-types'
import SummaryItem from './SummaryItem'
import { connect } from 'react-redux'
import { getAddress } from '../selectors/address-form-selectors'
import { getSelectedDeliveryChannels } from '../selectors/order-form-selectors'
import sortBy from 'lodash/sortBy'
import styles from './Summary.css'
import { translate } from './../utils/i18nUtils'
import { isDelivery } from '../utils/DeliveryChannelsUtils'
import {
  COMPONENT_VALIDATED,
  COMPONENT_DONE,
  SHOW_MESSAGE,
} from '../constants/checkout-events'
import { helpers } from 'vtex.address-form'
const { injectRules } = helpers

const $ = window.$

export class Summary extends Component {
  componentDidMount() {
    const $shippingData = $('#shipping-data')
    $shippingData.trigger(COMPONENT_VALIDATED, true)
    $(window).trigger(COMPONENT_DONE)
  }

  handleClickMaskedInfoIcon = event => {
    event.preventDefault()

    if (window && window.$) {
      window.$(window).trigger(SHOW_MESSAGE, ['maskedInfo'])
    }
  }

  handleModifyDeliveryOptions = () => {
    this.props.showOmniShippingCompleted(false)
    this.props.editOmnishipping(true)
  }

  render() {
    const {
      availableDeliveryChannels,
      deliveryPackages,
      intl,
      logisticsInfo,
      pickupPackages,
      rules,
    } = this.props

    const sortedDeliveryChannels = sortBy(
      availableDeliveryChannels,
      item => item
    )

    return (
      <Fragment>
        {sortedDeliveryChannels.map(deliveryChannel => (
          <SummaryItem
            deliveryChannel={deliveryChannel}
            groups={sortedDeliveryChannels.length}
            key={`${deliveryChannel}`}
            logisticsInfo={logisticsInfo}
            packages={
              isDelivery(deliveryChannel) ? deliveryPackages : pickupPackages
            }
            selectedRules={rules}
          />
        ))}
        <a
          className={`link-change-shipping ${styles.summaryChange}`}
          href={SHIPPING_HASH}
          id="open-shipping"
          onClick={this.handleModifyDeliveryOptions}>
          {translate(intl, 'modifyDeliveryOptions')}
        </a>
      </Fragment>
    )
  }
}

Summary.propTypes = {
  address: PropTypes.object.isRequired,
  availableDeliveryChannels: PropTypes.array.isRequired,
  canEditData: PropTypes.bool.isRequired,
  deliveryPackages: PropTypes.array.isRequired,
  editOmnishipping: PropTypes.func.isRequired,
  intl: intlShape,
  logisticsInfo: PropTypes.array.isRequired,
  pickupPackages: PropTypes.array.isRequired,
  rules: PropTypes.object.isRequired,
  showOmniShippingCompleted: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  address: getAddress(state),
  availableDeliveryChannels: getSelectedDeliveryChannels(state),
  canEditData: state.orderForm.canEditData,
  deliveryPackages: getSelectedPackages(state),
  logisticsInfo: getSelectedLeanOption(state),
  pickupPackages: getSelectedPickupPackages(state),
})

export default connect(
  mapStateToProps,
  {
    editOmnishipping,
    showOmniShippingCompleted,
  }
)(injectRules(injectIntl(Summary)))
