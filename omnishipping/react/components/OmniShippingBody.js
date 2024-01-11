import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import classNames from 'classnames'
import { translate } from './../utils/i18nUtils'
import styles from './../containers/OmniShippingContainer.css'
import { isGiftRegistry } from '../utils/AddressFormUtils'
import DeliveryChannelsToggle from '../components/DeliveryChannelsToggle'
import Summary from '../components/Summary'
import DeliveryChannelsContainer from './../containers/DeliveryChannelsContainer'

export class OmniShippingBody extends PureComponent {
  render() {
    const {
      address,
      giftRegistryData,
      intl,
      isOmniShippingCompleted,
      isPaymentButtonActive,
      hasAvailableDeliveryChannelPickup,
      shouldDisableToggle,
      availableDeliveryChannels,
    } = this.props

    const showDeliveryText =
      !isOmniShippingCompleted && !hasAvailableDeliveryChannelPickup

    return (
      <div
        className={classNames('accordion-inner shipping-container', {
          [styles.content]: !isPaymentButtonActive,
        })}>
        <div
          className={classNames('box-step', {
            'box-info shipping-summary-placeholder': isOmniShippingCompleted,
          })}>
          {showDeliveryText && (
            <p className={styles.selectDeliveryText}>
              {translate(intl, 'selectDeliveryOptions')}
            </p>
          )}
          {!isOmniShippingCompleted &&
            !isGiftRegistry(address) &&
            !giftRegistryData && (
            <div
              id={
                isGiftRegistry(address) ||
                  (address.postalCode && address.postalCode.loading)
                  ? ''
                  : 'postalCode-finished-loading'
              }>
              <DeliveryChannelsToggle
                isDisabled={shouldDisableToggle}
                shouldShowToggle={
                  !isOmniShippingCompleted &&
                    availableDeliveryChannels.length > 1
                }
              />
            </div>
          )}
          {!isOmniShippingCompleted && <DeliveryChannelsContainer />}

          {isOmniShippingCompleted && <Summary />}
        </div>
      </div>
    )
  }
}

OmniShippingBody.propTypes = {
  address: PropTypes.object,
  availableDeliveryChannels: PropTypes.array,
  giftRegistryData: PropTypes.object,
  hasAvailableDeliveryChannelPickup: PropTypes.bool,
  intl: intlShape,
  isOmniShippingCompleted: PropTypes.bool,
  isPaymentButtonActive: PropTypes.func,
  shouldDisableToggle: PropTypes.bool,
}

export default injectIntl(OmniShippingBody)
