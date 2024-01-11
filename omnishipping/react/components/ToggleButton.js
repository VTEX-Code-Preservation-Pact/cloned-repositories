import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'
import styles from './ToggleButton.css'

export class ToggleButton extends Component {
  handleClick = () => this.props.onClick(this.props.tabValue)

  render() {
    const {
      intl,
      translateString,
      activeTab,
      tabValue,
      isDisabled,
    } = this.props

    const optionsActive = `shp-method-option-active ${
      styles.deliveryOptionActive
    }`
    const optionsInactive = `shp-method-option-inactive ${
      styles.deliveryOptionInactive
    }`

    const activeClasses =
      activeTab === tabValue ? optionsActive : optionsInactive

    return (
      <button
        className={`shp-method-option ${
          styles.deliveryChannelsOption
        } ${activeClasses}`}
        disabled={isDisabled}
        id={`shipping-option-${tabValue}`}
        onClick={this.handleClick}
        type="button">
        {isDisabled &&
          activeTab === tabValue && (
          <span className={styles.deliveryChannelsLoader} />
        )}
        <span className="shp-method-option-text">
          {translate(intl, translateString)}
        </span>
        <span
          className={`shp-method-option-complement ${
            styles.deliveryChannelsComplement
          }`}>
          {translate(intl, `${translateString}Complement`)}
        </span>
      </button>
    )
  }
}

ToggleButton.propTypes = {
  activeTab: PropTypes.string.isRequired,
  intl: intlShape,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  tabValue: PropTypes.string.isRequired,
  translateString: PropTypes.string.isRequired,
}

export default injectIntl(ToggleButton)
