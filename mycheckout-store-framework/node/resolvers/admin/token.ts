/* eslint-disable @typescript-eslint/no-shadow */
export function token(_: unknown, __: unknown, ctx: Context) {
  return ctx.clients.vbase
    .getJSON<{ token: string }>('account.example', 'configs')
    .then(({ token }) => token)
}
