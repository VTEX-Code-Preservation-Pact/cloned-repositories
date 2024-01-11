import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { translate } from './../utils/i18nUtils'

import {
  closePickupModal,
  closePickupDetails,
  changeActivePickupDetails,
} from '../actions/pickup-actions'
import { changeActiveSLAOption } from '../actions/order-form-actions'

import {
  getUnavailableItemsAmount,
  getPickupPointsById,
} from '../selectors/pickup-selectors'

import IconMarker from '../assets/components/IconMarker'
import { components } from 'vtex.address-form'
const { AddressSummary } = components

import styles from './PickupPoint.css'

export class PickupPoint extends Component {
  render() {
    const { intl, pickupPoint, selectedRules, showAddress } = this.props

    if (!pickupPoint || (pickupPoint && !pickupPoint.pickupStoreInfo.address)) {
      return <div />
    }

    return (
      <div
        className={`${
          styles.PickupPoint
        } pickup-point bg-white bb b--light-gray pv3`}
        id={pickupPoint.id
          .replace(/[^\w\s]/gi, '')
          .split(' ')
          .join('-')}>
        <div
          className={`${
            styles.PickupPointInfo
          } pickup-point-info flex-auto relative mr2`}>
          <IconMarker />
          <div className={`${styles.pointWrapper} pickup-point-wrapper`}>
            <p
              className={`${
                styles.PickupPointName
              } pickup-point-name fw5 f6 pb1y`}>
              {pickupPoint.pickupStoreInfo.friendlyName}
            </p>
            <div
              className={classNames(
                styles.PickupPointAddress,
                'pickup-point-address f7 pb1 gray',
                {
                  'hidden dn': !showAddress,
                }
              )}>
              <AddressSummary
                address={pickupPoint.pickupStoreInfo.address}
                rules={selectedRules}
              />
            </div>

            <button
              className={`${
                styles.details
              } button-details-pickup-point btn btn-link f6 blue no-underline`}
              id="details-pickup-button"
              onClick={this.props.onClickPickupModal}
              type="button">
              {translate(intl, 'details')}
            </button>
          </div>
        </div>
        <button
          className={`${
            styles.pickupPointChange
          } button-change-pickup-point btn btn-link`}
          id="change-pickup-button"
          onClick={this.props.onClickPickupModalList}
          type="button">
          {translate(intl, 'change')}
        </button>
      </div>
    )
  }
}

PickupPoint.defaultProps = {
  showAddress: true,
}

PickupPoint.propTypes = {
  changeActivePickupDetails: PropTypes.func.isRequired,
  changeActiveSLAOption: PropTypes.func.isRequired,
  closePickupDetails: PropTypes.func.isRequired,
  closePickupModal: PropTypes.func.isRequired,
  intl: intlShape,
  isSelected: PropTypes.bool,
  liPackage: PropTypes.object,
  onClickPickupModal: PropTypes.func,
  onClickPickupModalList: PropTypes.func,
  pickupPoint: PropTypes.object.isRequired,
  selectedRules: PropTypes.object.isRequired,
  showAddress: PropTypes.bool,
  unavailableItemsAmount: PropTypes.number.isRequired,
}

const makeMapStateToProps = (state, props) => ({
  unavailableItemsAmount: getUnavailableItemsAmount(state, props),
  pickupPoint: getPickupPointsById(state, props),
})

export default connect(
  makeMapStateToProps,
  {
    closePickupModal,
    changeActiveSLAOption,
    closePickupDetails,
    changeActivePickupDetails,
  }
)(injectIntl(PickupPoint))
