import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from './../utils/i18nUtils'
import { injectIntl, intlShape } from 'react-intl'

export class PickupShippingEstimate extends PureComponent {
  render() {
    const { intl, shippingEstimate } = this.props

    return (
      <span className="shipping-estimate">
        {translate(
          intl,
          `shippingEstimatePickup-${shippingEstimate.split(/[0-9]+/)[1]}`,
          {
            timeAmount: shippingEstimate.split(/\D+/)[0],
          }
        )}
      </span>
    )
  }
}

PickupShippingEstimate.propTypes = {
  intl: intlShape,
  shippingEstimate: PropTypes.string.isRequired,
}

export default injectIntl(PickupShippingEstimate)
