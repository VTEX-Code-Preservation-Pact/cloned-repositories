import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../utils'

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
      },
    })
  }

  private getChannelQueryString = () => {
    const { segment } = this.context as CustomIOContext
    const channel = segment?.channel
    const queryString = channel ? `?sc=${channel}` : ''

    return queryString
  }

  public simulation = (simulation: SimulationPayload) =>
    this.post<OrderForm>(
      this.routes.simulation(this.getChannelQueryString()),
      simulation,
      {
        metric: 'checkout-simulation',
      }
    )

  protected post = <T>(url: string, data?: any, config: RequestConfig = {}) => {
    return this.http
      .post<T>(url, data, config)
      .catch(statusToError) as Promise<T>
  }

  private get routes() {
    const base = '/api/checkout/pub'

    return {
      simulation: (queryString: string) =>
        `${base}/orderForms/simulation${queryString}`,
    }
  }
}
