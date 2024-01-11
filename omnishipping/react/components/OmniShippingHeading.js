import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import classNames from 'classnames'
import { SHIPPING_HASH } from '../constants'
import { translate } from './../utils/i18nUtils'

export class OmniShippingHeading extends PureComponent {
  render() {
    const {
      onHandleModifyDeliveryOptions,
      intl,
      isOmniShippingCompleted,
    } = this.props

    return (
      <div className="accordion-heading">
        <span
          className={classNames('accordion-toggle collapsed', {
            'accordion-toggle-active': !isOmniShippingCompleted,
          })}>
          <i className="icon-home" /> {translate(intl, 'deliveryTitle')}
          {isOmniShippingCompleted && (
            <a
              className="link-box-edit btn btn-small"
              data-bind="visible: visitedAndNotActive"
              data-i18n="[title]global.edit"
              href={SHIPPING_HASH}
              id="edit-shipping-data"
              onClick={onHandleModifyDeliveryOptions}
              tabIndex="-1"
              title="alterar">
              <i className="icon-edit" />
            </a>
          )}
        </span>
      </div>
    )
  }
}

OmniShippingHeading.propTypes = {
  address: PropTypes.object,
  intl: intlShape,
  isOmniShippingCompleted: PropTypes.bool,
  onHandleModifyDeliveryOptions: PropTypes.func,
}

export default injectIntl(OmniShippingHeading)
