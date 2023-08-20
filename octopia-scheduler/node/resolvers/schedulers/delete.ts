import { ResolverError } from '@vtex/api'

import { deleteSchedulerService } from '../../services/schedulers/delete'

export async function deleteScheduler(
  _: unknown,
  args: { id: string },
  ctx: Context
) {
  // eslint-disable-next-line no-console
  console.log('Args', args)

  const { id } = args

  try {
    await deleteSchedulerService(id, ctx)

    return true
  } catch (error) {
    throw new ResolverError(
      'Error deleting scheduler',
      error.statusCode ?? 500,
      error.message ?? 'INTERNAL_SERVER_ERROR'
    )
  }
}
