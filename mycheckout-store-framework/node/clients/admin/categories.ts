import type {
  IOContext,
  InstanceOptions,
  SegmentData,
  RequestConfig,
} from '@vtex/api'
import { AppClient } from '@vtex/api'
import { stringify } from 'qs'

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  return `${baseURL}${url}${stringify(params, {
    arrayFormat: 'repeat',
    addQueryPrefix: true,
  })}&segmentToken=${headers['x-vtex-segment']}`
}

export class CategoriesClient extends AppClient {
  private basePath: string

  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', context, options)
    this.basePath = context.sessionToken
      ? '/proxy/authenticated/catalog'
      : '/proxy/catalog'
  }

  public async getCategories() {
    const response = await this.get(`/pub/category/tree/3/`, {
      metric: 'search-categories',
    })

    return response
  }

  private get = <T = unknown>(url: string, config: RequestConfig = {}) => {
    const segmentData: SegmentData | undefined = (this.context as any).segment
    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }
    config.inflightKey = inflightKey

    return this.http.get<T>(`${this.basePath}${url}`, config)
  }
}
