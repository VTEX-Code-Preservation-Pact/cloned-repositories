import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Arrow extends PureComponent {
  render() {
    const { color, direction } = this.props

    return (
      <svg viewBox="0 0 15 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          {direction === 'right' ? (
            <path
              d="M3 0L.17 2.83 9.34 12 .17 21.17 3 24l12-12z"
              fill={color}
            />
          ) : (
            <path
              d="M14.83 2.83L12 0 0 12l12 12 2.83-2.83L5.66 12z"
              fill={color}
            />
          )}
        </g>
      </svg>
    )
  }
}

Arrow.defaultProps = {
  color: '#000',
  direction: 'right',
}

Arrow.propTypes = {
  color: PropTypes.string,
  direction: PropTypes.string,
}

export default Arrow
