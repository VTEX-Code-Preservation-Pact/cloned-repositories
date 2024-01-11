import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import ButtonLink from './ButtonLink'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatCurrency } from '../utils/Currency'
import moment from 'moment'
import { selectDeliveryWindow } from '../actions/order-form-actions'
import styles from './ScheduledDelivery.css'
import { translate } from './../utils/i18nUtils'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

class ScheduledDelivery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedWindow: null,
      windowOptions: [],
      datesIncluded: [],
      outerSla: props.sla,
      locale: props.intl.locale.toLowerCase(),
    }
  }

  componentDidMount() {
    const locale = this.props.intl.locale.toLowerCase()

    import(`moment/locale/${locale}`)
      .then(() => this.initialSetup())
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(error)
        }
        return import(`moment/locale/${this.getBaseLocale(locale)}`)
          .then(() => this.initialSetup())
          .catch(error => {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(error)
            }
            this.initialSetup()
          })
      })
  }

  componentDidUpdate() {
    if (
      this.props.triedCompleteOmnishipping &&
      !this.state.selectedDate &&
      this.props.previousHasSelectedWindow
    ) {
      this.openCalendar()
    }
  }

  openCalendar = () => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      document
        .querySelector(`.scheduled-delivery-choose-${this.props.sla.id}`)
        .scrollIntoView()
    }

    this._calendar.setOpen(true)
  }

  getBaseLocale(locale) {
    return locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  }

  getSelectedDeliveryWindow = sla => {
    return sla && sla.deliveryWindow
  }

  initialSetup = () => {
    const { sla } = this.props

    this.setState({
      sla,
      datesIncluded: uniqBy(
        sla.availableDeliveryWindows.map(windowOption => ({
          date: moment.utc(windowOption.startDateUtc).format('L'),
          startDateUtc: moment
            .utc(windowOption.startDateUtc)
            .locale(this.state.locale),
        })),
        'date'
      ),
    })
    this.setDates({ outerSla: sla })
  }

  handleDatePickerChange = date => {
    this.setDates({ date, outerSla: this.props.sla })
  }

  handleChange = event => {
    const { sla } = this.state

    const selectedWindow = sla.availableDeliveryWindows
      .filter(
        windowOption =>
          windowOption.startDateUtc.toString() === event.target.value
      )
      .find(item => item)

    if (selectedWindow) {
      this.props.selectDeliveryWindow(sla && sla.id, selectedWindow)
    }

    this.setState({ selectedWindow })
  }

  setDates = ({ date, outerSla }) => {
    const { sla, selectedDate } = this.state
    const selectedDeliveryWindow = this.getSelectedDeliveryWindow(outerSla)

    const localDate =
      date || (selectedDeliveryWindow && selectedDeliveryWindow.startDateUtc)
    const availableWindowsDay =
      sla &&
      sla.availableDeliveryWindows &&
      sla.availableDeliveryWindows.filter(
        windowOption =>
          moment(windowOption.startDateUtc).format('YYYY MM DD') ===
          moment(localDate).format('YYYY MM DD')
      )

    if (!selectedDeliveryWindow || localDate !== selectedDate) {
      const deliveryWindow =
        (availableWindowsDay && availableWindowsDay[0]) === undefined
          ? null
          : availableWindowsDay[0]
      deliveryWindow &&
        this.props.selectDeliveryWindow(sla && get(sla, 'id'), deliveryWindow)
    }

    this.setState({
      selectedDate: localDate,
      windowOptions: availableWindowsDay,
      selectedWindow: selectedDeliveryWindow || availableWindowsDay[0],
    })
  }

  render() {
    const {
      datesIncluded,
      locale,
      selectedWindow,
      selectedDate,
      windowOptions,
      sla,
    } = this.state

    const { intl, storePreferencesData } = this.props

    const hasSelectedDateAndWindow =
      !!selectedDate && !!selectedWindow && windowOptions.length > 0

    const hasSelectedDateWithoutWindows =
      !!selectedDate && windowOptions.length === 0

    return (
      <div className={styles.scheduledDelivery}>
        <span className={styles.date}>
          <DatePicker
            ref={c => (this._calendar = c)}
            className={styles.datepicker}
            customInput={
              <div>
                <span
                  className={`${
                    selectedDate ? styles.selectedDate : ''
                  } shp-selected-date`}>
                  {selectedDate &&
                    `${moment(selectedDate)
                      .locale(locale)
                      .format(translate(intl, 'datepickerDateFormat'))}`}
                </span>
                {selectedDate ? (
                  <ButtonLink
                    style={`${
                      styles.dateLinkModify
                    } shp-datepicker-modify-button`}>
                    {translate(intl, 'modify')}
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    slaId={sla && sla.id}
                    id="scheduled-delivery-choose"
                    className="scheduled-delivery-choose"
                    style={`${styles.dateLink} shp-datepicker-button`}>
                    {translate(intl, 'scheduledDeliveryChoice')}
                  </ButtonLink>
                )}
              </div>
            }
            dateFormat={translate(intl, 'datepickerDateFormat')}
            includeDates={datesIncluded.map(date => date.startDateUtc)}
            locale={locale}
            onChange={this.handleDatePickerChange}
            popperClassName={styles.datePopper}
            popperPlacement={'top'}
            selected={selectedDate && moment(selectedDate).locale(locale)}
          />
        </span>
        {sla &&
          hasSelectedDateAndWindow && (
          <select
            className="span12"
            id={`scheduled-delivery-${sla.id}`}
            onChange={this.handleChange}
            value={selectedWindow.startDateUtc}>
            {windowOptions.map(windowOption => {
              const startDate = moment
                .utc(windowOption.startDateUtc)
                .format('LT')

              const endDate = moment.utc(windowOption.endDateUtc).format('LT')

              const formattedPrice = formatCurrency({
                value: windowOption.price + sla.price,
                storePreferencesData: storePreferencesData,
              })
              return (
                <option
                  id={windowOption.startDateUtc}
                  key={windowOption.startDateUtc + windowOption.endDateUtc}
                  value={windowOption.startDateUtc}>
                  {translate(intl, 'deliveryWindows', {
                    startDate,
                    endDate,
                  })}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  {windowOption.price + sla.price === 0
                    ? translate(intl, 'free')
                    : formattedPrice}
                </option>
              )
            })}
          </select>
        )}
        {sla &&
          hasSelectedDateWithoutWindows && (
          <p>{translate(intl, 'noTimesAvailable')}</p>
        )}
      </div>
    )
  }
}

ScheduledDelivery.propTypes = {
  intl: intlShape,
  previousHasSelectedWindow: PropTypes.bool,
  selectDeliveryWindow: PropTypes.func.isRequired,
  sla: PropTypes.object,
  storePreferencesData: PropTypes.object,
  triedCompleteOmnishipping: PropTypes.bool,
}

const mapStateToProps = state => ({
  storePreferencesData: state.orderForm.storePreferencesData,
  triedCompleteOmnishipping: state.componentActivity.triedCompleteOmnishipping,
})

export default connect(
  mapStateToProps,
  {
    selectDeliveryWindow,
  }
)(injectIntl(ScheduledDelivery))
