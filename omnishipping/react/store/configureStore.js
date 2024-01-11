import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import { VTEXLOCAL, VTEXBETA } from '../constants'

const logger = createLogger({
  collapsed: true,
})

const localOrBeta =
  window.location.host.includes(VTEXLOCAL) ||
  window.location.host.includes(VTEXBETA)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      localOrBeta ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
    )
  )
  return store
}

export default configureStore()
