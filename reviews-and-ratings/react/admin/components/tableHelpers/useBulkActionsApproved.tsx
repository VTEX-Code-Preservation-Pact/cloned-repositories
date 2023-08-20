import React, { useState } from 'react'
import type { IntlShape } from 'react-intl'

import { tuple } from '.'
import type { ReviewTableRowData } from '../../types'
import { tableBulkActionsMessages } from '../../utils/messages'

const useBulkActionsApproved = (
  total: number,
  setSelected: (rowData: ReviewTableRowData[]) => void,
  setIsDeletingReviews: React.Dispatch<React.SetStateAction<boolean>>,
  intl: IntlShape
  // eslint-disable-next-line max-params
) => {
  const texts = {
    secondaryActionsLabel: intl.formatMessage(tableBulkActionsMessages.more),
    // eslint-disable-next-line react/display-name
    rowsSelected: (qty: number) => (
      <p className="ma0">
        {intl.formatMessage(tableBulkActionsMessages.selectedRows)}: {qty}
      </p>
    ),
  }

  const [totalItems, setTotalItems] = useState(total)

  const main = {
    label: intl.formatMessage(tableBulkActionsMessages.deleteReview),
    handleCallback: (params: { selectedRows: ReviewTableRowData[] }) => {
      setSelected([...params.selectedRows])
      setIsDeletingReviews(true)
    },
    isDangerous: true,
  }

  return tuple([{ texts, totalItems, main }, { setTotalItems }])
}

export default useBulkActionsApproved
