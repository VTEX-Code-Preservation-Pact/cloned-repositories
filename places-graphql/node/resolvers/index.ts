import { queries as geolocationQueries } from './geolocation'
import { queries as postalCodeQueries } from './postalCode'

export const resolvers = {
  Query: {
    ...geolocationQueries,
    ...postalCodeQueries,
  },
}
