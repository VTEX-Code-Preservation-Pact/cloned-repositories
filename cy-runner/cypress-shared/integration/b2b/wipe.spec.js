/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/consistent-test-it */
/* eslint-disable jest/valid-expect */
import b2b from '../../support/b2b/constants.js'
import {
  loginViaCookies,
  updateRetry,
  preserveCookie,
} from '../../support/common/support.js'
import { deleteOrganization } from '../../support/b2b/graphql.js'

const config = Cypress.env()

// Constants
const { name } = config.workspace

// Define constants
const APP_NAME = 'vtex.b2b-organizations-graphql'
const APP_VERSION = '*.x'
const APP = `${APP_NAME}@${APP_VERSION}`

function deleteCostCenter(organization, costCenter) {
  it(`Delete ${costCenter.name} - ${organization}`, updateRetry(2), () => {
    cy.getVtexItems().then((vtex) => {
      const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

      const GRAPHQL_DELETE_ORAGANIZATION_MUTATION =
        'mutation' + '($id: ID!)' + '{deleteCostCenter(id: $id){status}}'

      cy.getOrganizationItems().then((items) => {
        const costCenterId = items[costCenter.name]

        if (costCenterId) {
          cy.callGraphqlAndAddLogs({
            url: CUSTOM_URL,
            query: GRAPHQL_DELETE_ORAGANIZATION_MUTATION,
            variables: {
              id: costCenterId,
            },
          }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.data.deleteCostCenter.status).to.equal(
              'success'
            )
          })
        }
      })
    })
  })
}

function deleteUsers() {
  it('Delete users via graphql', updateRetry(5), () => {
    cy.getVtexItems().then((vtex) => {
      cy.url().then((url) => {
        if (url.includes('blank')) {
          cy.visit('/')
        }
      })
      const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

      const GRAPHQL_DELETE_ORAGANIZATION_MUTATION =
        'mutation' +
        '($id: ID!,$email:String!,$clId: ID!)' +
        '{removeUser(id: $id,email:$email,clId:$clId){status}}'

      const GRAPHQL_GET_USERS_QUERY =
        'query' +
        '($pageSize: Int,$search: String)' +
        '{getUsersPaginated(pageSize: $pageSize,search: $search){data{id,email,clId}}}'

      cy.callGraphqlAndAddLogs({
        url: CUSTOM_URL,
        query: GRAPHQL_GET_USERS_QUERY,
        variables: {
          pageSize: 100,
          search: name,
        },
        headers: { VtexIdclientAutCookie: vtex.userAuthCookieValue },
      }).then((response) => {
        expect(response.status).to.equal(200)
        const clients = response.body.data.getUsersPaginated.data

        expect(clients).to.not.equal(null)
        if (clients.length > 0) {
          for (const { clId, id, email } of clients) {
            cy.callGraphqlAndAddLogs({
              url: CUSTOM_URL,
              query: GRAPHQL_DELETE_ORAGANIZATION_MUTATION,
              variables: {
                id,
                email,
                clId,
              },
            }).then((removeUserResponse) => {
              expect(removeUserResponse.status).to.equal(200)
              expect(removeUserResponse.body.data.removeUser.status).to.equal(
                'success'
              )
            })
          }
        }
      })
    })
  })
}

describe('Wipe datas', () => {
  const {
    organizationName: organizationA,
    costCenter1,
    costCenter2,
  } = b2b.OrganizationA

  const { organizationName: organizationB, costCenter1: costCenterB1 } =
    b2b.OrganizationB

  loginViaCookies({ storeFrontCookie: false })

  deleteUsers()
  deleteCostCenter(organizationA, costCenter1)
  deleteCostCenter(organizationA, costCenter2)
  deleteCostCenter(organizationB, costCenterB1)
  deleteOrganization(name)
  deleteOrganization(name, true)
  preserveCookie()
})
