import { prop } from 'ramda'

import { AppGraphQLClient } from '..'
import { InstanceOptions, IOContext } from '../../..'
import { RequestTracingConfig } from '../../../HttpClient'
import { Brand, query as getBrand } from './brand'
import { Category, query as getCategory } from './category'
import { Product, query as getProduct } from './product'
import { query as getSKU, SKU } from './sku'

export class CatalogGraphQL extends AppGraphQLClient {
  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-graphql@1.x', ctx, {
      ...opts,
      headers: {
        ...opts && opts.headers,
        cookie: `VtexIdclientAutCookie=${ctx.authToken}`,
      }})
  }

  public sku = (id: string, tracingConfig?: RequestTracingConfig) => {
    const variables = {
      identifier: {
        field: 'id',
        value: id,
      },
    }
    return this.graphql
      .query<{sku: SKU}, typeof variables>({
        inflight: true,
        query: getSKU,
        variables,
      },
      {
        forceMaxAge: 5,
        tracing: {
          requestSpanNameSuffix: 'catalog-sku',
          ...tracingConfig?.tracing,
        },
      })
      .then(prop('data'))
  }

  public product = (id: string, tracingConfig?: RequestTracingConfig) => {
    const variables = {
      identifier: {
        field: 'id',
        value: id,
      },
    }
    return this.graphql
      .query<{product: Product}, typeof variables>({
        inflight: true,
        query: getProduct,
        variables,
      },
      {
        forceMaxAge: 5,
        tracing: {
          requestSpanNameSuffix: 'catalog-product',
          ...tracingConfig?.tracing,
        },
      })
      .then(prop('data'))
  }

  public category = (id: string, tracingConfig?: RequestTracingConfig) =>
    this.graphql
      .query<{category: Category}, { id: string }>({
        inflight: true,
        query: getCategory,
        variables: { id },
      },
      {
        forceMaxAge: 5,
        tracing: {
          requestSpanNameSuffix: 'catalog-category',
          ...tracingConfig?.tracing,
        },
      })
      .then(prop('data'))

  public brand = (id: string, tracingConfig?: RequestTracingConfig) =>
    this.graphql
      .query<{brand: Brand}, { id: string }>({
        inflight: true,
        query: getBrand,
        variables: { id },
      },
      {
        forceMaxAge: 5,
        tracing: {
          requestSpanNameSuffix: 'catalog-brand',
          ...tracingConfig?.tracing,
        },
      })
      .then(prop('data'))
}
