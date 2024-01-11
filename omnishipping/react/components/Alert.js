import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.css'
import IconAlert from '../assets/components/IconAlert'

class Alert extends Component {
  render() {
    return (
      <p
        className={`shp-alert ${
          this.props.className ? this.props.className : ''
        } ${styles.alert}`}>
        <div className={`shp-alert-content ${styles.content}`}>
          <span className={`shp-alert-icon ${styles.alertIcon}`}>
            <IconAlert />
          </span>
          <span className={`shp-alert-text ${styles.text}`}>
            {this.props.children}
          </span>
        </div>
        {this.props.footer}
      </p>
    )
  }
}

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  footer: PropTypes.node,
}

export default Alert
