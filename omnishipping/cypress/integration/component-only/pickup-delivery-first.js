import locale from '../../../src/locales/pt.json'
import { setup, getAddSkusEndpoint, clearBrowserStorage } from '../../utils'

describe('Pickup | Delivery First Flow', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  it('selecting pickup with different address', () => {
    setup(getAddSkusEndpoint('35'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.contains(locale['omnishipping.pickup']).should('be.visible')
    cy.contains(locale['omnishipping.deliver']).should('be.visible')

    cy.get('#ship-postalCode')
      .clear()
      .type('22251040')
      .end()

    cy.get('.address-summary')

    cy.get('#shipping-option-pickup-in-point')
      .click()
      .end()

    cy.get('#change-pickup-button')
      .click()
      .end()

    cy.get('#pkpmodal-search input').type('Praia de Botafogo, 300')

    cy.get('.pac-item', { timeout: 10000 })
      .first()
      .trigger('mouseover')
      .end()

    cy.get('.pac-item', { timeout: 10000 })
      .first()
      .click()
      .end()

    cy.get('.pkpmodal-points-list #retirada-na-loja-141125d')
      .click()
      .end()

    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua General Azevedo Pimentel').should('be.visible')
    cy.get('.pkpmodal-product-items img')
      .first()
      .should('be.visible')

    cy.get('#confirm-pickup-retirada-na-loja-141125d').click()

    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua General Azevedo Pimentel').should('be.visible')

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

  it('selecting pickup with different address and delivery item', () => {
    setup(getAddSkusEndpoint('38', '35'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')
    cy.contains(locale['omnishipping.pickup']).should('be.visible')
    cy.contains(locale['omnishipping.deliver']).should('be.visible')

    cy.get('#ship-postalCode')
      .clear()
      .type('22251040')
      .end()

    cy.get('.address-summary')

    cy.get('#shipping-option-pickup-in-point')
      .click()
      .end()

    cy.get('#change-pickup-button')
      .click()
      .end()

    cy.get('#pkpmodal-search input').type('Praia de Botafogo, 300')

    cy.get('.pac-item')
      .first()
      .trigger('mouseover')
      .end()

    cy.get('.pac-item')
      .first()
      .click()
      .end()

    cy.get('.pkpmodal-points-list #retirada-na-loja-141125d')
      .click()
      .end()

    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua General Azevedo Pimentel').should('be.visible')
    cy.get('.pkpmodal-product-items img')
      .first()
      .should('be.visible')

    cy.get('#confirm-pickup-retirada-na-loja-141125d').click()

    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua General Azevedo Pimentel').should('be.visible')

    cy.contains(locale['omnishipping.pickupSplitDisclaimer'])

    cy.get('#ship-number')
      .type('100')
      .blur()
      .end()
    cy.get('#ship-receiverName')
      .type('Fernando')
      .blur()
      .end()

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Grátis').should('be.visible')
    cy.contains('2 dias úteis').should('be.visible')
    cy.contains('Grátis').should('be.visible')
    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua Marquês de Olinda 100').should('be.visible')
    cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })
})
