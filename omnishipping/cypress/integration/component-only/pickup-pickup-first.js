import { clearBrowserStorage, getAddSkusEndpoint, setup } from '../../utils'

import { defaultFlowModal } from '../../utils/helpers'
import locale from '../../../src/locales/pt.json'

describe('Pickup | Pickup First Flow', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  describe('selecting delivery', () => {
    it('default flow on modal', () => {
      setup(getAddSkusEndpoint('35'))

      defaultFlowModal()
    })

    it('default flow on modal with Geolocation', () => {
      setup(getAddSkusEndpoint('35'))

      defaultFlowModal({ geolocation: true })
    })

    it('with different address', () => {
      setup(getAddSkusEndpoint('35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')
      cy.contains(locale['omnishipping.pickup']).should('be.visible')
      cy.contains(locale['omnishipping.deliver']).should('be.visible')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.get('#find-pickups-manualy-button')
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

      cy.contains('Rio de Janeiro').should('be.visible')
      cy.contains('Rua General Azevedo Pimentel').should('be.visible')

      cy.get('.pkpmodal-close')
        .click()
        .end()

      cy.get('#postalCode-finished-loading')

      cy.get('#shipping-option-delivery')
        .click()
        .end()

      cy.get('#ship-postalCode')
        .clear()
        .type('22251040')
        .end()

      cy.get('.address-summary')

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

      cy.contains('Em até 2 dias úteis').should('be.visible')
      cy.contains('R$ 10,00').should('be.visible')
      cy.contains('Rua Marquês de Olinda 100').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })
  })

  describe('selecting pickup', () => {
    it('default flow on modal', () => {
      setup(getAddSkusEndpoint('35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.contains(locale['omnishipping.pickup']).should('be.visible')
      cy.contains(locale['omnishipping.deliver']).should('be.visible')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.get('#find-pickups-manualy-button')
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

      cy.get('.pkpmodal-product-items img').should('be.visible')

      cy.get('#confirm-pickup-retirada-na-loja-141125d').click()

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

    it('selecting pickup with multiple items', () => {
      setup(getAddSkusEndpoint('35', '36'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.contains(locale['omnishipping.pickup']).should('be.visible')
      cy.contains(locale['omnishipping.deliver']).should('be.visible')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.get('#find-pickups-manualy-button')
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

      cy.get('.pkpmodal-product-items img')
        .last()
        .should('be.visible')

      cy.get('#confirm-pickup-retirada-na-loja-141125d').click()

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
      setup(getAddSkusEndpoint('31', '35'))

      cy.contains(locale['omnishipping.awatingData']).should('be.visible')

      cy.contains(locale['omnishipping.pickup']).should('be.visible')
      cy.contains(locale['omnishipping.deliver']).should('be.visible')

      cy.get('#shipping-option-pickup-in-point')
        .click()
        .end()

      cy.get('#find-pickups-manualy-button')
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

      cy.get('#ship-postalCode')
        .clear()
        .type('22251040')
        .end()

      cy.get('.address-summary')

      cy.get('#ship-number')
        .type('100')
        .blur()
        .end()
      cy.get('#ship-receiverName')
        .type('Fernando')
        .blur()
        .end()

      cy.contains(locale['omnishipping.pickupSplitDisclaimer'])

      cy.get('.btn-go-to-payment')
        .click()
        .end()

      cy.contains('Em até 8 dias úteis').should('be.visible')
      cy.contains('R$ 5,00').should('be.visible')
      cy.contains('A partir de 2 dias úteis').should('be.visible')
      cy.contains('Grátis').should('be.visible')
      cy.contains('Rio de Janeiro').should('be.visible')
      cy.contains('Rua Marquês de Olinda 100').should('be.visible')
      cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
      cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
        'be.visible'
      )
    })
  })
})
