import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json'

import { root as countryRoot, queries as countryQueries } from './country'

export default {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  ...countryRoot,
  Query: {
    ...countryQueries,
  },
}
