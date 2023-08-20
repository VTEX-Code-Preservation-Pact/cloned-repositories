
import {getSettings} from '../utils/helpers'

export async function settings(ctx: Context, next: () => Promise<any>) {

    const appSettings = await getSettings(ctx)

    const allowEdit = appSettings.allowEdit ? appSettings.allowEdit : false
    const allowContinue = appSettings.allowContinue ? appSettings.allowContinue : false

    const output = {
        allowContinue,
        allowEdit,
    }

    ctx.status = 200
    ctx.body = output

    await next()
}
