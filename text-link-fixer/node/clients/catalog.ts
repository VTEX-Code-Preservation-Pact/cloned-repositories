import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

interface UpdateBody {
  Name: string
  CategoryId: number
  BrandId: number
  LinkId: string
}

const PRODUCT_URL = '/catalog/pvt/product/'
const SKU_URL = '/catalog_system/pvt/sku/stockkeepingunitbyid/'

export default class Catalog extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/api`, context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async getSku(skuId: string) {
    return this.http.get(`${SKU_URL}${skuId}`, {
      metric: 'get-product-by-sku-id',
    })
  }

  public async getProduct(productId: string) {
    return this.http.get(`${PRODUCT_URL}${productId}`, {
      metric: 'get-product-by-product-id',
    })
  }

  public async updateProduct(data: UpdateBody, productId: string) {
    return this.http.put(`${PRODUCT_URL}${productId}`, data, {
      metric: 'update-product-by-product-id',
    })
  }
}
