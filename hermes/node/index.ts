import { Service, ServiceContext } from '@vtex/api'

import { Clients } from './clients'
import getGitHubStatus from './resolvers/status'

const MEDIUM_TIMEOUT_MS = 30 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 5,
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      // Mutation: {},
      Query: {
        getGitHubStatus,
      },
    },
  },
})
