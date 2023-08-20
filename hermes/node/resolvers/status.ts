async function getGitHubStatus(_: string, __: any, ctx: Context) {
  const deliveryApps = await ctx.clients.status.getStatus()
  return deliveryApps
}

export default getGitHubStatus
