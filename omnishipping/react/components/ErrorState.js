import React, { Component } from 'react'
import { intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'
import PropTypes from 'prop-types'

export class ErrorState extends Component {
  reloadPage() {
    window.location.reload()
  }

  render() {
    const { intl, errorId } = this.props

    return (
      <div className="step accordion-group shipping-data">
        <div className="accordion-heading">
          <span className="accordion-toggle collapsed">
            <i className="icon-home" />{' '}
            {translate(intl, 'deliveryTitle') || 'Delivery'}
          </span>
        </div>
        <div className="accordion-inner">
          <div className="box-step box-info shipping-summary-placeholder">
            <div className="shipping-summary-info">
              <p>{translate(intl, 'jsError') || 'Something went wrong'}</p>
              <p data-hj-whitelist>
                {translate(intl, 'errorId', {
                  errorId,
                }) || `ErrorId: ${errorId}`}
              </p>
              <button
                className="btn btn-success"
                onClick={() => this.reloadPage()}>
                {translate(intl, 'reloadThePage')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ErrorState.propTypes = {
  errorId: PropTypes.string.isRequired,
  intl: intlShape,
}

export default ErrorState
