import { json } from 'co-body'

import { ServiceError } from '../../../helpers/serviceError'
import { createOrUpdateSchedulerService } from '../../../services/schedulers/createOrUpdate'

export async function createOrUpdateScheduler(ctx: Context) {
  const {
    params: { type },
  } = ctx

  const body = await json(ctx.req)

  const configuration = {
    type,
    ...body,
  }

  try {
    const schedulerInformation = await createOrUpdateSchedulerService(
      configuration,
      ctx
    )

    ctx.body = schedulerInformation
  } catch (error) {
    throw new ServiceError({
      message: 'Error creating or updating scheduler',
      reason: error.message,
    })
  }
}
