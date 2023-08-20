import { queries as sellersQueries } from './search'

export const resolvers = {
  Query: {
    ...sellersQueries,
  },
}
