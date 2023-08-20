import { ACTION } from '../contants'

export const dynamicRulesMapper = (
  offer: Relevanc.SponsoredOffer,
  { addAllProducts, boostType }: AppSettings
): DynamicRule => ({
  action: addAllProducts ? ACTION.ADD : ACTION.PROMOTE,
  type: boostType,
  value: offer.productId,
})
