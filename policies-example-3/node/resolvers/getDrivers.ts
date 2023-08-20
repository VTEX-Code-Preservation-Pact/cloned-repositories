export async function getDrivers(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { drivers },
  } = ctx

  return drivers.getDrivers()
}
