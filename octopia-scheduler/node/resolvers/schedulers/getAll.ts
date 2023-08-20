import { ResolverError } from '@vtex/api'

import { getAllSchedulersService } from '../../services/schedulers/getAll'

export async function getAllSchedulers(_: unknown, __: unknown, ctx: Context) {
  try {
    const schedulers = await getAllSchedulersService(ctx)

    return schedulers
  } catch (error) {
    throw new ResolverError(
      'Error getting all schedulers',
      error.statusCode ?? 500,
      error.message ?? 'INTERNAL_SERVER_ERROR'
    )
  }
}
