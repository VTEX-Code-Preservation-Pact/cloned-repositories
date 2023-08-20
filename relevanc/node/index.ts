// eslint-disable-next-line prettier/prettier
import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'
import schema from 'vtex.is-api-middleware-graphql/graphql'

import type { Clients } from './clients'
import { clientsConfig } from './clients'
import { routes } from './middleware/routes'
import { resolvers } from './resolvers'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: clientsConfig,
  routes,
  graphql: {
    resolvers,
    schema,
  },
})
