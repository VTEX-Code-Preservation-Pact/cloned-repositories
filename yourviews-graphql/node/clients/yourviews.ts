import { ExternalClient, InstanceOptions, IOContext, RequestConfig } from '@vtex/api'

export default class YourViewsClient extends ExternalClient {
  public appId?: string
  public token?: string

  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://service.yourviews.com.br', context, options)
  }

  // This is initialized by the withSecretKeys directive
  public init(secretKeys: SecretKeys) {
    this.appId = secretKeys.appId
    this.token = secretKeys.yourviewsToken
  }

  public async getRating (productId: string): Promise<string> {
    return this.get(this.routes.rating(productId), {
      metric: 'yourviews-get-rating',
    })
  }

  public async getRatings (productIds: string[]): Promise<string> {
    return this.get(this.routes.ratings(productIds), {
      metric: 'yourviews-get-ratings',
    })
  }

  public async getReviews (productId: string): Promise<string> {
    return this.get(this.routes.reviews(productId), {
      metric: 'yourviews-get-reviews',
    })
  }

  private get routes () {
    return {
      rating: (productId: string) => `/api/${this.appId}/review/reviewshelf?productIds=${productId}`,
      ratings: (productIds: string[]) => `/api/${this.appId}/review/reviewshelf?productIds=${productIds.join(',')}`,
      reviews: (productId: string) => `/api/${this.appId}/review?productId=${productId}`,
    }
  }

  private get (url: string, config?: RequestConfig) {
    return this.http.get(url, {
      ...config,
      headers: {
        Accept: 'application/json',
        'Authorization': this.token,
        'Content-Type': 'application/json',
      },
    })
  }
}
