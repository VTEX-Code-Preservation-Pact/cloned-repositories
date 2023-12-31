import { updateRetry } from '../common/support'

const version = '*.x'
const app = 'vtex.shopper-location'

export function updateSettings(
  country,
  url,
  { automaticRedirect = false } = {}
) {
  it(
    `Configuring ${
      automaticRedirect ? 'automatic' : ''
    } redirect with country ${country} in ${app}`,
    updateRetry(2),
    () => {
      cy.getVtexItems().then((vtex) => {
        // Define constants
        const APP_NAME = 'vtex.apps-graphql'
        const APP_VERSION = '3.x'
        const APP = `${APP_NAME}@${APP_VERSION}`
        const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

        cy.qe(
          'Update a app settings via graphQl.The graphQl mutation we use in UI,mutation{($app:String,$version:String,$settings:String) {saveAppSettings(app:$app,version:$version,settings:$settings){message}}'
        )
        const GRAPHQL_MUTATION =
          'mutation' +
          '($app:String,$version:String,$settings:String)' +
          '{saveAppSettings(app:$app,version:$version,settings:$settings){message}}'

        const QUERY_VARIABLES = {
          app,
          version,
          settings: `{"automaticRedirect":${automaticRedirect},"redirects":[{"country":"${country}","url":"${url}"}]}`,
        }

        // Mutating it to the new workspace
        cy.callGraphqlAndAddLogs({
          url: CUSTOM_URL,
          query: GRAPHQL_MUTATION,
          variables: QUERY_VARIABLES,
        }).its('body.data.saveAppSettings.message', { timeout: 10000 })
      })
    }
  )
}
