export function fillPostalCodeOmnishipping() {
  cy.get('#ship-postalCode').type('22071060')
}

export function fillAddressInformation() {
  cy.get('#ship-number').type('12')
}

export function goToPayment() {
  cy.get('.btn-go-to-payment').click()
}

export function chooseDeliveryOmnishipping() {
  cy.get('#shipping-option-delivery').click()
}

export function choosePickupOmnishipping() {
  cy.get('#shipping-option-pickup-in-point').click()

  cy.get('#find-pickups-manualy-button')
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

  cy.get('#retirada-na-loja-141125d.pkpmodal-pickup-point').click()

  cy.get('#confirm-pickup-retirada-na-loja-141125d').click()
}

export function fillShippingPreviewDelivery() {
  cy.get('#shipping-calculate-link').click()

  cy.get('#summary-postal-code').type('22071060')

  cy.get('#cart-shipping-calculate').click()
}

export function togglePickupShippingPreview() {
  cy.get('.srp-toggle__pickup').click()

  cy.contains('Retirar 1 item em Loja em Copacabana no Rio de Janeiro').should(
    'be.visible'
  )
  cy.wait(1000)
}

export function toggleDeliveryShippingPreview() {
  cy.get('.srp-toggle__delivery').click()

  cy.contains('Receber 1 item em 22071-060').should('be.visible')

  cy.wait(1000)
}
