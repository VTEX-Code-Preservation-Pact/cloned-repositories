export async function errorHandler(ctx: Context, next: () => Promise<void>) {
  const {
    vtex: { logger },
  } = ctx

  try {
    await next()
  } catch (error) {
    logger.error({
      message: error.message,
      reason: error.reason,
      status: error.status,
      data: error.data ?? error,
    })

    ctx.status = error.status || 500
    ctx.body = error.reason || 'Something went wrong'
  }
}
