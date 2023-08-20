import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class CreditService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'credit'
  ) {
    super(context, options)
  }

  public validateCredit(args: {
    email: string
    totals: number
  }): Promise<unknown> {
    return this.post(`credit-pay/validate-credit`, args, {
      metric: `${this.name}-validateCredit`,
    })
  }
}
