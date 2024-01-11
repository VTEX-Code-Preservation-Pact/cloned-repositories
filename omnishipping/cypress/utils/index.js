import {
  ADD_SKUS_ENDPOINT,
  BASE_URL,
  PROFILE_ENDPOINT,
  BASE_URL_COMPLETE,
  CHECKOUT_ENDPOINT,
} from './constants'

export function setup(url, options = { mobile: true }) {
  cy.server()

  if (Cypress.env('isLogged')) {
    cy.route({
      method: 'GET',
      url: '/api/vtexid/**',
    }).as('vtexId')
  }

  if (options.mobile) {
    cy.viewport(414, 736)
  } else {
    cy.viewport(1280, 800)
  }

  cy.visit(url)

  return cy
}

export function setupComplete(url, options = { mobile: true }) {
  cy.server()

  cy.route({
    method: 'POST',
    url: '/api/checkout/**',
  }).as('checkoutRequest')

  if (Cypress.env('isLogged')) {
    cy.route({
      method: 'GET',
      url: '/api/vtexid/**',
    }).as('vtexId')
  }

  if (options.mobile) {
    cy.viewport(414, 736)
  } else {
    cy.viewport(1280, 800)
  }

  cy.visit(url)

  return cy
}

export function clearBrowserStorage() {
  cy.window().then(win => {
    win.sessionStorage.clear()
    win.localStorage.clear()
  })
}

export function getAddSkusEndpoint() {
  return Array.from(arguments).reduce(
    (acumulatedSkus, sku, index) =>
      `${acumulatedSkus}${index > 0 ? '&' : ''}sku=${sku}&qty=1&seller=1&sc=1`,
    BASE_URL + ADD_SKUS_ENDPOINT
  )
}

export function getAddSkusEndpointComplete() {
  return Array.from(arguments).reduce(
    (acumulatedSkus, sku, index) =>
      `${acumulatedSkus}${index > 0 ? '&' : ''}sku=${sku}&qty=1&seller=1&sc=1`,
    BASE_URL_COMPLETE + ADD_SKUS_ENDPOINT
  )
}

export function getCheckoutEndpoint() {
  return BASE_URL_COMPLETE + CHECKOUT_ENDPOINT
}

export function identityPurchase(email) {
  cy.request(`${BASE_URL}${PROFILE_ENDPOINT}?email=${email}&sc=1`).as(
    '@checkoutRequest'
  )
}
