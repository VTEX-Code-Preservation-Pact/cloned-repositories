import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class AuthService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'auth'
  ) {
    super(context, options)
  }

  public login(authBnpl: {
    redirectUrl: string
    consumerId: string
    clientIp: string
    authCode: string
  }): Promise<unknown> {
    return this.post(`${this.name}/login`, authBnpl, {
      metric: `${this.name}-login`,
      timeout: 5000,
    })
  }
}
