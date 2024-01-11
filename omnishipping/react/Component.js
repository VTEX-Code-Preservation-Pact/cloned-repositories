import React, { Component } from 'react'
import { Provider } from 'react-redux'
import OrderFormContainer from './containers/OrderFormContainer'
import CheckoutContainer from './containers/CheckoutContainer'
import configureStore from './store/configureStore'
import setPolyfills from './utils/Polyfills'
import { NoSSR } from 'render'
import WaitingState from './components/WaitingState'

window.omnishipping = {
  version: process.env.REACT_APP_VERSION,
}
setPolyfills()

class OmniShipping extends Component {
  render() {
    return (
      <NoSSR onSSR={<WaitingState loading />}>
        <Provider store={configureStore}>
          <CheckoutContainer render={() => <OrderFormContainer />} />
        </Provider>
      </NoSSR>
    )
  }
}

export default OmniShipping
