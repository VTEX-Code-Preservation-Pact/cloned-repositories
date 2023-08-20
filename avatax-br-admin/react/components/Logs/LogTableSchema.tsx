import React from 'react'
import { MessageDescriptor } from 'react-intl'

import { logTableSchemaMessages } from '../../utils/definedMessages'
import { LogViewButton } from './LogViewButton'

export const LogTableSchema = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    properties: {
      view: {
        title: formatMessage(logTableSchemaMessages.details),
        minWidth: 75,
        cellRenderer: ({ cellData }: { cellData: CalculationLog }) => {
          const logView = <LogViewButton {...cellData} />

          return logView
        },
      },
      createdIn: {
        title: formatMessage(logTableSchemaMessages.createdIn),
        minWidth: 160,
      },
      email: {
        title: formatMessage(logTableSchemaMessages.client),
        minWidth: 250,
      },
      establishment_dockName: {
        title: formatMessage(logTableSchemaMessages.dockName),
        minWidth: 120,
      },
      city: {
        title: formatMessage(logTableSchemaMessages.city),
        minWidth: 180,
      },
      state: {
        title: formatMessage(logTableSchemaMessages.state),
        minWidth: 75,
      },
      activitySector: {
        title: formatMessage(logTableSchemaMessages.activitySector),
        minWidth: 200,
      },
      numberOfProducts: {
        title: formatMessage(logTableSchemaMessages.numberOfProducts),
        minWidth: 70,
      },
      productsTotal: {
        title: formatMessage(logTableSchemaMessages.productsTotal),
        minWidth: 100,
      },
      freightTotal: {
        title: formatMessage(logTableSchemaMessages.freightTotal),
        minWidth: 100,
      },
      includedTaxes: {
        title: formatMessage(logTableSchemaMessages.includedTaxes),
        minWidth: 170,
      },
      includedTaxesTotal: {
        title: formatMessage(logTableSchemaMessages.includedTaxesTotal),
        minWidth: 140,
      },
      addedTaxes: {
        title: formatMessage(logTableSchemaMessages.addedTaxes),
        minWidth: 170,
      },
      addedTaxesTotal: {
        title: formatMessage(logTableSchemaMessages.addedTaxesTotal),
        minWidth: 140,
      },
    },
  }
}
