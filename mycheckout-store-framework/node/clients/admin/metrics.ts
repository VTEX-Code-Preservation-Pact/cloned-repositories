import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class MetricsService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'metrics'
  ) {
    super(context, options)
  }

  public categoryMetrics(data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/categories/category`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public subcategoryMetrics(category: string, data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/categories/subcategory?c=${category || 'default'}`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public ticketAverage(data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/ticket`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public checkout(data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/checkout`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public button(data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/button`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }

  public conversionRate(data: unknown) {
    const { account } = this.context

    return this.post(
      `${this.name}/conversion`,
      { data: { ...(data as JSON), account } },
      {
        metric: `${this.name}-get`,
      }
    )
  }
}
