import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from './../utils/i18nUtils'
import { injectIntl, intlShape } from 'react-intl'
import { formatCurrency } from '../utils/Currency'

export class PickupPrice extends PureComponent {
  render() {
    const { intl, price, storePreferencesData } = this.props
    const hasPrice = price !== 0

    return hasPrice ? (
      <strong className="shipping-price">
        {formatCurrency({
          value: price,
          storePreferencesData,
        })}
      </strong>
    ) : (
      <strong className="shipping-price">{translate(intl, 'free')}</strong>
    )
  }
}

PickupPrice.propTypes = {
  intl: intlShape,
  price: PropTypes.number.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
}

export default injectIntl(PickupPrice)
