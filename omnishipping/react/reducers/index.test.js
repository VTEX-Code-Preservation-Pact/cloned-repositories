import index from './index.js'
import { createStore } from 'redux'

describe('Combined Reducers', () => {
  it('should load combined reducers', () => {
    const combinedReducers = createStore(index)
    expect(combinedReducers.getState()).toMatchSnapshot()
  })
})
