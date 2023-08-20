import { Service, RecorderState, ParamsContext } from '@vtex/api'

import { Clients } from './clients'
import { resolvers } from './resolvers'

const DEFAULT_TIMEOUT_MS = 10 * 1000

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: DEFAULT_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers,
  },
})
