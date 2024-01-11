import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ButtonLink extends Component {
  render() {
    return (
      <button
        className={`${this.props.style} ${this.props.className}-${
          this.props.slaId
        }`}
        id={`${this.props.id}-${this.props.slaId}`}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}

ButtonLink.propTypes = {
  children: PropTypes.node,
  slaId: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
}

export default ButtonLink
