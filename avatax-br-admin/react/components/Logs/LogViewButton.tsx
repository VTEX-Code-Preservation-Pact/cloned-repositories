import React, { useState } from 'react'
import { ButtonWithIcon, Modal } from 'vtex.styleguide'
import ReactJson from 'react-json-view'
import { useIntl } from 'react-intl'

import Info from '../../assets/icons/info.png'
import { omitTypename } from '../../utils/omitTypename'
import { logMessages } from '../../utils/definedMessages'
import { LogRequestDownloadButton } from './LogRequestDownloadButton'

export const LogViewButton = (cellData: CalculationLog) => {
  const intl = useIntl()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <ButtonWithIcon
        icon={
          <img src={Info} alt={intl.formatMessage(logMessages.detailsButton)} />
        }
        variation="tertiary"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal centered isOpen={isModalOpen} onClose={handleModalToggle}>
        <div className="flex flex-column mt4">
          <div className="flex justify-between mb4 items-center">
            <h2>{intl.formatMessage(logMessages.detailsCaption)}</h2>
            <LogRequestDownloadButton {...cellData} />
          </div>
          <ReactJson
            src={JSON.parse(
              JSON.stringify({
                ...cellData,
                payload: JSON.parse(cellData.payload, omitTypename),
              }),
              omitTypename
            )}
            iconStyle="square"
            displayDataTypes={false}
            name={false}
            displayObjectSize={false}
          />
        </div>
      </Modal>
    </>
  )
}
