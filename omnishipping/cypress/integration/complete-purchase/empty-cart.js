import { clearBrowserStorage, setup, getCheckoutEndpoint } from '../../utils'

describe('Empty cart', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  it('should show empty cart', () => {
    const url = getCheckoutEndpoint()

    setup(url, { mobile: false })

    cy.contains('Seu carrinho está vazio.').should('be.visible')
    cy.contains('Escolher produtos').should('be.visible')
  })
})
