import {
  clearBrowserStorage,
  getAddSkusEndpointComplete,
  setup,
} from '../../utils'
import {
  fillEmail,
  getRandomEmail,
  fillProfile,
} from '../../utils/profile-actions'
import {
  fillPostalCodeOmnishipping,
  fillAddressInformation,
  goToPayment,
  choosePickupOmnishipping,
  fillShippingPreviewDelivery,
  togglePickupShippingPreview,
  toggleDeliveryShippingPreview,
  chooseDeliveryOmnishipping,
} from '../../utils/shipping-actions'
import {
  payWithPaymentSlip,
  completePurchase,
  payWithCreditCard,
} from '../../utils/payment-actions'

describe('Basic Flow', () => {
  describe('Default Options', () => {
    beforeEach(() => {
      cy.clearCookies()
      clearBrowserStorage()
    })

    it('with only delivery', () => {
      const email = getRandomEmail()
      const url = getAddSkusEndpointComplete('31')

      setup(url, { mobile: false })

      fillEmail(email)
      fillProfile()
      fillPostalCodeOmnishipping()
      fillAddressInformation()
      goToPayment()
      payWithPaymentSlip()
      completePurchase()

      cy.url({ timeout: 10000 }).should('contain', '/orderPlaced')
      cy.contains(email).should('be.visible')
      cy.contains('Fernando Coelho').should('be.visible')
      cy.contains('007.594.591-69').should('be.visible')
      cy.contains('5521999999999').should('be.visible')
      cy.contains('Boleto bancário').should('be.visible')
      cy.contains('Receber').should('be.visible')
      cy.contains('Rua Saint Roman, 12').should('be.visible')
      cy.contains('Copacabana').should('be.visible')
      cy.contains('PAC').should('be.visible')
    })
  })

  describe('Both Delivery and Pickup', () => {
    it('start with delivery then, choosing pickup, then choosing delivery', () => {
      const email = getRandomEmail()
      const url = getAddSkusEndpointComplete('35')

      setup(url, { mobile: false })

      fillShippingPreviewDelivery()
      togglePickupShippingPreview()
      toggleDeliveryShippingPreview()
      fillEmail(email)
      fillProfile()
      chooseDeliveryOmnishipping()
      fillAddressInformation()
      goToPayment()
      payWithCreditCard()
      completePurchase()

      cy.url({ timeout: 10000 }).should('contain', '/orderPlaced')
      cy.contains(email).should('be.visible')
      cy.contains('Fernando Coelho').should('be.visible')
      cy.contains('007.594.591-69').should('be.visible')
      cy.contains('5521999999999').should('be.visible')
      cy.contains('Cartão de crédito').should('be.visible')
      cy.contains('final 8936').should('be.visible')
      cy.contains('Receber').should('be.visible')
      cy.contains('Rua Saint Roman, 12').should('be.visible')
      cy.contains('Copacabana').should('be.visible')
      cy.contains('Expressa').should('be.visible')
    })

    it('choosing pickup', () => {
      const email = getRandomEmail()
      const url = getAddSkusEndpointComplete('35')

      setup(url, { mobile: false })

      fillEmail(email)
      fillProfile()
      choosePickupOmnishipping()
      goToPayment()
      payWithCreditCard({ withAddress: true })
      completePurchase()

      cy.url({ timeout: 10000 }).should('contain', '/orderPlaced')
      cy.contains(email).should('be.visible')
      cy.contains('Fernando Coelho').should('be.visible')
      cy.contains('007.594.591-69').should('be.visible')
      cy.contains('5521999999999').should('be.visible')
      cy.contains('Cartão de crédito').should('be.visible')
      cy.contains('final 8936').should('be.visible')
      cy.contains('RETIRAR').should('be.visible')
      cy.contains('Loja em Copacabana no Rio de Janeiro').should('be.visible')
      cy.contains('Rua General Azevedo Pimentel, 5').should('be.visible')
      cy.contains('Copacabana').should('be.visible')
    })
  })
})
