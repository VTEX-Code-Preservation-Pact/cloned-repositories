import { LRUCache, Service, ServiceContext } from '@vtex/api'

import { Clients } from './clients'
import { WithSecretKeys } from './directives/secretKeys'
import { queries } from './resolvers/review'

const MEDIUM_TIMEOUT_MS = 2 * 1000

declare global {
  interface SecretKeys {
    appId: string
    yourviewsToken: string
  }

  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

const vbaseCache = new LRUCache<string, any>({max: 10})
metrics.trackCache('vbase', vbaseCache)

// Export a service that defines resolvers and clients' options
export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
      vbase: {
        memoryCache: vbaseCache,
      },
    },
  },
  graphql: {
    resolvers: {
      Query: queries,
    },
    schemaDirectives: {
      withSecretKeys: WithSecretKeys,
    },
  },
})
