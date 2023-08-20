import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Button, Alert } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { buttonAdd } from '../../utils/definedMessages'

const EstablishmentButtonAdd: FC = () => {
  const context = useContext(EstablishmentContext)

  const intl = useIntl()

  return (
    <>
      <div className="mb5">
        <span className="mr4">
          <Button
            variation="primary"
            size="large"
            onClick={() => context.saveConfigurations()}
          >
            {intl.formatMessage(buttonAdd.add)}
          </Button>
        </span>
      </div>
      {context.showAlert === true ? (
        <Alert type="success" onClose={context.handleCloseAlert}>
          {intl.formatMessage(buttonAdd.dataSave)}
        </Alert>
      ) : null}
    </>
  )
}

export default EstablishmentButtonAdd
