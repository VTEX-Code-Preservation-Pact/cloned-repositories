export function fillEmail(email) {
  cy.get('#cart-to-orderform').click()

  cy.wait(1000)

  cy.get('#client-pre-email').type(email)

  cy.get('#btn-client-pre-email').click()
}

export function fillProfile() {
  cy.get('#client-first-name').should('be.visible')

  cy.get('#client-first-name').type('Fernando')

  cy.get('#client-last-name').type('Coelho')

  cy.get('#client-document').type('00759459169')

  cy.get('#client-phone').type('21999999999')

  cy.get('#go-to-shipping').click()
}

export function getRandomEmail() {
  return `shipping${Math.random() * 100}@mailinator.com`
}
