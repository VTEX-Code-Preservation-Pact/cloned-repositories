import { clearBrowserStorage, getAddSkusEndpoint, setup } from '../../utils'
import moment from 'moment'
import locale from '../../../src/locales/pt.json'
window.moment = moment

function getTomorrow() {
  const tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)

  let month = `${tomorrow.getMonth() + 1}`
  let day = `${tomorrow.getDate()}`
  const year = tomorrow.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

const tomorrow = getTomorrow()

describe('Scheduled Delivery', () => {
  beforeEach(() => {
    cy.clearCookies()
    clearBrowserStorage()
  })

  it('with only scheduled delivery', () => {
    setup(getAddSkusEndpoint('34'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.get('#ship-postalCode')
      .type('22251040')
      .end()

    cy.get('.address-summary')

    cy.get('#ship-number')
      .type('10')
      .end()
    cy.get('#ship-receiverName')
      .type('Fernando')
      .end()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--keyboard-selected')
      .click()
      .end()

    let datePickerValue = ''

    cy.get('.react-datepicker__input-container div').then(() => {
      datePickerValue = Cypress.$(
        '.react-datepicker__input-container div'
      ).text()
    })

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day:not(.react-datepicker__day--disabled)')
      .eq(2)
      .click()
      .end()

    cy.get('.react-datepicker__input-container div').should($date => {
      expect($date).to.not.contain(datePickerValue)
    })

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('R$ 13,40').should('be.visible')
    cy.contains('entre').should('be.visible')
    cy.contains('Agendada').should('be.visible')
    cy.contains('Rua Marquês de Olinda 10').should('be.visible')
    cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('with only scheduled delivery selecting different window', () => {
    setup(getAddSkusEndpoint('34'))

    cy.contains(locale['omnishipping.awatingData']).should('be.visible')

    cy.get('#ship-postalCode')
      .type('22251040')
      .end()

    cy.get('.address-summary')

    cy.get('#ship-number')
      .type('10')
      .end()
    cy.get('#ship-receiverName')
      .type('Fernando')
      .end()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--keyboard-selected')
      .click()
      .end()
    cy.get('#scheduled-delivery-agendada')
      .select(`${tomorrow}T12:00:00+00:00`)
      .end()

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Agendada').should('be.visible')
    cy.contains('R$ 8,40').should('be.visible')
    cy.contains('entre 09:00 e 10:00').should('be.visible')
    cy.contains('Agendada').should('be.visible')
    cy.contains('Rua Marquês de Olinda 10').should('be.visible')
    cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('with only delivery and scheduled delivery', () => {
    setup(getAddSkusEndpoint('31', '34'))

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

    cy.get('#scheduled-delivery-delivery')
      .click()
      .end()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--keyboard-selected')
      .click()
      .end()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--selected')
      .click()
      .end()

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Em até 8 dias úteis').should('be.visible')
    cy.contains('R$ 18,40').should('be.visible')
    cy.contains('Agendada').should('be.visible')
    cy.contains('Praia de Botafogo 10').should('be.visible')
    cy.contains('Botafogo - Rio de Janeiro - RJ').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })

  it('selecting pickup with scheduled delivery', () => {
    setup(getAddSkusEndpoint('37'))

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

    cy.get('.pkpmodal-points-list #pickup-141125d')
      .click()
      .end()

    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains('Rua General Azevedo Pimentel').should('be.visible')

    cy.get('.pkpmodal-product-items img').should('be.visible')

    cy.get('#confirm-pickup-pickup-141125d').click()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--keyboard-selected')
      .click()
      .end()

    cy.get('#scheduled-delivery-choose')
      .click()
      .end()

    cy.get('.react-datepicker__day--selected')
      .click()
      .end()

    cy.get('.btn-go-to-payment')
      .click()
      .end()

    cy.contains('Agendada').should('be.visible')
    cy.contains('R$ 11,99').should('be.visible')
    cy.contains('Rio de Janeiro').should('be.visible')
    cy.contains(locale['omnishipping.modifyDeliveryOptions']).should(
      'be.visible'
    )
  })
})
