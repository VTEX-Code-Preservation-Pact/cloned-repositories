const CRON_EXPRESSION = '*/5 * * * *'

export async function scheduler(ctx: Context, next: () => Promise<unknown>) {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      clients: { scheduler },
      vtex: { workspace, account },
    } = ctx

    const cron = await scheduler
      .getSchedule('schedulerMyCheckoutPing')
      .then((data) => {
        return data
      })
      .catch(() => {
        return null
      })

    if (!cron || cron.expression !== CRON_EXPRESSION) {
      const schedulerData = {
        id: `schedulerMyCheckoutPing`,
        scheduler: {
          expression: CRON_EXPRESSION,
          endDate: '2029-12-30T23:29:00',
        },
        request: {
          method: 'GET',
          uri: `https://${workspace}--${account}.myvtex.com/_v/api/mycheckout/healthcheck`,
          headers: {
            'cache-control': 'no-cache',
            pragma: 'no-cache',
          },
          body: null,
        },
      }

      await scheduler
        .createOrUpdateSchedule(schedulerData)
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    }

    ctx.body = true
    ctx.status = 200
    ctx.set('Cache-Control', 'no-cache')
  } catch (e) {
    throw new Error(e.message)
  }

  await next()
}
