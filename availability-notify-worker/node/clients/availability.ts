import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Availability extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br`,
      context,
      options
    )
  }

  public async forwardNotification(body: any): Promise<any> {
    return this.http.post(`/_v/availability-notify/notify`, body, {
      headers: {
        VtexIdclientAutCookie: `${this.context.authToken}`,
      },
      metric: 'forward-notification-post',
    })
  }
}
