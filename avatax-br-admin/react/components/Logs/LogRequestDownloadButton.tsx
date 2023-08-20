import React from 'react'
import { ButtonWithIcon } from 'vtex.styleguide'
import FileSaver from 'file-saver'
import { useIntl } from 'react-intl'

import AvaralaIcon from '../../assets/icons/A-check_RGB.png'
import { omitTypename } from '../../utils/omitTypename'
import { logMessages } from '../../utils/definedMessages'

export const LogRequestDownloadButton = (cellData: CalculationLog) => {
  const intl = useIntl()
  const downloadRequest = () => {
    const content = JSON.stringify(
      JSON.parse(cellData.payload, omitTypename),
      null,
      2
    )

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    })

    FileSaver.saveAs(blob, `request_${cellData.createdIn}.json`)
  }

  return (
    <>
      <ButtonWithIcon
        icon={
          <img
            src={AvaralaIcon}
            alt={intl.formatMessage(logMessages.downloadRequestButton)}
          />
        }
        variation="secondary"
        onClick={downloadRequest}
      >
        {intl.formatMessage(logMessages.downloadRequestButton)}
      </ButtonWithIcon>
    </>
  )
}
