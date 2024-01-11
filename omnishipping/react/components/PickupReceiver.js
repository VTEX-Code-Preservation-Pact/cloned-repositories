import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from './../utils/i18nUtils'

import Person from '../assets/components/Person'
import styles from './PickupReceiver.css'

export class PickupReceiver extends Component {
  handleClickEdit = () => {
    this.props.onEdit()
  }

  handleChange = e => {
    this.props.onChange(e)
  }

  render() {
    const { intl, value, isEditing } = this.props

    return (
      <div className={`${styles.container} shp-pickup-receiver`}>
        {isEditing ? (
          <React.Fragment>
            <label
              className={`${styles.label} shp-pickup-receiver__label`}
              htmlFor="pickup-receiver">
              {translate(intl, 'pickupReceiver')}
            </label>
            <input
              className={`${styles.input ||
                ''} shp-pickup-receiver__input input-xlarge`}
              data-hj-whitelist="true"
              id="pickup-receiver"
              name="pickup-receiver"
              onChange={this.handleChange}
              type="text"
              value={value}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className={`${styles.title} shp-pickup-receiver__title`}>
              {translate(intl, 'pickupReceiver')}
            </p>
            <div className={`${styles.textBox} shp-pickup-receiver__text`}>
              <div
                className={`${
                  styles.pickupReceiverIcon
                } shp-pickup-receiver__icon`}>
                <Person />
              </div>
              <div className={`${styles.name} shp-pickup-receiver__name`}>
                {value}
                {' - '}
                <button
                  className={`${styles.btn} shp-pickup-receiver__btn`}
                  onClick={this.handleClickEdit}>
                  {translate(intl, 'modify')}
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

PickupReceiver.propTypes = {
  intl: intlShape,
  isEditing: PropTypes.bool,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  value: PropTypes.string,
}

PickupReceiver.defaultProps = {
  onEdit: () => {},
}

export default injectIntl(PickupReceiver)
