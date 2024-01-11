import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'
import orderForm from '../react/actions/__mocks__/order-form-pickup-in-store-mock.json'
import $ from 'jquery'

configure({ adapter: new Adapter() })

const deferred = $.Deferred()
const vtexjsMock = {
  checkout: {
    sendAttachment: jest.fn(() => {
      return deferred.resolve(() => ({
        response: {
          data: {
            orderForm,
          },
        },
      }))
    }),
    removeItems: jest.fn(() => {
      return Promise.resolve({
        response: {
          data: {
            orderForm,
          },
        },
      })
    }),
  },
}

const vtexidMock = {
  start: jest.fn(),
}

const localStorageMock = {
  getItem: jest.fn(
    () =>
      '{"activeTab":"delivery","selectedLeanShippingOption":"CHEAPEST","isScheduledDeliveryActive":false,"originComponent":"shipping-preview"}'
  ),
  setItem: jest.fn(() => {}),
}

const checkoutLoggerMock = jest.fn()

global.vtexjs = vtexjsMock

global.vtexid = vtexidMock

global.vtex = {
  geolocation: true,
}

global.localStorage = localStorageMock

global.$ = $

global.checkoutLogger = checkoutLoggerMock
