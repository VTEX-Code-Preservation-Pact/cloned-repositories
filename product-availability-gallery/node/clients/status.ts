import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Status extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://portal.vtexcommercestable.com.br/api/logistics/pvt/inventory/skus/', context,
    {
      ...options,
      headers: {
        'VtexIdclientAutCookie': `${context.adminUserAuthToken}`,
      },
    })
  }

  public async getStatus(status: number, warehouse: string): Promise<string> {
    return this.http.get( `${status.toString()}?an=${warehouse}`, {
      metric: 'status-get',
    })
  }

  public async getStatusWithHeaders(
    status: number,
    warehouse: string
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(`${status.toString()}?an=${warehouse}`, {
      metric: 'status-get-raw',
    })
  }
}
