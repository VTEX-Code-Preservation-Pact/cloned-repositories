import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import React, { Component } from 'react'

import { selectDeliveryChannel } from '../actions/component-activity-actions'
import IconAlert from '../assets/components/IconAlert'
import ProductItems from './ProductItems'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { focusOnInput } from '../actions/address-form-actions'
import { getAddressPostalCode } from '../selectors/address-form-selectors'
import { getUnavailableItems } from '../selectors/unavailable-selectors'
import { removeItemsFromCart } from '../actions/order-form-actions'
import styles from './UnavailableDelivery.css'
import { translate } from './../utils/i18nUtils'
import { isDelivery, isPickup } from './../utils/DeliveryChannelsUtils'
import { PICKUP_IN_STORE } from '../constants'

export class UnavailableDelivery extends Component {
  handleChangePostalCode = () => {
    this.props.focusOnInput({
      name: 'postalCode',
      value: '',
    })
  }

  handleRemoveFromCart = () => {
    const { removeItemsFromCart, unavailableItems } = this.props

    if (unavailableItems.logisticsInfo) {
      removeItemsFromCart({
        logisticsInfo: unavailableItems.logisticsInfo,
      })
    } else {
      removeItemsFromCart({
        items: unavailableItems.items,
      })
    }
  }

  render() {
    const {
      activeDeliveryChannel,
      intl,
      postalCode,
      unavailableItems,
    } = this.props

    const { logisticsInfo } = unavailableItems

    const hasPickup =
      logisticsInfo &&
      logisticsInfo.some(item => item.slas.some(sla => isPickup(sla)))

    return (
      <div className={`shp-alert ${styles.warning}`}>
        <div className={`shp-alert-disclaimer ${styles.disclaimer}`}>
          <span className={`shp-alert-icon ${styles.unavailableIcon}`}>
            <IconAlert />
          </span>

          <p id="unavailable-delivery-disclaimer">
            {translate(intl, 'unavailableDelivery', {
              postalCode: postalCode,
              items: unavailableItems.items.length,
            })}{' '}
            {isDelivery(activeDeliveryChannel) ? (
              <React.Fragment>
                <FormattedMessage
                  id="omnishipping.unavailableDeliveryOptionsPostalCode"
                  values={{
                    removeFromCart: (
                      <a
                        className={`btn btn-link ${styles.btnLeft}`}
                        id="remove-unavailable-items"
                        onClick={this.handleRemoveFromCart}>
                        {translate(intl, 'removeFromCart', {
                          items: unavailableItems.items.length,
                        })}
                      </a>
                    ),
                  }}
                />
                {hasPickup && (
                  <div
                    className={`${
                      styles.pickupButtonWrapper
                    } button-unavailable-delivery-pickup-wrapper`}>
                    <button
                      className={`${
                        styles.pickupButton
                      } button-unavailable-delivery-pickup`}
                      onClick={e => {
                        e.preventDefault()
                        this.props.selectDeliveryChannel(PICKUP_IN_STORE)
                      }}>
                      {translate(intl, 'pickUpItems', {
                        items: unavailableItems.items.length,
                      })}
                    </button>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <FormattedMessage
                id="omnishipping.unavailableDeliveryOptions"
                values={{
                  removeFromCart: (
                    <a
                      className={`btn btn-link ${styles.btnLeft}`}
                      id="remove-unavailable-items"
                      onClick={this.handleRemoveFromCart}>
                      {translate(intl, 'removeFromCart', {
                        items: unavailableItems.items.length,
                      })}
                    </a>
                  ),
                }}
              />
            )}
          </p>
        </div>
        <div className={`shp-product-items ${styles.productItems}`}>
          <ProductItems isAvailable={false} items={unavailableItems.items} />
        </div>
      </div>
    )
  }
}

UnavailableDelivery.propTypes = {
  activeDeliveryChannel: PropTypes.string,
  focusOnInput: PropTypes.func.isRequired,
  intl: intlShape,
  postalCode: PropTypes.string,
  removeItemsFromCart: PropTypes.func.isRequired,
  selectDeliveryChannel: PropTypes.func.isRequired,
  unavailableItems: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  postalCode: getAddressPostalCode(state),
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  unavailableItems: getUnavailableItems(state, ownProps),
})

export default connect(
  mapStateToProps,
  {
    removeItemsFromCart,
    focusOnInput,
    selectDeliveryChannel,
  }
)(injectIntl(UnavailableDelivery))
