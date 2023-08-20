import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class AuthService extends BaseRestService implements IAuth {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'auth'
  ) {
    super(context, options)
  }

  public login(email: Auth['email'], origin: string): Promise<unknown> {
    const { account } = this.context

    return this.post(
      `users/${this.name}/${email}?an=${account}`,
      { origin },
      {
        metric: `${this.name}-login`,
        timeout: 5000,
      }
    )
  }

  public verifyCode(args: Auth): Promise<unknown> {
    const { account } = this.context

    return this.post(
      `users/${this.name}/verify/${args.email}?an=${account}`,
      args,
      {
        metric: `${this.name}-verifycode`,
      }
    )
  }
}
