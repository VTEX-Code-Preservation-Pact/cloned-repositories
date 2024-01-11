import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import PropTypes from 'prop-types'
import { itemShape } from '../shapes/itemShape'
import { slaShape } from '../shapes/packageShape'
import { translate } from '../utils/i18nUtils'
import styles from './SummaryPriceShippingEstimate.css'
class SummaryPriceShippingEstimate extends Component {
  render() {
    const {
      index,
      intl,
      selectedSlaObj,
      isPickupChannel,
      pack,
      orderFormItems,
      shouldShowItemsLength,
      shouldShowPackagesTitle,
    } = this.props

    return (
      <div className={`${styles.summaryPackage} shp-summary-package`}>
        {shouldShowPackagesTitle && (
          <div className={`${styles.packageTitle} shp-summary-package-title`}>
            {translate(intl, 'package')} {index + 1}
          </div>
        )}
        {shouldShowItemsLength && (
          <span className="shp-summary-package-items">
            {translate(intl, 'items', {
              itemsAmount: isPickupChannel
                ? orderFormItems.length
                : pack.items.length,
            })}{' '}
          </span>
        )}
        <span
          className={`${shouldShowItemsLength &&
            styles.estimateMultiple} shp-summary-package-time`}>
          {translate(intl, 'slaOptionSimple', {
            scheduled:
              selectedSlaObj.deliveryWindow && translate(intl, 'scheduled'),
            shippingEstimate:
              !selectedSlaObj.deliveryWindow &&
              translate(
                intl,
                `${
                  isPickupChannel
                    ? 'shippingEstimatePickup'
                    : 'shippingEstimate'
                }-${pack.shippingEstimate.split(/[0-9]+/)[1]}`,
                {
                  timeAmount: pack.shippingEstimate.split(/\D+/)[0],
                }
              ),
          })}
        </span>
      </div>
    )
  }
}

SummaryPriceShippingEstimate.propTypes = {
  index: PropTypes.number,
  intl: intlShape,
  isPickupChannel: PropTypes.bool.isRequired,
  orderFormItems: PropTypes.arrayOf(itemShape).isRequired,
  pack: PropTypes.object.isRequired,
  selectedSlaObj: slaShape,
  shouldShowItemsLength: PropTypes.bool.isRequired,
  shouldShowPackagesTitle: PropTypes.bool.isRequired,
}

export default injectIntl(SummaryPriceShippingEstimate)
