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

  public async getConstructor() {
    const constructor = await this.http.get('/constructorStandings.json')

    if (
      constructor.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    ) {
      const constructorsInfos: ConstructorsInfos[] = []

      constructor.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(
        (element: any) => {
          constructorsInfos.push({
            name: element.Constructor.name,
            points: parseFloat(element.points),
          })
        }
      )

      return constructorsInfos
    }

    return []
  }
}
