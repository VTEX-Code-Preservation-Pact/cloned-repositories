import { Apps } from '@vtex/api'

export const getSettings = (ctx: any) => {
    const apps = new Apps(ctx.vtex)

    return apps.getAppSettings(ctx.vtex.userAgent)
}
