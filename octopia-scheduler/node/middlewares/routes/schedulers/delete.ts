import { ServiceError } from '../../../helpers/serviceError'
import { deleteSchedulerService } from '../../../services/schedulers/delete'

export async function deleteScheduler(ctx: Context) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  try {
    await deleteSchedulerService(id as string, ctx)

    ctx.status = 204
  } catch (error) {
    throw new ServiceError({
      message: 'Error deleting scheduler',
      reason: error.message,
    })
  }
}
