import { ServiceContext } from '@vtex/api'

import { getSettingsByCountry } from '../utils/getSettingsByCountry'

export function countrySettings(ctx: ServiceContext) {
  const country = ctx.vtex.route.params.country as string

  const allSettings = getSettingsByCountry(ctx.vtex.settings)

  ctx.body = allSettings[country]
}
