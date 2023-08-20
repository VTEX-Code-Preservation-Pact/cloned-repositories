import type { EventContext } from '@vtex/api'
import { LogLevel, NotFoundError, ResolverError } from '@vtex/api'

import { clearString } from '../utils/clearString'
import type { Clients } from '../clients'

export async function skuChange(ctx: EventContext<Clients>) {
  const {
    clients: { catalog: catalogClient },
  } = ctx

  const { IdSku, HasStockKeepingUnitModified } = ctx.body

  if (!HasStockKeepingUnitModified) return

  let sku
  let product
  let newTextLink
  let productId

  try {
    sku = await catalogClient.getSku(IdSku)

    productId = sku.ProductId

    product = await catalogClient.getProduct(productId)

    if (!/\s/.test(product.LinkId)) return

    newTextLink = clearString(product.LinkId)
  } catch (error) {
    const erroMessage = `SKU ${IdSku} not found.`
    const splunkError = {
      error: erroMessage,
      detail: error,
    }

    ctx.vtex.logger.log(splunkError, LogLevel.Error)
    throw new NotFoundError(erroMessage)
  }

  try {
    const bodyPayload = {
      Name: product.Name,
      CategoryId: product.CategoryId,
      BrandId: product.BrandId,
      LinkId: newTextLink,
    }

    await catalogClient.updateProduct(bodyPayload, productId)
  } catch (error) {
    const erroMessage = `Product ${productId} cannot be updated.`
    const splunkError = {
      error: erroMessage,
      detail: error,
    }

    ctx.vtex.logger.log(splunkError, LogLevel.Error)
    throw new ResolverError(erroMessage)
  }

  return true
}
