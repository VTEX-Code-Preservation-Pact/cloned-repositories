import { clearBrowserStorage, getAddSkusEndpoint, setup } from '../../utils'

import locale from '../../../src/locales/pt.json'

describe('Basic Flow', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  describe('Default Options', () => {
    it('with only delivery', () => {
      setup(getAddSkusEndpoint('31'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.get('#ship-number')
        .type('10')
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .end()
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('Em até 8 dias úteis').should('be.visible')
      cy.contains('R$ 5,00').should('be.visible')
      cy.contains('Praia de Botafogo 10').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })

    it('with only delivery and multiple items', () => {
      setup(getAddSkusEndpoint('31', '33'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.get('#ship-number')
        .type('10')
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .end()
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('Em até 8 dias úteis').should('be.visible')
      cy.contains('Em até 10 dias úteis').should('be.visible')
      cy.contains('R$ 5,00').should('be.visible')
      cy.contains('Praia de Botafogo 10').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })
  })

  describe('Both Delivery and Pickup', () => {
    it('choosing pickup', () => {
      setup(getAddSkusEndpoint('35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.contains(locale['omnishipping.pickup']).should('be.visible')
      cy.contains(locale['omnishipping.deliver']).should('be.visible')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.contains('Rio de Janeiro').should('be.visible')
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('A partir de 2 dias úteis').should('be.visible')
      cy.contains('Grátis').should('be.visible')
      cy.contains('Rio de Janeiro').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })

    it('choosing delivery', () => {
      setup(getAddSkusEndpoint('35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.contains(locale['omnishipping.pickup'])
      cy.contains(locale['omnishipping.deliver'])

      cy.get('#ship-number')
        .type('10')
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .end()
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('Em até 2 dias úteis').should('be.visible')
      cy.contains('R$ 10,00').should('be.visible')
      cy.contains('Praia de Botafogo 10').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })

    // This test sometimes could break due to an API issue
    // https://vtex.slack.com/archives/C1FRE8V9A/p1536946178000100
    it('should choose both pickup and delivery', () => {
      setup(getAddSkusEndpoint('31', '35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.contains(locale['omnishipping.pickup'])
      cy.contains(locale['omnishipping.deliver'])

      cy.get('#ship-number')
        .type('10')
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .end()
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('Em até 8 dias úteis').should('be.visible')
      cy.contains('R$ 5,00').should('be.visible')
      cy.contains('A partir de 2 dias úteis').should('be.visible')
      cy.contains('Praia de Botafogo 10').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })

    // This test sometimes could break due to an API issue
    // https://vtex.slack.com/archives/C1FRE8V9A/p1536946178000100
    it('should choose both pickup and delivery and select different packages', () => {
      setup(getAddSkusEndpoint('35', '250', '260', '261'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.get('#ship-postalCode')
        .type('22250040')
        .end()

      cy.get('.address-summary')

      cy.contains(locale['omnishipping.pickup'])
      cy.contains(locale['omnishipping.deliver'])

      cy.get('#shipping-option-delivery').click()

      cy.get('#FASTEST').click()
      cy.get('#CHEAPEST').click()

      cy.get('#ship-number')
        .type('10')
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .end()
      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('R$ 15,00').should('be.visible')
      cy.contains('Praia de Botafogo 10').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })
  })
})
