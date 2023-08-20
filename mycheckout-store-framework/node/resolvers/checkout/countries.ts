export const getCountries = async (
  _: unknown,
  __: unknown,
  { clients: { countries: CountriesClient } }: Context
) => {
  const resp = await CountriesClient.getCountries()

  return {
    count: 1,
    total: 1,
    current: 1,
    prev: 1,
    next: 1,
    data: resp,
  }
}

export const getCountry = (
  _: unknown,
  { id }: Countries,
  { clients: { countries: CountriesClient } }: Context
) => CountriesClient.getCountry(id)

export const getStateCities = (
  _: unknown,
  { country, state }: { country: string; state: string },
  { clients: { countries: CountriesClient } }: Context
) => CountriesClient.getStateCities(country, state)

export const getCities = (
  _: unknown,
  { city }: { city: string },
  { clients: { countries: CountriesClient } }: Context
) => CountriesClient.getCities(city)
