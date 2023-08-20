import { UserInputError } from '@vtex/api'
import type { SchedulerConfigurationPayload } from 'vtex.octopia-scheduler'

import { createSchedulerConfiguration } from '../../helpers/scheduler'

export async function createOrUpdateSchedulerService(
  configuration: SchedulerConfigurationPayload,
  ctx: Context
) {
  const {
    clients: { scheduler },
    vtex: { production, workspace, account },
  } = ctx

  try {
    const { type } = configuration

    if (type !== 'offers' && type !== 'orders') {
      throw new UserInputError('Invalid type')
    }

    const schedulerConfiguration = createSchedulerConfiguration({
      ...configuration,
      production,
      account,
      workspace,
    })

    const schedulerInformation = await scheduler.createOrUpdate(
      schedulerConfiguration
    )

    return schedulerInformation
  } catch (error) {
    throw new Error(error.message)
  }
}
