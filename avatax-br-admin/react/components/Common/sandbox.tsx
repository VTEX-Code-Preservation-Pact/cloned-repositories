import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Checkbox } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { sandbox } from '../../utils/definedMessages'

const Sandbox: FC = () => {
  const provider = useContext(EstablishmentContext)

  const intl = useIntl()

  return (
    <>
      <div className="mt2 dib inline-flex">
        {intl.formatMessage(sandbox.environment)}

        <span
          className={
            provider.settings.sandbox
              ? 'c-warning active-c-warning ml2'
              : ' c-danger active-c-danger ml2'
          }
        >
          {provider.settings.sandbox
            ? intl.formatMessage(sandbox.sandbox)
            : intl.formatMessage(sandbox.production)}
        </span>
        <br />
        <br />
      </div>
      <div className="mb3">
        <Checkbox
          checked={provider.settings.sandbox}
          id="option-0"
          label={intl.formatMessage(sandbox.use)}
          name="default-checkbox-group"
          onChange={() =>
            provider.updateSettingsSandbox({
              sandbox: !provider.settings.sandbox,
            })
          }
          value="option-0"
        />
      </div>
    </>
  )
}

export default Sandbox
