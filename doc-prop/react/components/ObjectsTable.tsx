import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'

import { titleCell, codeCell } from './TableCellComponents'
import { mapCustomTypes } from '../hooks/mapCustomTypes'
import { capitalizeFirst } from '../utils/capitalizeFirst'

const customTypes: JSX.Element[] = []

const columns = [
  {
    /** Prop that this column represents */
    id: 'title',
    cellRenderer: ({ data }: { data: string }) => {
      return titleCell({ title: data })
    },
    /** Title that will appear on Header */
    title: (
      <span className="t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl">
        <FormattedMessage id="docProp.table.title" />
      </span>
    ),
    /** Fixed width */
    maxWidth: 20,
  },
  {
    id: 'type',
    cellRenderer: ({ data }: { data: string }) => {
      return codeCell({ code: data })
    },
    title: (
      <p className="t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl">
        <FormattedMessage id="docProp.table.type" />
      </p>
    ),
  },
]

function mapObjectsToNames(objectProp: Record<string, ObjSchemaInterface>) {
  return Object.entries(objectProp).map(([key, { type }]: any) => ({
    title: key,
    type,
  }))
}

const ObjectsTable: FC<ObjectTableProps> = ({
  objectProp,
  propTitle,
  messages,
}) => {
  const data = mapObjectsToNames(
    mapCustomTypes(objectProp, messages).mappedProps
  )
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 0.5] })

  return (
    <div className="overflow-x-auto">
      <div className="t-body c-on-base mt1 lh-copy mb1 pb1">
        <div className="mb4">
          <FormattedMessage id="docProp.objectTable.title" />
          <span className="pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis">
            {capitalizeFirst(propTitle)}
          </span>
        </div>
        <div className="mb7">
          <Table
            measures={measures}
            items={data}
            columns={sizedColumns}
            highlightOnHover
          />
        </div>
        <div className="mt4 mb4">{customTypes}</div>
      </div>
    </div>
  )
}

interface ObjectTableProps {
  objectProp: Record<string, ObjSchemaInterface>
  messages: Record<string, Record<string, string>>
  propTitle: string
}

export default ObjectsTable
