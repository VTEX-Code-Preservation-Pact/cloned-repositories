/* eslint-disable jest/expect-expect */
import {
  loginViaCookies,
  preserveCookie,
  updateRetry,
} from '../../support/common/support.js'
import { discountProduct } from '../../support/affirm/outputvalidation'
import {
  cancelTheOrder,
  getTestVariables,
  verifyOrderStatus,
} from '../../support/common/testcase.js'
import { completeThePayment } from '../../support/affirm/testcase.js'

const { prefix, productName, postalCode, productQuantity } = discountProduct

describe(`${prefix} Scenarios`, () => {
  loginViaCookies()

  const discountProductEnvs = getTestVariables(prefix)

  discountProductEnvs.sendInvoice = false

  it(`In ${prefix} - Adding Product to Cart`, updateRetry(1), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName, { proceedtoCheckout: true })
  })

  it(`In ${prefix} - Updating product quantity to 1`, updateRetry(4), () => {
    // Update Product quantity to 1
    cy.updateProductQuantity(productName, {
      quantity: productQuantity,
      verifySubTotal: false,
    })
  })

  it(`In ${prefix} - Updating Shipping Information`, updateRetry(4), () => {
    // Update Shipping Section
    cy.updateShippingInformation({ postalCode, phoneNumber: '(312) 310 3249' })
  })

  completeThePayment(discountProduct, discountProductEnvs)

  verifyOrderStatus({
    product: discountProduct,
    env: discountProductEnvs.orderIdEnv,
    status: /handling/,
    timeout: 30000,
  })

  cancelTheOrder(discountProductEnvs.orderIdEnv)

  preserveCookie()
})
