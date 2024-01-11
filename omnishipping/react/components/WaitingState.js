import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'

export class WaitingState extends Component {
  render() {
    const { intl, loading } = this.props

    return (
      <div className="step accordion-group shipping-data">
        <div className="accordion-heading">
          <span className="accordion-toggle collapsed">
            <i className="icon-home" /> {translate(intl, 'deliveryTitle')}
          </span>
        </div>
        <div className="accordion-inner">
          <div className="box-step box-info shipping-summary-placeholder">
            <div className="shipping-summary-info">
              {loading ? <Skeleton /> : translate(intl, 'awatingData')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WaitingState.defaultProps = {
  loading: false,
}

WaitingState.propTypes = {
  intl: intlShape,
  loading: PropTypes.bool,
}

export default injectIntl(WaitingState)
