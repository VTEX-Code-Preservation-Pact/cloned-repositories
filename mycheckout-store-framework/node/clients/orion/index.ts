import type { InstanceOptions, IOContext } from '@vtex/api'
import { IOClient } from '@vtex/api'

import { AuthService } from './auth'

export class OrionServices extends IOClient {
  public auth: AuthService
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options)
    this.auth = new AuthService(context, options)
  }
}
