import { ServiceError } from '../../../helpers/serviceError'
import { getSchedulerByIdService } from '../../../services/schedulers/getById'

export async function getSchedulerById(ctx: Context) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  try {
    const schedulerInformation = await getSchedulerByIdService(
      id as string,
      ctx
    )

    ctx.body = schedulerInformation
  } catch (error) {
    throw new ServiceError({
      message: 'Error getting scheduler',
      reason: error.message,
    })
  }
}
