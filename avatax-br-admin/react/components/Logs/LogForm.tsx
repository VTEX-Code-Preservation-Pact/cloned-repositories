import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Table, ButtonWithIcon } from 'vtex.styleguide'
import FileSaver from 'file-saver'
import { useIntl } from 'react-intl'

import Refresh from '../../assets/icons/refresh.png'
import LogContext from '../../context/LogContext'
import { LogTableSchema } from './LogTableSchema'
import parseLogs from './logTableParser'
import usePagination from '../../hooks/setPagination'
import { logMessages } from '../../utils/definedMessages'

export const LogForm = () => {
  const intl = useIntl()
  const context = useContext(LogContext)
  const paginationContext = usePagination(context)
  const parsedLogs = context.logs
    ? context.logs.map(parseLogs(intl.formatMessage))
    : []

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!context.loading) {
      paginationContext.setTotal(context.pagination?.total ?? 0)
    }
  }, [context.loading, context.pagination?.total, paginationContext])

  const exportLogs = () => {
    if (!context.logs) return
    const content = JSON.stringify(context.logs, null, 2)

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    })

    FileSaver.saveAs(
      blob,
      `logs_from-${paginationContext.pagination.currentItemFrom}-to-${paginationContext.pagination.currentItemTo}.json`
    )
  }

  return (
    <div className="mv6">
      <div className="flex justify-between">
        <div>{intl.formatMessage(logMessages.formCaption)}</div>
        <div className="mr2">
          <ButtonWithIcon
            onClick={() => context.refetch()}
            icon={
              <img
                src={Refresh}
                alt={intl.formatMessage(logMessages.refreshButton)}
              />
            }
            variation="tertiary"
          >
            <span className="c-on-base">
              {intl.formatMessage(logMessages.refreshButton)}
            </span>
          </ButtonWithIcon>
        </div>
      </div>
      <Table
        fullWidth
        emptyStateLabel={intl.formatMessage(logMessages.tableNoResults)}
        schema={LogTableSchema(intl.formatMessage)}
        items={parsedLogs}
        density="high"
        loading={context.loading || context.reloading}
        toolbar={{
          inputSearch: {
            value: searchTerm,
            placeholder: intl.formatMessage(logMessages.orderFilterPlaceholder),
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value ?? ''),
            onClear: () => {
              paginationContext.resetPagination()
              context.setSearchTerm('')
            },
            onSubmit: (e: ChangeEvent<HTMLInputElement>) => {
              paginationContext.resetPagination()
              context.setSearchTerm(e.target.value ?? '')
            },
          },
          fields: {
            label: intl.formatMessage(logMessages.tableFieldsCaption),
            showAllLabel: intl.formatMessage(logMessages.tableColumnsShowAll),
            hideAllLabel: intl.formatMessage(logMessages.tableColumnsHideAll),
          },
          download: {
            label: intl.formatMessage(logMessages.downloadButton),
            handleCallback: exportLogs,
          },
        }}
        pagination={{
          onNextClick: paginationContext.pagination.onNextClick,
          onPrevClick: paginationContext.pagination.onPrevClick,
          onRowsChange: paginationContext.pagination.onRowsChange,
          currentItemFrom: paginationContext.pagination.currentItemFrom,
          currentItemTo: paginationContext.pagination.currentItemTo,
          textShowRows: intl.formatMessage(logMessages.tableShowRows),
          textOf: intl.formatMessage(logMessages.tableRowsOf),
          totalItems: paginationContext.total,
          rowsOptions: [5, 10, 15, 25],
        }}
      />
    </div>
  )
}
