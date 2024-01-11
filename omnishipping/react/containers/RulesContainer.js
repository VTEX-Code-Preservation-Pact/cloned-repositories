import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { components } from 'vtex.address-form'
import { getAddress } from '../selectors/address-form-selectors'
import { getDefaultCountryCode } from '../selectors/order-form-selectors'
const { AddressRules } = components

class RulesContainer extends Component {
  render() {
    const { address, defaultCountry, render } = this.props
    const country =
      (address && address.country && address.country.value) || defaultCountry

    return country ? (
      <AddressRules
        country={
          (address && address.country && address.country.value) ||
          defaultCountry
        }
        shouldUseIOFetching>
        {render()}
      </AddressRules>
    ) : (
      render()
    )
  }
}

RulesContainer.propTypes = {
  address: PropTypes.object,
  defaultCountry: PropTypes.string,
  render: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  address: getAddress(state),
  defaultCountry: getDefaultCountryCode(state),
})

export default connect(mapStateToProps)(RulesContainer)
