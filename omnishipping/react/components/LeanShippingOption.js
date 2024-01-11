import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { injectIntl, intlShape } from 'react-intl'
import { CHEAPEST, FASTEST, COMBINED } from '../constants'
import { translate } from './../utils/i18nUtils'
import RadioSelected from '../assets/components/RadioSelected'
import Radio from '../assets/components/Radio'
import LeanShippingOptionPrice from './LeanShippingOptionPrice'
import {
  optionShape,
  storePreferencesDataShape,
} from './../shapes/leanShippingOptionGroupShape'
import styles from './LeanShippingOption.css'

function getTextLabel(intl, option) {
  return {
    [CHEAPEST]: translate(intl, 'cheapestOption'),
    [FASTEST]: translate(intl, 'fastestOption'),
    [COMBINED]: translate(intl, 'combinedOption'),
  }[option.id]
}

class LeanShippingOption extends PureComponent {
  handleClick = event =>
    this.props.updateSLAOption && this.props.updateSLAOption(event.target.value)

  formatPackageDetailsMessage = () => {
    const { option, intl, isPickup } = this.props

    const { packagesLength, shippingEstimate } = option

    const shippingEstimateString =
      shippingEstimate &&
      translate(
        intl,
        `shippingEstimate${isPickup ? 'Pickup' : ''}-${
          shippingEstimate.split(/[0-9]+/)[1]
        }`,
        {
          timeAmount: shippingEstimate.split(/\D+/)[0],
        }
      ).toLowerCase()

    return translate(intl, 'optionPackagesDetails', {
      items: packagesLength,
      shippingEstimate: shippingEstimateString,
    })
  }

  render() {
    const {
      intl,
      leanShipping,
      option,
      optionsLength,
      selectedSla,
      shouldUpdateUi,
      storePreferencesData,
    } = this.props

    const { price, id, packagesLength } = option

    return (
      <label
        className={classNames('shp-lean-option', styles.leanShippingOption, {
          [`shp-lean-option-active ${styles.leanShippingOptionActive}`]:
            id === selectedSla,
        })}
        id={id}>
        <input
          checked={id === selectedSla}
          className={`${styles.leanShippingOptionRadio} shp-option-radio`}
          onChange={this.handleClick}
          type="radio"
          value={id}
        />
        <div className={`${styles.leanShippingIcon} shp-option-icon`}>
          {id === selectedSla ? <RadioSelected /> : <Radio />}
        </div>
        {packagesLength > 1 && optionsLength > 1 ? (
          <Fragment>
            <div className={`shp-option-text ${styles.leanShippingText}`}>
              <div
                className={`shp-option-text-label ${
                  styles.leanShippingTextLabel
                }`}>
                {getTextLabel(intl, option)}
              </div>
              <div className={`shp-option-text-package ${styles.package}`}>
                {leanShipping ? this.formatPackageDetailsMessage() : option.id}
              </div>
            </div>
            <LeanShippingOptionPrice
              price={price}
              shouldUpdateUi={shouldUpdateUi}
              storePreferencesData={storePreferencesData}
            />
          </Fragment>
        ) : (
          <Fragment>
            <div className={`shp-option-text ${styles.leanShippingText}`}>
              {optionsLength > 1 ? (
                <Fragment>
                  <div
                    className={`shp-option-text-label ${
                      styles.leanShippingTextLabel
                    }`}>
                    {getTextLabel(intl, option)}
                  </div>
                  <div className={`shp-option-text-time ${styles.time}`}>
                    {leanShipping
                      ? this.formatPackageDetailsMessage()
                      : option.id}
                  </div>
                </Fragment>
              ) : (
                <div
                  className={`shp-option-text-label-single ${
                    styles.leanShippingTextLabelSingle
                  }`}>
                  {leanShipping
                    ? this.formatPackageDetailsMessage()
                    : option.id}
                </div>
              )}
            </div>
            <LeanShippingOptionPrice
              price={price}
              isScheduledDeliveryAndNotDeliveryWindows={
                option &&
                option.availableDeliveryWindows &&
                option.availableDeliveryWindows.length > 0 &&
                !option.deliveryWindow
              }
              shouldUpdateUi={shouldUpdateUi}
              storePreferencesData={storePreferencesData}
            />
          </Fragment>
        )}
      </label>
    )
  }
}

LeanShippingOption.defaultProps = {
  leanShipping: true,
}

LeanShippingOption.propTypes = {
  intl: intlShape,
  isPickup: PropTypes.bool,
  leanShipping: PropTypes.bool.isRequired,
  option: optionShape.isRequired,
  optionsLength: PropTypes.number.isRequired,
  packagesInLeanOption: PropTypes.array,
  selectedSla: PropTypes.string,
  shouldUpdateUi: PropTypes.bool,
  storePreferencesData: storePreferencesDataShape.isRequired,
  updateSLAOption: PropTypes.func,
}

export default injectIntl(LeanShippingOption)
