import type { InstanceOptions, IOContext } from '@vtex/api'
import { AppClient } from '@vtex/api'

export class Constructors extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.policies-example-2@0.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        ...(context.authToken
          ? { VtexIdclientAutCookie: context.authToken }
          : null),
        'Content-Type': 'application/json',
      },
    })
  }

  public async getConstructors() {
    return this.http.get(`/_v/test-policies-route`)
  }
}
