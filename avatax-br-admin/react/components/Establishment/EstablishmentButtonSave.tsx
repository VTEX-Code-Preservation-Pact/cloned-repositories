import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { buttonSave } from '../../utils/definedMessages'

const EstablishmentButtonSave: FC = () => {
  const context = useContext(EstablishmentContext)

  const intl = useIntl()

  return (
    <div className="mb5">
      <span className="mr4">
        <Button
          variation="primary"
          size="large"
          onClick={() => context.saveConfigurations()}
        >
          {intl.formatMessage(buttonSave.save)}
        </Button>
      </span>
    </div>
  )
}

export default EstablishmentButtonSave
