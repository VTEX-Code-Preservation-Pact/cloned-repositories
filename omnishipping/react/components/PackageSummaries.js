import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import PackageSummary from './PackageSummary'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'
import { packageShape } from './../shapes/packageShape'
import Slider from './Slider'
import Slide from './Slide'
import omniStyles from './../containers/OmniShippingContainer.css'
import styles from './PackageSummaries.css'

class PackageSummaries extends Component {
  shouldComponentUpdate(nextProps) {
    const leanOptionChanged =
      this.props.activeDeliveryOption !== nextProps.activeDeliveryOption

    const selectedPackagesChanged = !isEqual(
      this.props.selectedPackages,
      nextProps.selectedPackages
    )

    return (
      selectedPackagesChanged ||
      leanOptionChanged ||
      this.props.isEditingOmnishipping !== nextProps.isEditingOmnishipping
    )
  }

  formatKey(index, selectedPackage) {
    return `${index + 1}-${selectedPackage.shippingEstimate}`
  }

  formatPackagesTitle() {
    const { intl } = this.props
    const packagesTitle = translate(intl, 'yourPackages')

    return `${packagesTitle}`
  }

  render() {
    const {
      isEditingOmnishipping,
      selectedPackages,
      selectedDeliveryPackageSlider,
      onHandleSetSelectedPackage,
    } = this.props

    const showSlider = selectedPackages.length > 1 && isEditingOmnishipping

    return (
      <Fragment>
        {selectedPackages.length > 0 && (
          <Fragment>
            <p className={omniStyles.shippingSectionTitle}>
              {this.formatPackagesTitle()}
            </p>
            {selectedPackages.length === 1 && (
              <Fragment>
                {selectedPackages.map((selectedPackage, index) => {
                  const selectedSla = selectedPackage.slas.find(
                    sla => sla.id === selectedPackage.selectedSla
                  )
                  return (
                    selectedPackage.shippingEstimate && (
                      <div
                        className={`package-item ${styles.packageItem}`}
                        key={this.formatKey(index, selectedPackage)}>
                        <PackageSummary
                          deliveryWindow={
                            selectedSla && selectedSla.deliveryWindow
                          }
                          onSetSelectedPackage={onHandleSetSelectedPackage}
                          packageItems={selectedPackage.items}
                          packagesLength={selectedPackages.length}
                          selectedPackage={selectedDeliveryPackageSlider}
                          shippingEstimate={selectedPackage.shippingEstimate}
                        />
                      </div>
                    )
                  )
                })}
              </Fragment>
            )}

            {showSlider && (
              <Slider
                hasArrows={selectedPackages && selectedPackages.length > 1}
                hasBullets={selectedPackages && selectedPackages.length > 1}
                isEditingOmnishipping={isEditingOmnishipping}>
                {selectedPackages.map((selectedPackage, index) => {
                  const selectedSla = selectedPackage.slas.find(
                    sla => sla.id === selectedPackage.selectedSla
                  )
                  return (
                    selectedPackage.shippingEstimate && (
                      <Slide key={this.formatKey(index, selectedPackage)}>
                        <div className={`package-item ${styles.packageItem}`}>
                          <PackageSummary
                            deliveryWindow={
                              selectedSla && selectedSla.deliveryWindow
                            }
                            onSetSelectedPackage={onHandleSetSelectedPackage}
                            packageItems={selectedPackage.items}
                            packagesLength={selectedPackages.length}
                            selectedPackage={selectedDeliveryPackageSlider}
                            shippingEstimate={selectedPackage.shippingEstimate}
                          />
                        </div>
                      </Slide>
                    )
                  )
                })}
              </Slider>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

PackageSummaries.propTypes = {
  activeDeliveryOption: PropTypes.string.isRequired,
  intl: intlShape,
  isEditingOmnishipping: PropTypes.bool.isRequired,
  onHandleSetSelectedPackage: PropTypes.func.isRequired,
  selectedDeliveryPackageSlider: PropTypes.number.isRequired,
  selectedPackages: PropTypes.arrayOf(packageShape).isRequired,
}

export default injectIntl(PackageSummaries)
