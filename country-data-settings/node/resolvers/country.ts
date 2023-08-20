import { ServiceContext } from '@vtex/api'

import { getSettingsByCountry } from '../utils/getSettingsByCountry'

export const root = {
  AdditionalFieldData: {
    __resolveType: (additionalData: any) => {
      if ('forgottenURL' in additionalData) {
        return 'PostalCodeData'
      }

      return null
    },
  },
  Field: {
    additionalData: (field: AddressFieldsConfiguration | PostalCodeField) => {
      if ('forgottenURL' in field) {
        return {
          forgottenURL: field.forgottenURL,
        }
      }

      return null
    },
  },
}

export const queries = {
  countryData: (
    _: void,
    { country }: { country: string },
    ctx: ServiceContext
  ) => {
    const data = getSettingsByCountry(ctx.vtex.settings.dependenciesSettings)[
      country
    ]

    return data
  },
  countriesData: (
    _: void,
    { countries }: { countries: string[] },
    ctx: ServiceContext
  ) => {
    return Object.values(
      getSettingsByCountry(ctx.vtex.settings.dependenciesSettings)
    ).filter(countryConfiguration =>
      countries.includes(countryConfiguration.countryISO)
    )
  },
  allCountriesData: (_: void, __: void, ctx: ServiceContext) => {
    return Object.values(
      getSettingsByCountry(ctx.vtex.settings.dependenciesSettings)
    )
  },
}
