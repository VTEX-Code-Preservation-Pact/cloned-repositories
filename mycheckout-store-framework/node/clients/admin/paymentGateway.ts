import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class PaymentGateway extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://${ctx.account}.vtexpayments.com.br`, ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie:
          ctx.storeUserAuthToken ?? ctx.adminUserAuthToken ?? ctx.authToken,
      },
    })
  }

  public getPaymentRules = (): Promise<any> =>
    this.http.get(`/api/pvt/rules`, {
      metric: 'get-payment-rules',
    })
}
