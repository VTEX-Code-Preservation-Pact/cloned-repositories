import locale from '../../../src/locales/pt.json'
import { handleAddress, searchPickupAddress } from '../../utils/helpers'
import { setup, getAddSkusEndpoint, clearBrowserStorage } from '../../utils'

xdescribe('Logged flow', () => {
  beforeEach(() => {
    Cypress.env({ isLogged: true })
    cy.clearCookies()
    clearBrowserStorage()
  })

  afterEach(() => {
    Cypress.env({ isLogged: false })
  })

  it('simple flow with delivery', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    cy.contains('Rua ***** **man **').should('be.visible')
    cy.contains('Cop******* - Rio ** ******* - RJ').should('be.visible')

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Em até 8 dias úteis').should('be.visible')
    cy.contains('R$ 5,00').should('be.visible')
    cy.contains('Rua ***** **man **').should('be.visible')
    cy.contains('Cop******* - Rio ** ******* - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('edit address', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    handleAddress()

    typeAddressAndGoToPayment()
  })

  it('new address', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    handleAddress({ newAddress: true })

    typeAddressAndGoToPayment()
  })

  it('new address and go back', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    handleAddress({ newAddress: true, desist: true })

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Em até 8 dias úteis').should('be.visible')
    cy.contains('R$ 5,00').should('be.visible')
    cy.contains('Rua Saint Roman').should('be.visible')
    cy.contains('Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('edit address and go back', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    handleAddress({ desist: true })

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Em até 8 dias úteis').should('be.visible')
    cy.contains('R$ 5,00').should('be.visible')
    cy.contains('Rua Saint Roman').should('be.visible')
    cy.contains('Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('edit address and type address in the pickupModal', () => {
    setup(getAddSkusEndpoint('35'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    handleAddress()

    searchPickupAddress({ changePickup: true })

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Menos de um dia').should('be.visible')
    cy.contains('Grátis').should('be.visible')
    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('should search while not logged in and second purchase', () => {
    setup(getAddSkusEndpoint('35'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#open-shipping').click()

    searchPickupAddress({ changePickup: true })

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Menos de um dia').should('be.visible')
    cy.contains('Grátis').should('be.visible')
    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })
})

function typeAddressAndGoToPayment() {
  cy.get('#ship-number')
    .clear()
    .type('10')
    .end()
  cy.get('.btn-go-to-payment')
    .click()
    .end()

  cy.contains('Em até 8 dias úteis').should('be.visible')
  cy.contains('R$ 5,00').should('be.visible')
  cy.contains('Praia de Botafogo 10').should('be.visible')
  cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
  cy.contains(locale['omnishipping.modifyDeliveryOptions']).should('be.visible')
}
