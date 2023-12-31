import { VTEX_AUTH_HEADER } from './constants.js'

const generateSearchURL = (baseUrl, entities, searchQuery) => {
  return `${baseUrl}/api/dataentities/${entities.id}/search?${entities.searchKey}=${searchQuery}`
}

const generateDeleteURL = (baseUrl, entities, documentId) => {
  return `${baseUrl}/api/dataentities/${entities.id}/documents/${documentId}`
}

export function searchInMasterData(entities, searchQuery) {
  cy.getVtexItems().then((vtex) => {
    cy.getAPI(
      generateSearchURL(vtex.baseUrl, entities, searchQuery),
      VTEX_AUTH_HEADER(vtex.apiKey, vtex.apiToken)
    ).then((response) => {
      expect(response.status).to.equal(200)

      return cy.wrap(response.body, { log: false })
    })
  })
}

export function deleteDocumentInMasterData(entities, documentId) {
  cy.getVtexItems().then((vtex) => {
    cy.callRestAPIAndAddLogs({
      method: 'DELETE',
      url: generateDeleteURL(vtex.baseUrl, entities, documentId),
    })
      .its('status')
      .should('equal', 204)
  })
}
