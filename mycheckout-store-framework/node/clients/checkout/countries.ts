import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class CountriesService
  extends BaseRestService
  implements CountriesServiceImpl
{
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'countries'
  ) {
    super(context, options)
  }

  public getCountries(): unknown {
    return this.get(`masters/${this.name}`, {
      metric: `${this.name}-get`,
    })
  }

  public getCountry(id: string): unknown {
    return this.get(`${this.name}/${id}`, {
      metric: `${this.name}-get`,
    })
  }

  public async getStateCities(country: string, state: string) {
    return this.get(
      `masters/${this.name}/stateCities?country=${country}&state=${state}`,
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public async getCities(city: string) {
    return this.get(`masters/${this.name}/cities?city=${city}`, {
      metric: `${this.name}-get`,
    })
  }
}
