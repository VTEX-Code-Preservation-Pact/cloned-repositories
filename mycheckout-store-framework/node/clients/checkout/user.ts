import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class UserService extends BaseRestService implements IUser {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'users'
  ) {
    super(context, options)
  }

  public getUser(
    email: User['email'],
    _account: string,
    auth: string
  ): Promise<unknown> {
    const { account } = this.context
    const query = _account ? `?an=${_account}` : `?an=${account}`

    return this.get(`${this.name}/profiles/${email}${query}`, {
      headers: this.headers(auth),
      metric: `${this.name}-get`,
    })
  }

  public createUser(args: User): Promise<unknown> {
    const { account } = this.context

    return this.post(`${this.name}/profiles?an=${account}`, args, {
      metric: `${this.name}-create`,
    })
  }

  public updateUser(args: UserInput, auth: string): Promise<unknown> {
    return this.put(`${this.name}/profiles`, args, {
      headers: this.headers(auth),
      metric: `${this.name}-update`,
    })
  }
}
