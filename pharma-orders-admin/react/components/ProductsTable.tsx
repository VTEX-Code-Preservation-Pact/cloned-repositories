import React from 'react'
import { EXPERIMENTAL_Table as Table } from 'vtex.styleguide'
import useTableMeasures from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import getOrderItems from '../graphql/getOrderItems.gql'
import LoadingSpinner from './LoadingSpinner'
import { titlesIntl } from '../utils/intl'

export default function ProductsTable({ orderId }: ProductTableProps) {
  const intl = useIntl()

  const responseFromGetOrder = useQuery(getOrderItems, {
    variables: { orderId },
    ssr: false,
  })

  const items = responseFromGetOrder?.data?.getOrder?.data?.items

  const columns = [
    {
      id: 'productId',
      title: intl.formatMessage(titlesIntl.productTableProductId),
    },
    {
      id: 'quantity',
      title: intl.formatMessage(titlesIntl.productTableQuantity),
    },
    {
      id: 'name',
      title: intl.formatMessage(titlesIntl.productTableName),
    },
  ]

  const measures = useTableMeasures({ size: items?.length })

  return (
    <div className="mt7">
      {!items && <LoadingSpinner />}
      {items && (
        <Table
          measures={measures}
          items={items}
          columns={columns}
          highlightOnHover
        />
      )}
    </div>
  )
}
