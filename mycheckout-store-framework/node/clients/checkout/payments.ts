import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class PaymentsService extends BaseRestService implements IPayments {
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'cards'
  ) {
    super(context, options)
  }

  public getPayments(
    email: User['email'],
    auth: string
  ): Payments[] | Promise<Payments[]> {
    const { account } = this.context

    return this.get(`users/${this.name}/${email}?an=${account}`, {
      headers: this.headers(auth),
      metric: `${this.name}-get`,
    })
  }

  public createPayment(args: Payments): Promise<unknown> {
    return this.post(`${this.name}/`, args, {
      metric: `${this.name}-create`,
    })
  }

  public async deletePayment(
    id: Payments['id'],
    auth: string
  ): Promise<unknown> {
    return (
      await this.delete(`users/${this.name}/${id}`, {
        headers: this.headers(auth),
        metric: `${this.name}-create`,
      })
    ).data
  }
}
