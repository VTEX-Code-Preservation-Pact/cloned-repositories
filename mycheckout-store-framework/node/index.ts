import type {
  Cached,
  ParamsContext,
  RecorderState,
  ServiceContext,
} from '@vtex/api'
import { method, Service, LRUCache } from '@vtex/api'

import { Clients } from './clients'
import { healthcheck } from './middlewares/healthcheck'
import { scheduler } from './middlewares/scheduler'
import * as mutations from './resolvers/mutations'
import * as queries from './resolvers/queries'

const MEDIUM_TIMEOUT_MS = 2 * 10000

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, Cached>({ max: 5000 })

metrics.trackCache('kuikpayAdmin', memoryCache)

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
        baseURL: 'checkout',
        retries: 2,
      },
      adminMetrics: {
        timeout: MEDIUM_TIMEOUT_MS,
        baseURL: 'statistics',
      },
      ecommerce: {
        timeout: MEDIUM_TIMEOUT_MS,
        baseURL: 'statistics',
      },
      orders: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
      orionServices: {
        timeout: MEDIUM_TIMEOUT_MS,
        baseURL: 'orion',
      },
      status: {
        memoryCache,
      },
    },
  },
  graphql: {
    resolvers: {
      Mutation: mutations,
      Query: queries,
    },
  },
  routes: {
    scheduler: method({
      POST: [scheduler],
    }),
    healthcheck: method({
      GET: [healthcheck],
    }),
  },
})
