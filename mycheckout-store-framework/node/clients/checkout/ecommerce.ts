import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class EcommerceService
  extends BaseRestService
  implements IEcommerceService
{
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'ecommerce'
  ) {
    super(context, options)
  }

  public log(args: EcommerceInput): Promise<unknown> {
    const { account } = this.context

    args.account = args.account ? args.account : account

    return this.post(`${this.name}`, args, {
      metric: `${this.name}-get`,
    })
  }
}
