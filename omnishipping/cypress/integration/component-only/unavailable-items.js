import { clearBrowserStorage, getAddSkusEndpoint, setup } from '../../utils'

import locale from '../../../src/locales/pt.json'

describe('Unavailable Items', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  it('with one unavailable item', () => {
    setup(getAddSkusEndpoint('31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#ship-postalCode').type('78580000')

    cy.get('.delivery-items img').should(
      'have.attr',
      'src',
      '//vtexgame1.vteximg.com.br/arquivos/ids/155369-50-50'
    )
  })

  it('with multiple unavailable items', () => {
    setup(getAddSkusEndpoint('36', '31'))

    cy.contains(locale['omnishipping.awatingData'])

    cy.get('#ship-postalCode').type('78580000')

    cy.contains(
      'Os itens a seguir estão com entrega indisponível para o CEP escolhido.'
    ).should('be.visible')
    cy.get('.delivery-items img')
      .first()
      .should(
        'have.attr',
        'src',
        '//vtexgame1.vteximg.com.br/arquivos/ids/155635-50-50'
      )
  })

  it('with unavailable pickup items', () => {
    setup(getAddSkusEndpoint('31', '36', '37'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.get('#ship-postalCode').type('22071060')
    cy.get('#shipping-option-pickup-in-point')
      .click()
      .end()

    cy.contains(
      'O item a seguir está com entrega indisponível para o CEP escolhido.'
    ).should('be.visible')
    cy.get('.delivery-items img')
      .first()
      .should(
        'have.attr',
        'src',
        '//vtexgame1.vteximg.com.br/arquivos/ids/155636-50-50'
      )
  })

  it('with unavailable pickup items and remove unavailable item', () => {
    setup(getAddSkusEndpoint('31', '36', '37'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.get('#ship-postalCode').type('22071060')
    cy.get('#shipping-option-pickup-in-point')
      .click()
      .end()

    cy.contains(
      'O item a seguir está com entrega indisponível para o CEP escolhido.'
    ).should('be.visible')
    cy.get('#unavailable-delivery-disclaimer').should('be.visible')
    cy.get('.delivery-items img')
      .first()
      .should(
        'have.attr',
        'src',
        '//vtexgame1.vteximg.com.br/arquivos/ids/155636-50-50'
      )

    cy.get('#remove-unavailable-items').click()

    cy.get('#unavailable-delivery-disclaimer').should('not.exist')
  })

  it('with unavailable pickup items, select different items and keep unavailable', () => {
    setup(getAddSkusEndpoint('31', '36', '37'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.get('#ship-postalCode').type('22071060')

    cy.get('#shipping-option-pickup-in-point')
      .click()
      .end()
    cy.get('.address-summary')

    cy.get('#unavailable-delivery-disclaimer').should('be.visible')
    cy.get('img.delivery-item-unavailable')
      .first()
      .should(
        'have.attr',
        'src',
        '//vtexgame1.vteximg.com.br/arquivos/ids/155636-50-50'
      )
    cy.get('#change-pickup-button').click()
    cy.get('#pickup-141125d').click()
    cy.get('#confirm-pickup-pickup-141125d').click()

    cy.get('#unavailable-delivery-disclaimer').should('be.visible')
    cy.get('img.delivery-item-unavailable')
      .first()
      .should(
        'have.attr',
        'src',
        '//vtexgame1.vteximg.com.br/arquivos/ids/155635-50-50'
      )
  })
})
