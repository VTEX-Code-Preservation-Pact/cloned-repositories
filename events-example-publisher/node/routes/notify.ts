import { getRandomNumber } from '../utils/randomNumber'

export async function createSendEvent(ctx: Context) {
  const random = getRandomNumber().toString()
  await ctx.clients.events.sendEvent('', 'random-number-generated', {
    random
  })
  ctx.status = 200
  ctx.body = 'Evento disparado com o payload ' + random
}
