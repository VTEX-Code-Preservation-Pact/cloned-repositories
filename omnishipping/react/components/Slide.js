import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Slide extends PureComponent {
  render() {
    const { children } = this.props

    return <div className="glide__slides">{children}</div>
  }
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Slide
