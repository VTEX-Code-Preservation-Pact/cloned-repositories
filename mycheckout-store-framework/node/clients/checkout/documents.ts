import type { InstanceOptions, IOContext } from '@vtex/api'

import { BaseRestService } from '../../base/base.restservice'

export class DocumentsService
  extends BaseRestService
  implements DocumentServiceImpl
{
  constructor(
    context: IOContext,
    options?: InstanceOptions,
    private readonly name: string = 'documents'
  ) {
    super(context, options)
  }

  public getDocumentTypes(): unknown {
    return this.get(`masters/${this.name}?limit=100`, {
      metric: `${this.name}-get`,
    })
  }
}
