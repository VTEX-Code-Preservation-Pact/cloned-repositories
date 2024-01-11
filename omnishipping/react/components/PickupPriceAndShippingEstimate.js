import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PickupShippingEstimate from '../components/PickupShippingEstimate'
import ProductItems from '../components/ProductItems'
import { translate } from './../utils/i18nUtils'
import LeanShippingOption from './LeanShippingOption'
import omniStyles from './../containers/OmniShippingContainer.css'
import styles from './PickupPriceAndShippingEstimate.css'
import lsStyles from './LeanShippingOptionGroup.css'

export class PickupPriceAndShippingEstimate extends PureComponent {
  render() {
    const {
      intl,
      items,
      price,
      shippingEstimate,
      storePreferencesData,
      hasSplit,
    } = this.props

    const options = [
      {
        id: 'CHEAPEST',
        packagesLength: 1,
        price: price,
        shippingEstimate: shippingEstimate,
      },
    ]

    return (
      <div className={`pickup-packages ${styles.packages}`}>
        <p className={omniStyles.shippingSectionTitle}>
          {translate(intl, 'pickupOption')}
        </p>

        <div
          className={`${lsStyles.leanShippingGroupList} shp-lean`}
          id="delivery-packages-options">
          {options.map(option => (
            <LeanShippingOption
              isPickup
              key={option.id}
              option={option}
              optionsLength={options.length}
              selectedPackages={0}
              selectedSla="CHEAPEST"
              shouldUpdateUi
              storePreferencesData={storePreferencesData}
            />
          ))}
        </div>

        {hasSplit && (
          <Fragment>
            <p className={omniStyles.shippingSectionTitle}>
              {translate(intl, 'choosePickup')}
            </p>
            <div className={styles.package}>
              <div className={styles.top}>
                <div className={styles.time}>
                  <PickupShippingEstimate shippingEstimate={shippingEstimate} />
                </div>
              </div>
              <div className={styles.items}>
                <ProductItems items={items} />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

PickupPriceAndShippingEstimate.propTypes = {
  hasSplit: PropTypes.bool.isRequired,
  intl: intlShape,
  items: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  shippingEstimate: PropTypes.string.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
}

export default injectIntl(PickupPriceAndShippingEstimate)
