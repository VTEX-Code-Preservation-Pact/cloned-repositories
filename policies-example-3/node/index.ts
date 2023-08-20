import { Service } from '@vtex/api'
import type { ServiceContext } from '@vtex/api'

import type { Clients } from './clients'
import { clients } from './clients'
import { getDrivers } from './resolvers/getDrivers'
import { getConstructors } from './resolvers/getConstructors'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        getDrivers,
        getConstructors,
      },
    },
  },
})
