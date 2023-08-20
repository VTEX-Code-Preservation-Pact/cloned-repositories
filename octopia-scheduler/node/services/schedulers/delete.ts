export async function deleteSchedulerService(id: string, ctx: Context) {
  const {
    clients: { scheduler },
  } = ctx

  try {
    await scheduler.delete(id)

    return true
  } catch (error) {
    throw new Error(error.message)
  }
}
