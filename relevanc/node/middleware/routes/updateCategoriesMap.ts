import { updateCategoriesMapService } from '../../services'
import { CustomError } from '../../utils'

export async function updateCategoriesMap(
  ctx: Context,
  next: () => Promise<void>
) {
  try {
    await next()

    updateCategoriesMapService(ctx)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      reason: 'Something went wrong updating the categories map',
      status: 500,
    })
  }
}
