import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Info.css'
import IconInfo from '../assets/components/IconInfo'

class Info extends Component {
  render() {
    return (
      <p className={`shp-info ${this.props.className} ${styles.alert}`}>
        <span className={`shp-alert-icon ${styles.infoIcon}`}>
          <IconInfo />
        </span>
        <span className={`shp-info-text ${styles.text}`}>
          {this.props.children}
        </span>
      </p>
    )
  }
}

Info.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Info
