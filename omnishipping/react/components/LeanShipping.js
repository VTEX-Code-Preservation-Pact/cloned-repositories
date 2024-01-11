import React, { Component, Fragment } from 'react'
import {
  getSelectedPackages,
  hasAllPackagesCalculated,
  hasPickupsSelected,
  hasSlas,
} from '../selectors/delivery-selectors'
import {
  hasAllItemsSelectedScheduledDeliveries,
  hasDeliveryScheduledDelivery,
  hasSelectedDeliveryScheduledDelivery,
  hasSelectedScheduledDelivery,
} from '../selectors/scheduled-delivery-selectors'
import { injectIntl, intlShape } from 'react-intl'

import Alert from './Alert'
import { DELIVERY } from '../constants/index'
import LeanShippingOptionGroup from './LeanShippingOptionGroup'
import PackageSummaries from './PackageSummaries'
import PropTypes from 'prop-types'
import ScheduledDeliveryToggle from './ScheduledDeliveryToggle'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { getUnavailableItems } from '../selectors/unavailable-selectors'
import { hasMultipleScheduledDeliveries } from '../selectors/order-form-selectors'
import { packageShape } from './../shapes/packageShape'
import omniStyles from './../containers/OmniShippingContainer.css'
import styles from './LeanShipping.css'
import { translate } from './../utils/i18nUtils'
import { updateSelectedPackageSlider } from '../actions/delivery-packages-actions'

function formatOptions(optionsObject) {
  return (
    (optionsObject &&
      Object.keys(optionsObject).map(leanOption => {
        return optionsObject[leanOption]
      })) ||
    []
  )
}

export class LeanShipping extends Component {
  handleSetSelectedPackage = index =>
    this.props.updateSelectedPackageSlider(index)

  render() {
    const {
      activeDeliveryOption,
      hasAllItemsSelectedScheduledDeliveries,
      hasAllPackagesCalculated,
      hasDeliveryScheduledDelivery,
      hasPickupsSelected,
      hasSlas,
      hasSelectedDeliveryScheduledDelivery,
      intl,
      isEditingOmnishipping,
      selectedDeliveryPackageSlider,
      selectedPackages,
      leanShippingOptions,
      unavailableItems,
    } = this.props

    const hasMoreThanOnePackage = leanShippingOptions.some(
      option => option.packagesLength > 1
    )

    const hasUnavailableItems = get(unavailableItems, 'items.length') > 0

    const showPackageSlider =
      (hasMoreThanOnePackage || hasPickupsSelected || hasUnavailableItems) &&
      !hasAllItemsSelectedScheduledDeliveries

    const showLeanShipping =
      !hasUnavailableItems &&
      hasSlas &&
      selectedPackages.length > 0 &&
      hasAllPackagesCalculated

    return (
      <Fragment>
        {showLeanShipping && (
          <div className={styles.deliveryGroup}>
            {leanShippingOptions.length > 0 && (
              <p className={omniStyles.shippingSectionTitle}>
                {translate(intl, 'deliveryOption')}
              </p>
            )}

            {hasDeliveryScheduledDelivery && (
              <ScheduledDeliveryToggle channel={DELIVERY} />
            )}
            {!hasAllItemsSelectedScheduledDeliveries &&
              hasAllPackagesCalculated && (
              <Fragment>
                {hasSelectedDeliveryScheduledDelivery && (
                  <Fragment>
                    <Alert className="shp-alert-delivery shp-alert-schedule-unavailable">
                      {translate(intl, 'scheduledDeliverySplitDisclaimer')}
                    </Alert>
                    <p className={omniStyles.shippingSectionTitle}>
                      {translate(intl, 'deliveryOptionsLeft')}
                    </p>
                  </Fragment>
                )}

                <LeanShippingOptionGroup
                  options={leanShippingOptions}
                  selectedSla={activeDeliveryOption}
                />
              </Fragment>
            )}

            {showPackageSlider && (
              <PackageSummaries
                activeDeliveryOption={activeDeliveryOption}
                isEditingOmnishipping={isEditingOmnishipping}
                onHandleSetSelectedPackage={this.handleSetSelectedPackage}
                selectedDeliveryPackageSlider={selectedDeliveryPackageSlider}
                selectedPackages={selectedPackages}
              />
            )}
          </div>
        )}
      </Fragment>
    )
  }
}

LeanShipping.propTypes = {
  activeDeliveryOption: PropTypes.string.isRequired,
  hasAllItemsSelectedScheduledDeliveries: PropTypes.bool.isRequired,
  hasAllPackagesCalculated: PropTypes.bool.isRequired,
  hasDeliveryScheduledDelivery: PropTypes.bool.isRequired,
  hasMultipleScheduledDeliveries: PropTypes.bool.isRequired,
  hasPickupsSelected: PropTypes.bool.isRequired,
  hasSelectedDeliveryScheduledDelivery: PropTypes.bool.isRequired,
  hasSlas: PropTypes.bool.isRequired,
  intl: intlShape,
  isEditingOmnishipping: PropTypes.bool.isRequired,
  leanShippingOptions: PropTypes.array.isRequired,
  selectedDeliveryPackageSlider: PropTypes.number.isRequired,
  selectedPackages: PropTypes.arrayOf(packageShape),
  unavailableItems: PropTypes.array,
  updateSelectedPackageSlider: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  activeDeliveryOption: state.delivery.activeDeliveryOption,
  hasSelectedScheduledDelivery: hasSelectedScheduledDelivery(state),
  hasDeliveryScheduledDelivery: hasDeliveryScheduledDelivery(state),
  hasAllItemsSelectedScheduledDeliveries: hasAllItemsSelectedScheduledDeliveries(
    state,
    ownProps
  ),
  hasMultipleScheduledDeliveries: hasMultipleScheduledDeliveries(state),
  hasSelectedDeliveryScheduledDelivery: hasSelectedDeliveryScheduledDelivery(
    state
  ),
  hasSlas: hasSlas(state),
  hasPickupsSelected: hasPickupsSelected(state),
  isEditingOmnishipping: state.componentActivity.isEditingOmnishipping,
  selectedDeliveryPackageSlider: state.delivery.selectedDeliveryPackageSlider,
  leanShippingOptions: formatOptions(state.delivery.optionsDetails),
  hasAllPackagesCalculated: hasAllPackagesCalculated(state),
  selectedPackages: getSelectedPackages(state),
  unavailableItems: getUnavailableItems(state),
})

export default connect(
  mapStateToProps,
  {
    updateSelectedPackageSlider,
  }
)(injectIntl(LeanShipping))
