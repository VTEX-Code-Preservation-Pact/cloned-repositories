import { after } from './after'
import { before } from './before'

export const resolvers = {
  Query: {
    before,
    after,
  },
}
