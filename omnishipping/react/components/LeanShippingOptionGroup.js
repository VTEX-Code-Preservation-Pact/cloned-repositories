import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { connect } from 'react-redux'
import {
  optionShape,
  storePreferencesDataShape,
} from './../shapes/leanShippingOptionGroupShape'

import { getSelectedPackages } from '../selectors/delivery-selectors'
import { changeActiveDeliveryPackage } from '../actions/order-form-actions'
import { setAditionalShippingData } from '../actions/component-activity-actions'

import LeanShippingOption from './LeanShippingOption'
import styles from './LeanShippingOptionGroup.css'

export class LeanShippingOptionGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: props.options,
    }
  }

  componentDidMount() {
    const hasOptions = this.props.options.length === 0
    const hasSelectedSla = this.props.selectedSla !== null

    if (hasOptions || hasSelectedSla) {
      return
    }

    this.updateSLAOption(this.props.selectedSla)
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      options:
        (nextProps.shouldUpdateUi && nextProps.options) || this.state.options,
    })
  }

  updateSLAOption = id => {
    this.props.changeActiveDeliveryPackage(id)
  }

  render() {
    const {
      shouldUpdateUi,
      storePreferencesData,
      selectedPackages,
      selectedSla,
    } = this.props

    const { options } = this.state

    return (
      options.length > 0 && (
        <div
          className={`${styles.leanShippingGroupList} shp-lean`}
          id="delivery-packages-options">
          {options.map(option => (
            <LeanShippingOption
              key={option.id}
              option={option}
              optionsLength={options.length}
              selectedPackages={selectedPackages}
              selectedSla={selectedSla}
              shouldUpdateUi={shouldUpdateUi}
              storePreferencesData={storePreferencesData}
              updateSLAOption={this.updateSLAOption}
            />
          ))}
        </div>
      )
    )
  }
}

LeanShippingOptionGroup.propTypes = {
  changeActiveDeliveryPackage: PropTypes.func.isRequired,
  intl: intlShape,
  isSelected: PropTypes.bool,
  options: PropTypes.arrayOf(optionShape),
  order: PropTypes.number,
  selectedPackages: PropTypes.array,
  selectedSla: PropTypes.string.isRequired,
  setAditionalShippingData: PropTypes.func.isRequired,
  shouldUpdateUi: PropTypes.bool.isRequired,
  storePreferencesData: storePreferencesDataShape.isRequired,
}

const mapStateToProps = state => ({
  selectedPackages: getSelectedPackages(state),
  storePreferencesData: state.orderForm.storePreferencesData,
  shouldUpdateUi: state.delivery.shouldUpdateUi,
})

export default connect(
  mapStateToProps,
  {
    changeActiveDeliveryPackage,
    setAditionalShippingData,
  }
)(injectIntl(LeanShippingOptionGroup))
