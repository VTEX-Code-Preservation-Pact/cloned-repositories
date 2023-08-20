import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'

import { titleCell, descriptionCell, codeCell } from './TableCellComponents'
import { mapCustomTypes } from '../hooks/mapCustomTypes'
import { capitalizeFirst } from '../utils/capitalizeFirst'

const lang = 'en'

/** Columns definition, must be an array */
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
    id: 'description',
    cellRenderer: ({ data }: { data: string }) => {
      return descriptionCell({ description: data })
    },
    title: (
      <p className="t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl">
        <FormattedMessage id="docProp.table.description" />
      </p>
    ),
    /** Fixed width */
    maxWidth: 50,
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
  {
    id: 'default',
    cellRenderer: ({ data }: { data: string }) => {
      return codeCell({ code: data })
    },
    title: (
      <p className="t-body fw5 c-muted-1 tl">
        <FormattedMessage id="docProp.table.defaultValue" />
      </p>
    ),
  },
]

const mapPropsToColumns = (
  propsObj: Record<string, ObjSchemaInterface>,
  messages: Record<string, Record<string, string>>
) => {
  return Object.entries(propsObj).map(
    ([key, { description, type, default: defaultValue }]: any) => ({
      title: key,
      description: messages[lang][description],
      type: capitalizeFirst(type),
      default: defaultValue || 'null',
    })
  )
}

const PropsTable: FC<PropTableProps> = ({ fetchedProps, fetchedMessages }) => {
  // help
  const customTypes = mapCustomTypes(fetchedProps, fetchedMessages)
  const data = mapPropsToColumns(
    customTypes.mappedProps,
    fetchedMessages
  ).map(data => ({ ...data, id: data.title }))
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [1, 0.5, 0.5, 1] })

  return (
    <div className="pa4">
      <div className="overflow-x-auto mb7">
        <Table
          measures={measures}
          items={data}
          columns={sizedColumns}
          highlightOnHover
        />
      </div>
      {customTypes.mappedTypes}
    </div>
  )
}

interface PropTableProps {
  fetchedProps: Record<string, ObjSchemaInterface>
  fetchedMessages: Record<string, Record<string, string>>
}

export default PropsTable
