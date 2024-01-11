import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'

class GiftListTitle extends Component {
  render() {
    const { giftRegistryData, intl } = this.props
    const giftRegistryTypeName = giftRegistryData
      ? giftRegistryData.giftRegistryTypeName
      : giftRegistryData

    return (
      <p>
        {`${translate(intl, 'deliveryAddressTitle')}: `}
        <b>{`${giftRegistryTypeName}`}</b>
      </p>
    )
  }
}

GiftListTitle.propTypes = {
  intl: intlShape,
  giftRegistryData: PropTypes.object,
}

export default injectIntl(GiftListTitle)
