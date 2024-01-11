import * as actions from './account-info-actions'
import * as types from './action-types'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import $ from 'jquery'
import { AUTHENTICATED_USER, CLOSED_VTEXID } from '../constants/checkout-events'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Account Info Actions', () => {
  it('should start vtexId and dispatch VTEX_ID_STARTED and simulate close the modal', done => {
    const store = mockStore({
      orderForm: {
        storePreferencesData: {},
      },
    })

    store.dispatch(actions.startVtexID())

    $(window).trigger(CLOSED_VTEXID)

    process.nextTick(() => {
      try {
        const receivedActions = store.getActions()
        expect(receivedActions[1].type).toEqual(types.VTEX_ID_CLOSED)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })

  it('should start vtexId and dispatch VTEX_ID_STARTED with callback', done => {
    const store = mockStore({
      orderForm: {
        storePreferencesData: {},
      },
    })

    const callbackMock = jest.fn()

    store.dispatch(actions.startVtexID(callbackMock))

    $(window).trigger(AUTHENTICATED_USER)

    process.nextTick(() => {
      try {
        const receivedActions = store.getActions()
        expect(receivedActions[0].type).toEqual(types.VTEX_ID_STARTED)
        expect(callbackMock).not.toHaveBeenCalled()
      } catch (e) {
        return done(e)
      }
      done()
    })
  })
})
