import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import { connect } from 'react-redux'
import { selectAddressItem } from '../actions/order-form-actions'
import { editAddress } from '../actions/component-activity-actions'
import classNames from 'classnames/dedupe'
import RadioSelected from '../assets/components/RadioSelected'
import Radio from '../assets/components/Radio'
import { components } from 'vtex.address-form'
const { AddressSummary } = components

import styles from './AddressItem.css'

class AddressItem extends Component {
  handleClick = () => {
    const {
      address,
      editAddress,
      selectedAddress,
      selectAddressItem,
    } = this.props

    const alreadySelected = isEqual(
      omit(selectedAddress, 'addressQuery'),
      address
    )

    selectAddressItem(address, alreadySelected)
    editAddress(false)
  }

  render() {
    const { address, isSelected, rules, giftRegistryData } = this.props

    return !giftRegistryData ? (
      <label
        className={classNames('address-item', styles.addressItemOption, {
          [styles.active]: isSelected,
        })}
        onClick={this.handleClick}
        selected={isSelected}>
        <div className={`${styles.addressItemIcon} shp-option-icon`}>
          {isSelected ? <RadioSelected /> : <Radio />}
        </div>
        <div className={`shp-option-text ${styles.addressItemText}`}>
          <AddressSummary address={address} rules={rules} />
        </div>
      </label>
    ) : (
      <label
        className={classNames('address-item', styles.addressItemOption, {
          [styles.active]: isSelected,
        })}
        onClick={this.handleClick}
        selected={isSelected}>
        <div className={`${styles.addressItemIcon} shp-option-icon`}>
          {isSelected ? <RadioSelected /> : <Radio />}
        </div>
        <div className={`shp-option-text ${styles.addressItemText}`}>
          <p>{giftRegistryData.giftRegistryTypeName}</p>
        </div>
      </label>
    )
  }
}

AddressItem.propTypes = {
  address: PropTypes.object.isRequired,
  editAddress: PropTypes.func.isRequired,
  giftRegistryData: PropTypes.object,
  isSelected: PropTypes.bool,
  rules: PropTypes.object,
  selectAddressItem: PropTypes.func.isRequired,
  selectedAddress: PropTypes.object,
}

export default connect(
  null,
  {
    selectAddressItem,
    editAddress,
  }
)(AddressItem)
