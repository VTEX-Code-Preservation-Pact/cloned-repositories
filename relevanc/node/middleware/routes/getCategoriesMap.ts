import { CustomError } from '../../utils'

export async function getCategoriesMap(ctx: Context) {
  const {
    clients: { categoriesMap },
  } = ctx

  try {
    const categoriesMapRecord = await categoriesMap.getCategoriesMap()

    if (!categoriesMapRecord) {
      ctx.body = 'Categories map has not been generated'

      return
    }

    ctx.body = categoriesMapRecord
  } catch (err) {
    throw new CustomError({
      message: err.message,
      reason: 'Unable to fetch categories map',
      status: 500,
    })
  }
}
