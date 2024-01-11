import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate, translateDate, translateTime } from './../utils/i18nUtils'

export class SummaryScheduledDelivery extends Component {
  render() {
    const { deliveryWindow, intl } = this.props
    return (
      <div className="shp-summary-scheduled">
        {translate(intl, 'deliveryWindowsSummary', {
          date: translateDate(intl, deliveryWindow.startDateUtc),
          startDate: translateTime(intl, deliveryWindow.startDateUtc),
          endDate: translateTime(intl, deliveryWindow.endDateUtc),
        })}
      </div>
    )
  }
}

SummaryScheduledDelivery.propTypes = {
  deliveryWindow: PropTypes.object.isRequired,
  intl: intlShape,
}

export default injectIntl(SummaryScheduledDelivery)
