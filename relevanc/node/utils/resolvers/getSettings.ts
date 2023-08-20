export const getSettings = async (ctx: Context) => {
  const {
    clients: { apps },
  } = ctx

  const settings: AppSettings = await apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  if (!Object.keys(settings).length) {
    return null
  }

  return settings
}
