interface PaginatedCountriesResponse {
  count: number
  total: number
  current: number
  prev: number
  next: number
  data: Countries[]
}

interface Countries {
  id: string
  country: string
  iso: string
  phone: string
  postal_code_regex: string
  states: States[]
}

interface States {
  state: string
  cities: Cities[]
}

interface Cities {
  city_id: string
  city: string
}

interface CountriesServiceImpl {
  getCountries(): unknown
  getCountry(id: string): unknown
  getStateCities(country: string, state: string): unknown
}
