import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { omnishippingJsErrorEvent } from '../actions/metric-actions'
import getGGUID from '../utils/Gguid'
import { ErrorState } from '../components/ErrorState'
import { intlShape } from 'react-intl'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://7d7e613102df401b96fc352a61125017@sentry.io/1319029',
})

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
      error: null,
      info: null,
    }
  }

  componentDidCatch(error, info) {
    const errorId = getGGUID()

    this.props.omnishippingJsErrorEvent({
      error,
      componentStack: info && info.componentStack,
      errorId,
      reduxState: this.props.state,
    })

    if (window.location.origin.indexOf('vtexlocal') === -1) {
      Sentry.withScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key])
        })
        Sentry.captureException(error)
      })
    }

    this.setState({
      hasError: true,
      errorId,
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState errorId={this.state.errorId} intl={this.props.intl} />
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
  intl: intlShape,
  omnishippingJsErrorEvent: PropTypes.func.isRequired,
  state: PropTypes.object,
}

export default connect(
  state => state,
  {
    omnishippingJsErrorEvent,
  }
)(ErrorBoundary)
