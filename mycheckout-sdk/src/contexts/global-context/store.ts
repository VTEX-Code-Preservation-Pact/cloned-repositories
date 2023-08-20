import { configureStore } from '@reduxjs/toolkit'

import modalReducer from './reducers/modalSlice'
import uiSettingsReducer from './reducers/uiSettingsSlice'
import checkoutFormReducer from './reducers/checkoutFormSlice'
import cartReducer from './reducers/cartSlice'
import secondAfterEmailReducer from './reducers/secondAfterEmail'
import orderFormDataReducer from './reducers/orderFormDataSlice'
import simulationReducer from './reducers/simulationSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    uiSettings: uiSettingsReducer,
    checkoutForm: checkoutFormReducer,
    cart: cartReducer,
    orderForm: orderFormDataReducer,
    simulation: simulationReducer,
    secondAfterEmailReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export default store
