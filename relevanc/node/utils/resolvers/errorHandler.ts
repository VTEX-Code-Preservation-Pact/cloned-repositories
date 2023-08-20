export const errorHandler = (message: string, ctx: Context, error?: Error) => {
  if (process.env.VTEX_APP_LINK) {
    console.error(error ?? message)
  } else {
    ctx.vtex.logger.error({
      message,
    })
  }

  throw error ?? new Error(message)
}
