import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Modal, Button } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { modal } from '../../utils/definedMessages'

const ModalArea: FC = (props) => {
  const context = useContext(EstablishmentContext)

  const intl = useIntl()

  async function save() {
    const showAlert = await context.saveConfigurations()

    if (showAlert) {
      alert(intl.formatMessage(modal.data))
    }
  }

  return (
    <Modal
      isOpen={context.edit}
      title={intl.formatMessage(modal.edit)}
      responsiveFullScreen
      bottomBar={
        <div className="nowrap">
          <span className="mr4">
            <Button variation="tertiary" onClick={() => context.setEdit(false)}>
              {intl.formatMessage(modal.cancel)}
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              onClick={() => {
                save()
              }}
            >
              {intl.formatMessage(modal.save)}
            </Button>
          </span>
        </div>
      }
      onClose={() => context.setEdit(false)}
    >
      {props.children}
    </Modal>
  )
}

export default ModalArea
