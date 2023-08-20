import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Table } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { currentStock } from '../../utils/definedMessages'

const CurrentStock: FC = () => {
  const context = useContext(EstablishmentContext)

  const intl = useIntl()
  const defaultSchema = {
    properties: {
      id: {
        title: intl.formatMessage(currentStock.id),
      },
      dockName: {
        title: intl.formatMessage(currentStock.dockName),
      },
    },
  }

  const lineActions = [
    {
      label: () => intl.formatMessage(currentStock.edit),
      onClick: (data: { rowData: Establishment }) =>
        context.update(data.rowData),
    },
    {
      label: () => intl.formatMessage(currentStock.delete),
      isDangerous: true,
      onClick: (data: { rowData: Establishment }) =>
        context.deleteEstablishments(data.rowData.id),
    },
  ]

  if (context.loading)
    return <div>{intl.formatMessage(currentStock.loading)}</div>

  return (
    <>
      <div className="mb5">
        <Table
          fullWidth
          schema={defaultSchema}
          items={context.establishmentList}
          lineActions={lineActions}
        />
      </div>
    </>
  )
}

export default CurrentStock
