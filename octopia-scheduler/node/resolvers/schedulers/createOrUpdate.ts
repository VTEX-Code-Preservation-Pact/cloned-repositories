import { ResolverError } from '@vtex/api'
import type { SchedulerConfigurationPayload } from 'vtex.octopia-scheduler'

import { createOrUpdateSchedulerService } from '../../services/schedulers/createOrUpdate'

export async function createOrUpdateScheduler(
  _: unknown,
  args: { configuration: SchedulerConfigurationPayload },
  ctx: Context
) {
  // eslint-disable-next-line no-console
  console.log('Args', args)

  const { configuration } = args

  if (configuration.type !== 'offers' && configuration.type !== 'orders') {
    throw new ResolverError('Invalid type', 400, 'INVALID_TYPE')
  }

  try {
    const schedulerInformation = await createOrUpdateSchedulerService(
      configuration,
      ctx
    )

    return schedulerInformation
  } catch (error) {
    throw new ResolverError(
      'Error creating or updating scheduler',
      error.statusCode ?? 500,
      error.message ?? 'INTERNAL_SERVER_ERROR'
    )
  }
}
