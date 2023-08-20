import { ResolverError } from '@vtex/api'

export async function getSchedulerById(
  _: unknown,
  args: { id: string },
  ctx: Context
) {
  const { id } = args

  const {
    clients: { scheduler },
  } = ctx

  try {
    const schedulerInformation = await scheduler.getById(id)

    return schedulerInformation
  } catch (error) {
    throw new ResolverError(
      'Error getting scheduler',
      error.statusCode ?? 500,
      error.message ?? 'INTERNAL_SERVER_ERROR'
    )
  }
}
