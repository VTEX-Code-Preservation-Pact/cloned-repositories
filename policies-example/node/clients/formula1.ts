/* eslint-disable no-console */
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class Formula1 extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('http://ergast.com/api/f1/2020', ctx, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'false',
      },
    })
  }

  public async getDrivers() {
    const drivers = await this.http.get('/driverStandings.json')

    if (drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings) {
      const driversInfos: DriversInfo[] = []

      drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(
        (element: any) => {
          driversInfos.push({
            name: element.Driver.givenName,
            lastName: element.Driver.familyName,
            points: parseFloat(element.points),
          })
        }
      )

      return driversInfos
    }

    return []
  }
}
