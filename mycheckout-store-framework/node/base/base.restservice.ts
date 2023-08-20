/* eslint-disable @typescript-eslint/ban-types */
import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { urlApi, urlApiQA } from './base.urls'

export class BaseRestService extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(
      ctx.production
        ? `${urlApi}/${options?.baseURL}`
        : `${urlApiQA}/${options?.baseURL}`,
      ctx,
      {
        ...options,
        headers: {
          ...options?.headers,
          VtexIdclientAutCookie: ctx.authToken,
        },
      }
    )
  }

  protected get(endpoint: string, config?: RequestConfig) {
    return this.http.get(`/${endpoint}`, {
      ...config,
    })
  }

  protected post(endpoint: string, data: object, config?: RequestConfig) {
    return this.http.post(`/${endpoint}`, data, {
      ...config,
    })
  }

  protected put(endpoint: string, data: object, config?: RequestConfig) {
    return this.http.put(`/${endpoint}`, data, {
      ...config,
    })
  }

  protected delete(endpoint: string, config?: RequestConfig) {
    return this.http.delete(`/${endpoint}`, {
      ...config,
    })
  }

  protected headers(auth: string) {
    return {
      Authorization: `Bearer ${auth}`,
    }
  }
}
