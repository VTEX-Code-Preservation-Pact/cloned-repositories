import type {
  InstanceOptions,
  IOContext,
  RequestConfig,
  SegmentData,
} from '@vtex/api'
import { AppClient } from '@vtex/api'
import { stringify } from 'qs'

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  return `${
    baseURL! +
    url! +
    stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true })
  }&segmentToken=${headers['x-vtex-segment']}`
}

export class Search extends AppClient {
  private basePath: string

  private addSalesChannel = (url: string, salesChannel?: string | number) => {
    if (!salesChannel) {
      return url
    }

    return url.concat(`&sc=${salesChannel}`)
  }

  private addCompleteSpecifications = (url: string) => {
    if (!url.includes('?')) {
      return `${url}?compSpecs=true`
    }

    return `${url}&compSpecs=true`
  }

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)

    this.basePath = ctx.sessionToken
      ? '/proxy/authenticated/catalog'
      : '/proxy/catalog'
  }

  public productBySku = (skuId: string, salesChannel?: string | number) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        this.addSalesChannel(
          `/pub/products/search?fq=skuId:${skuId}`,
          salesChannel
        )
      ),
      {
        metric: 'search-productBySku',
      }
    )

  private get = <T = any>(url: string, config: RequestConfig = {}) => {
    const segmentData: SegmentData | undefined = (
      this.context as CustomIOContext
    ).segment

    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }
    config.inflightKey = inflightKey

    return this.http.get<T>(`${this.basePath}${url}`, config)
  }
}
