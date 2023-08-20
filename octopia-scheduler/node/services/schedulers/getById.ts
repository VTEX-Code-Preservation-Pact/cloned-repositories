export async function getSchedulerByIdService(id: string, ctx: Context) {
  const {
    clients: { scheduler },
  } = ctx

  try {
    const schedulerInformation = await scheduler.getById(id)

    return schedulerInformation
  } catch (error) {
    throw new Error(error.message)
  }
}
