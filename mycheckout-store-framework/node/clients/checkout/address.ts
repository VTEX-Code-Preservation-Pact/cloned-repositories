import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class AddressService extends BaseRestService {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'addresses'
  ) {
    super(context, options)
  }

  public getAddress(email: User['email'], auth: string): Promise<unknown> {
    const { account } = this.context

    return this.get(`users/${this.name}/${email}?an=${account}`, {
      headers: this.headers(auth),
      metric: `${this.name}-get`,
    })
  }

  public createAddress(args: never): Promise<unknown> {
    return this.post(`users/${this.name}/`, args, {
      metric: `${this.name}-create`,
    })
  }

  public externalAddress(args: never): Promise<unknown> {
    const { account } = this.context

    return this.post(`users/${this.name}/external?an=${account}`, args, {
      metric: `${this.name}-create`,
    })
  }

  public updateAddress(args: never, auth: string): Promise<unknown> {
    return this.put(`users/${this.name}/`, args, {
      headers: this.headers(auth),
      metric: `${this.name}-create`,
    })
  }

  public async deleteAddress(id: string, auth: string): Promise<unknown> {
    return (
      await this.delete(`users/${this.name}/${id}`, {
        headers: this.headers(auth),
        metric: `${this.name}-create`,
      })
    ).data
  }
}
