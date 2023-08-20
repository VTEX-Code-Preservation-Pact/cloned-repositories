import { FC, useMemo } from 'react'
import * as React from 'react'
import { Table } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import getConstructors from './queries/getConstructors.gql'

const InfosConstructor: FC = () => {
  const defaultSchema = {
    properties: {
      position: {
        title: 'Posição',
      },
      team: {
        title: 'Equipe',
      },
      points: {
        title: 'Pontos obtidos',
      },
    },
  }

  const { data: dataConstructors } = useQuery(getConstructors)

  const listConstructors = useMemo(() => {
    return dataConstructors?.getConstructors?.map(
      (
        element: { id: string; name: string; points: number },
        indexOf: number
      ) => {
        return {
          id: element.id,
          position: `${indexOf + 1}º`,
          team: element.name,
          points: element.points,
          index: indexOf,
        }
      }
    )
  }, [dataConstructors])

  return (
    <div className="mb5">
      <Table
        fullWidth
        schema={defaultSchema}
        items={listConstructors}
        emptyStateLabel="Não há informações para apresentar (permissão negada)"
      />
    </div>
  )
}

export default InfosConstructor
