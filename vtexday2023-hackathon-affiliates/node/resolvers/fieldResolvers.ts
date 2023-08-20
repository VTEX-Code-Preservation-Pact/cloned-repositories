import type { Affiliates } from 'vtex.vtexday2023-hackathon-affiliates'

export const fieldResolvers = {
  Affiliate: {
    affiliateId: (root: Affiliates) => root.id,
  },
}
