import { Service, method } from '@vtex/api'

import resolvers from './resolvers'
import { countrySettings } from './middlewares/countrySettings'
import { allCountrySettings } from './middlewares/allCountrySettings'

export default new Service({
  routes: {
    countrySettings: method({ GET: [countrySettings] }),
    allCountrySettings: method({ GET: [allCountrySettings] }),
  },
  graphql: {
    resolvers,
  },
})
