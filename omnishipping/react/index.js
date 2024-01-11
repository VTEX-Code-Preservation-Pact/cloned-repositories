import React from 'react'
import { Provider } from 'react-redux'
import OrderFormContainer from './containers/OrderFormContainer'
import CheckoutContainer from './containers/CheckoutContainer'
import configureStore from './store/configureStore'
import setPolyfills from './utils/Polyfills'
import RulesContainer from './containers/RulesContainer'
import { NoSSR } from 'render'
import WaitingState from './components/WaitingState'

window.omnishipping = {
  version: process.env.REACT_APP_VERSION,
}

const OmniShipping = () => {
  if (typeof document === 'undefined' || typeof document === 'undefined') {
    return null
  }

  setPolyfills()

  return (
    <NoSSR onSSR={<WaitingState loading />}>
      <Provider store={configureStore}>
        <RulesContainer
          render={() => (
            <CheckoutContainer render={() => <OrderFormContainer />} />
          )}
        />
      </Provider>
    </NoSSR>
  )
}

export default OmniShipping
