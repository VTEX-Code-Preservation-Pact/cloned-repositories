import { EventContext, IOClients } from '@vtex/api'

export async function listener(ctx: EventContext<IOClients>) {
  console.log('Evento recebido com o paylod ', ctx.body)
  return true
}
