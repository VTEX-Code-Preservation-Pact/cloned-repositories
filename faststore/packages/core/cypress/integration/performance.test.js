// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Cart module
 */

import { options } from '../global'
import { cypress } from '../../faststore.config'

const { pages } = cypress

const paths = [pages.home, pages.pdp, pages.collection]

const testMark = (path, mark) => {
  cy.visit(path, options)
  cy.waitForHydration()

  cy.window().should((win) => {
    expect(win.performance.getEntriesByName(mark)).to.have.length(1)
  })
}

describe('React rendering performance', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it.skip('Renders Navbar component once', () => {
    const mark = 'Navbar'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it.skip('Renders Footer component once', () => {
    const mark = 'Footer'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it.skip('Renders Alert component once', () => {
    const mark = 'Alert'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it.skip('Renders Page component once', () => {
    const mark = 'Page'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it.skip('Renders ProductGallery component once on PLP', () => {
    const mark = 'ProductGallery'

    testMark(pages.collection, mark)
  })
})
