import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    const {
      kind,
      size,
      border,
      isInline,
      isLonely,
      isLoading,
      isDisabled,
      isFixedValue,
      isNotChecked,
      icon,
      title,
      moreClassName = '',
      ...rest
    } = this.props

    let style = `btn relative tc bn fw3 ${moreClassName} `

    switch (kind) {
      case 'success':
        style += 'btn-success bg-green white '
        break
      case 'primary':
        style += 'bg-blue white '
        break
      case 'info':
        style += 'bg-blue white '
        break
      case 'alert':
        style += 'bg-gold white '
        break
      case 'danger':
        style += 'bg-light-red white '
        break
      case 'muted':
        style += 'bg-white gray '
        break
      case 'link':
      case 'light-primary':
        style += 'bg-white blue '
        break
      case 'light-danger':
        style += 'bg-white light-red '
        break
      default:
        style += 'bg-near-white blue '
    }

    switch (size) {
      case 'xs':
        style += 'pa1 f7 f6-ns '
        break
      case 'sm':
        style += 'pa2 pa3-ns f6 f5-ns lh-copy '
        break
      case 'lg':
        style += 'btn-large pv3 ph4 pa4-ns f4 f3-ns '
        break
      case 'xl':
        style += 'pa4 pa5-ns f3 f2-ns '
        break
      default:
        style += 'pv3 lh-solid ph4 f5 fw5 '
    }

    switch (border) {
      case 'dotted':
        style += 'b--moon-gray b--dotted bw1 '
        break
      default:
        style += ''
    }

    style += !isInline ? 'db w-100 br3 ' : ''
    style += isDisabled ? 'o-50 ' : ''
    style += !isLonely ? 'mh1 ' : ''

    return (
      <button className={style} disabled={isDisabled} {...rest} type="button">
        {isLoading && (
          <i className="fa fa-circle-o-notch fa-spin fa-fw mr1 absolute left-1" />
        )}
        {icon && <i className={`mr1 ${icon}`} />}
        {title}
        {!isFixedValue && <i className="fa fa-caret-down absolute right-1" />}
        {!isNotChecked && <i className="fa fa-check absolute right-1" />}
      </button>
    )
  }
}

Button.defaultProps = {
  isFixedValue: true,
  isNotChecked: true,
}

Button.propTypes = {
  border: PropTypes.string,
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFixedValue: PropTypes.bool,
  isInline: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLonely: PropTypes.bool,
  isNotChecked: PropTypes.bool,
  kind: PropTypes.string,
  moreClassName: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
}

export default Button
