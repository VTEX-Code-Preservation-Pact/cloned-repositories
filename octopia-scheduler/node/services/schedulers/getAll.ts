export async function getAllSchedulersService(ctx: Context) {
  const {
    clients: { scheduler },
  } = ctx

  try {
    const schedulers = await scheduler.getAll()

    return schedulers
  } catch (error) {
    throw new Error(error.message)
  }
}
