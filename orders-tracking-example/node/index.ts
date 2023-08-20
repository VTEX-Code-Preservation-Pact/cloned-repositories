import {
  ClientsConfig,
  LRUCache,
  Service,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'

import { Clients } from './clients'
import { snoHandler } from './middlewares/snoHandler'
import { EventType } from './typings/notification'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface NotificationContext extends EventContext<Clients> {
    body: {
      type: string,
      invoiceNumber: string,
      trackingNumber: string,
      trackingUrl: string,
      courier: string,
      orderId: string,
      eventType: EventType,
      eventId: string,
      invoiceKey: string
    }
  }
  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {}
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  events: {
    snoHandler
  },
})
