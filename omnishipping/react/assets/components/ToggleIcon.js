import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ToggleIcon.css'

class ToggleIcon extends Component {
  render() {
    const { isActive } = this.props
    return (
      <div
        className={
          isActive ? `${styles.toggle} ${styles.toggleActive}` : styles.toggle
        }>
        <div
          className={
            isActive
              ? `${styles.toggleInner} ${styles.toggleInnerActive}`
              : styles.toggleInner
          }
        />
      </div>
    )
  }
}

ToggleIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
}

export default ToggleIcon
