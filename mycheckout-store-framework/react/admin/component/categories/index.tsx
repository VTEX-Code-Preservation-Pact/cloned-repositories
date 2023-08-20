import React from 'react'
import { AutocompleteInput, Table, Tag } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { useHandleCategories } from './useHandleCategories'

// eslint-disable-next-line react/prop-types
const Categories = ({ visualization, onChange }: any) => {
  const { hidde, input, options, onHandle } = useHandleCategories(
    visualization,
    onChange
  )

  return (
    <div>
      <h3>
        <FormattedMessage id="checkoutless.categories.title" />
      </h3>
      <p className="lh-copy c-muted-1">
        <FormattedMessage id="checkoutless.categories.description" />
      </p>
      <div>
        <AutocompleteInput input={input} options={options} />
      </div>
      <div>
        <Table
          fullWidth
          schema={{
            properties: {
              id: {
                title: (
                  <FormattedMessage id="checkoutless.categories.table.id" />
                ),
              },
              name: {
                title: (
                  <FormattedMessage id="checkoutless.categories.table.name" />
                ),
              },
              type: {
                title: (
                  <FormattedMessage id="checkoutless.categories.table.type" />
                ),
                cellRenderer: ({
                  rowData,
                }: {
                  cellData: string
                  rowData: { type: string }
                }) => <Tag bgColor="#00bbd4">{rowData?.type}</Tag>,
              },
            },
          }}
          items={hidde}
          lineActions={[
            {
              // eslint-disable-next-line react/display-name
              label: () => (
                <FormattedMessage id="checkoutless.categories.table.active" />
              ),
              onClick: ({ rowData }: any) => onHandle(rowData),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Categories
