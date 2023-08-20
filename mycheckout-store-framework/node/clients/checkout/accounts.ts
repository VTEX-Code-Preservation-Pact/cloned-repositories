import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class AccountsService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'accounts'
  ) {
    super(context, options)
  }

  public accounts(): unknown {
    return this.get(`${this.name}/storefront?an=${this.context.account}`, {
      metric: `${this.name}-get`,
    })
  }

  public initConfig(): unknown {
    return this.post(`${this.name}/initConfig`, {})
  }
}
