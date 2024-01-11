import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import classNames from 'classnames'
import { translate } from './../utils/i18nUtils'
import { isCurrentChannel } from './../utils/DeliveryChannelsUtils'
import DeliveryContainer from './../containers/DeliveryContainer'
import Info from '../components/Info'
import { helpers } from 'vtex.address-form'
const { injectAddressContext } = helpers

import styles from './../containers/OmniShipping.css'

export class DeliveryChannelsDelivery extends Component {
  handleClick = () => this.props.showSplit(true)

  render() {
    const {
      activeDeliveryChannel,
      address,
      canEditData,
      channel,
      googleMapsKey,
      hasSelectedDeliveryChannelPickup,
      hasSelectedDeliveryChannelDelivery,
      hasSelectedPickups,
      hasSlas,
      index,
      intl,
      isLoggedIn,
      onChangeAddress,
      rules,
      shipsTo,
      searchAddress,
      selectedDeliveryChannels,
    } = this.props

    const isChannelActive = isCurrentChannel(activeDeliveryChannel, channel)
    const hasGeoCoordinates = searchAddress.geoCoordinates.length > 0
    const hasGeocoordinatesOrPickup = hasGeoCoordinates || hasSelectedPickups
    const hasSelectedDeliveryChannel =
      hasSelectedDeliveryChannelDelivery && hasSelectedDeliveryChannelPickup

    const isDeliverySplit =
      selectedDeliveryChannels.length > 1 &&
      index === 1 &&
      hasSlas &&
      !isLoggedIn

    const shouldShowDelivery =
      !isDeliverySplit || (isDeliverySplit && this.props.isSplitActive)

    return (
      (isChannelActive ||
        (hasSelectedDeliveryChannel && hasGeocoordinatesOrPickup)) && (
        <Fragment>
          {isDeliverySplit && (
            <Fragment>
              <div className={styles.deliverTitle}>
                {translate(intl, 'receiveRemainingPackages')}
              </div>
              {!this.props.isSplitActive && (
                <Fragment>
                  <Info
                    className={classNames({
                      'shp-info-pickup': canEditData,
                      'shp-info-pickup-identified': !canEditData,
                    })}>
                    {canEditData
                      ? translate(intl, 'pickupSplitDisclaimer')
                      : translate(intl, 'pickupSplitDisclaimerLogged')}
                  </Info>
                  <button
                    className={`btn btn-link ${styles.btnDelivery}`}
                    onClick={this.handleClick}>
                    {translate(intl, 'fillDeliveryData')}
                  </button>
                </Fragment>
              )}
            </Fragment>
          )}

          {shouldShowDelivery && (
            <DeliveryContainer
              address={address}
              googleMapsKey={googleMapsKey}
              onChangeAddress={onChangeAddress}
              rules={rules}
              shipsTo={shipsTo}
            />
          )}
        </Fragment>
      )
    )
  }
}

DeliveryChannelsDelivery.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  address: PropTypes.object,
  canEditData: PropTypes.bool.isRequired,
  channel: PropTypes.string.isRequired,
  googleMapsKey: PropTypes.string,
  hasSelectedDeliveryChannelDelivery: PropTypes.bool.isRequired,
  hasSelectedDeliveryChannelPickup: PropTypes.bool.isRequired,
  hasSelectedPickups: PropTypes.bool.isRequired,
  hasSlas: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  intl: intlShape,
  isLoggedIn: PropTypes.bool.isRequired,
  isSplitActive: PropTypes.bool.isRequired,
  onChangeAddress: PropTypes.func,
  rules: PropTypes.object.isRequired,
  searchAddress: PropTypes.object.isRequired,
  selectedDeliveryChannels: PropTypes.array.isRequired,
  shipsTo: PropTypes.array,
  showSplit: PropTypes.func.isRequired,
}

export default injectAddressContext(injectIntl(DeliveryChannelsDelivery))
