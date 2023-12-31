/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/expect-expect */
import {
  updateRetry,
  loginViaCookies,
  preserveCookie,
} from '../../support/common/support.js'
import { data } from '../../fixtures/fedex-shipping-fixtures/shippingRatePayload.json'
import {
  loadCalculateShippingAPI,
  validateCalculateShipping,
  validateCustomDeliveryTime,
  validateNonSupportedCountryCalculateShipping,
} from '../../support/fedex-shipping/api_testcase.js'

describe('Verify fedex shipping price for Kuwait and verify custom delivery time', () => {
  loginViaCookies()

  it(
    `Verify shipping price for fedex supported country Kuwait`,
    updateRetry(5),
    () => {
      data.destination.city = 'Kuwait City'
      data.destination.country = 'KWT'
      data.destination.zipCode = '72303'
      loadCalculateShippingAPI(data, validateCalculateShipping)
    }
  )

  it(
    `Verify shipping price for fedex non supported country India`,
    updateRetry(5),
    () => {
      data.destination.state = 'TamilNadu'
      data.destination.city = 'Chennai'
      data.destination.country = 'IND'
      data.destination.zipCode = '600079'
      loadCalculateShippingAPI(
        data,
        validateNonSupportedCountryCalculateShipping
      )
    }
  )

  it(`Verify custom delivery time`, updateRetry(4), () => {
    data.destination.state = null
    data.destination.city = null
    data.destination.zipCode = '00010002'
    data.destination.country = 'USA'
    loadCalculateShippingAPI(data, validateCustomDeliveryTime)
  })

  preserveCookie()
})
