import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class AdditionalDataClient extends ExternalClient {

  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br/api/dataentities/CL/`, context,
    {
      ...options,
      headers: {
        'VtexIdclientAutCookie': context.authToken,
      },
    })

    // console.log(context.authToken)
    // console.log(context.adminUserAuthToken)

  }

  public async get(userId: string) {
    const resp = await this.http.get(`search?_where=userId=${userId}&_fields=_all`)
    // console.log(resp.data)
    return resp
  }
}
