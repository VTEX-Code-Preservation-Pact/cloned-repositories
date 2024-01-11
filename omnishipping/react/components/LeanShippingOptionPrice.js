import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { injectIntl, intlShape } from 'react-intl'
import { formatCurrency } from '../utils/Currency'
import { translate } from './../utils/i18nUtils'
import { storePreferencesDataShape } from './../shapes/leanShippingOptionGroupShape'
import styles from './LeanShippingOption.css'

class LeanShippingOptionPrice extends Component {
  getPrice() {
    const { intl, price, storePreferencesData } = this.props

    if (price === 0) {
      return translate(intl, 'free')
    }
    return formatCurrency({
      value: price,
      storePreferencesData,
    })
  }

  render() {
    const {
      intl,
      isScheduledDeliveryAndNotDeliveryWindows,
      shouldUpdateUi,
    } = this.props

    const price = this.getPrice()

    return (
      <div className={`shp-option-text-price ${styles.price}`}>
        {shouldUpdateUi ? (
          isScheduledDeliveryAndNotDeliveryWindows ? (
            translate(intl, 'scheduledDeliveryPrice', {
              price,
            })
          ) : (
            price
          )
        ) : (
          <Skeleton />
        )}
      </div>
    )
  }
}

LeanShippingOptionPrice.defaultProps = {
  isScheduledDeliveryAndNotDeliveryWindows: false,
}

LeanShippingOptionPrice.propTypes = {
  intl: intlShape,
  price: PropTypes.number,
  shouldUpdateUi: PropTypes.bool,
  isScheduledDeliveryAndNotDeliveryWindows: PropTypes.bool,
  storePreferencesData: storePreferencesDataShape.isRequired,
}

export default injectIntl(LeanShippingOptionPrice)
