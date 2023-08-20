import type { FC } from 'react'
import * as React from 'react'
import { Table } from 'vtex.styleguide'
import { useMemo } from 'react'
import { useQuery } from 'react-apollo'

import getDrivers from './queries/getDrivers.gql'

const InfosDrivers: FC = () => {
  const defaultSchema = {
    properties: {
      position: {
        title: 'Posição',
      },
      name: {
        title: 'Nome',
      },
      lastName: {
        title: 'Sobrenome',
      },
      points: {
        title: 'Pontos obtidos',
      },
    },
  }
  const { data: dataDrivers } = useQuery(getDrivers)

  const listDrivers = useMemo(() => {
    return dataDrivers?.getDrivers?.map(
      (
        element: { id: string; name: string; lastName: string; points: number },
        indexOf: number
      ) => {
        return {
          id: element.id,
          position: `${indexOf + 1}º`,
          name: element.name,
          lastName: element.lastName,
          points: element.points,
          index: indexOf,
        }
      }
    )
  }, [dataDrivers])

  return (
    <div className="mb5">
      <Table
        fullWidth
        schema={defaultSchema}
        items={listDrivers}
        emptyStateLabel="Não há informações para apresentar (permissão negada)"
      />
    </div>
  )
}

export default InfosDrivers
