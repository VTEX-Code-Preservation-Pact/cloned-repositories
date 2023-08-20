import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class OrderService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'orders'
  ) {
    super(context, options)
  }

  public createOrder(args: OrderInput, hostname: string): Promise<unknown> {
    const { account } = this.context

    args.account.accountName = account
    args.account.hostname = hostname
    args.oms = 'vtex'

    return this.post(`${this.name}/v2`, args, {
      metric: `${this.name}-create`,
      headers: {
        debug: true,
      },
    })
  }

  public getPaymentProcessStatus(orderId: string): Promise<unknown> {
    const { account } = this.context

    return this.get(
      `${this.name}/payment-process?an=${account}&orderId=${orderId}`,
      {
        metric: `${this.name}-get`,
      }
    )
  }
}
