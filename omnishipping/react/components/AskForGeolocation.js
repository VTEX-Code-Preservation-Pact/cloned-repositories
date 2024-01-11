import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from './../utils/i18nUtils'
import {
  changeActivePickupDetails,
  changeActivePickupSeller,
  openPickupModal,
} from '../actions/pickup-actions'

import GeolocationPin from '../assets/components/GeolocationPin.js'

import styles from './AskForGeolocation.css'

export class AskForGeolocation extends Component {
  handlePickupModalListGeolocation = () => {
    this.props.openPickupModal({
      askForGeolocation: true,
    })
  }

  handlePickupModalList = () => {
    this.props.openPickupModal({
      askForGeolocation: false,
    })
  }

  render() {
    const { hasGeolocation, intl } = this.props

    return (
      <div className={`${styles.ask} ask-for-geolocation`}>
        <div className={`${styles.wrapper} ask-for-geolocation-ask`}>
          <h2 className={`${styles.title} ask-for-geolocation-title`}>
            {translate(
              intl,
              hasGeolocation
                ? 'askGeolocationTitle'
                : 'askGeolocationDeniedTitle'
            )}
          </h2>
          <h3 className={`${styles.subtitle} ask-for-geolocation-subtitle`}>
            {translate(
              intl,
              hasGeolocation
                ? 'askGeolocationSubtitle'
                : 'askGeolocationDeniedSubtitle'
            )}
          </h3>
          <div className={`${styles.imageAsk} ask-for-geolocation-image-ask`}>
            <GeolocationPin />
          </div>
        </div>
        {hasGeolocation && (
          <Fragment>
            <div className={`${styles.cta} ask-for-geolocation-cta`}>
              <button
                className={`${
                  styles.ctaBtn
                } btn-ask-for-geolocation-cta btn btn-success btn-large`}
                id="find-pickups-geolocation-button"
                onClick={this.handlePickupModalListGeolocation}
                type="button">
                {translate(intl, 'askGeolocationAccept')}
              </button>
            </div>

            <div className={`${styles.manual} ask-for-geolocation-manual`}>
              <button
                className={`${
                  styles.manualBtn
                } btn-ask-for-geolocation-manual btn btn-link`}
                id="find-pickups-manualy-button"
                onClick={this.handlePickupModalList}
                type="button">
                {translate(intl, 'askGeolocationManual')}
              </button>
            </div>
          </Fragment>
        )}

        {!hasGeolocation && (
          <div className={`${styles.cta} ask-for-geolocation-cta`}>
            <button
              className={`${
                styles.ctaBtn
              } btn-ask-for-geolocation-cta btn btn-success btn-large`}
              id="find-pickups-manualy-button-denied"
              onClick={this.handlePickupModalList}
              type="button">
              {translate(intl, 'askGeolocationDenied')}
            </button>
          </div>
        )}
      </div>
    )
  }
}

AskForGeolocation.propTypes = {
  changeActivePickupDetails: PropTypes.func.isRequired,
  changeActivePickupSeller: PropTypes.func.isRequired,
  hasGeolocation: PropTypes.bool.isRequired,
  intl: intlShape,
  openPickupModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  hasGeolocation: state.pickup.hasGeolocation,
})

export default connect(
  mapStateToProps,
  {
    changeActivePickupDetails,
    changeActivePickupSeller,
    openPickupModal,
  }
)(injectIntl(AskForGeolocation))
