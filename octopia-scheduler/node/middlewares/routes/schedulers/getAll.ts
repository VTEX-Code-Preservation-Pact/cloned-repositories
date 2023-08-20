import { ServiceError } from '../../../helpers/serviceError'
import { getAllSchedulersService } from '../../../services/schedulers/getAll'

export async function getAllSchedulers(ctx: Context) {
  try {
    const schedulers = await getAllSchedulersService(ctx)

    ctx.body = schedulers
  } catch (error) {
    throw new ServiceError({
      message: 'Error getting schedulers',
      reason: error.message,
    })
  }
}
