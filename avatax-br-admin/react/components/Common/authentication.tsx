import React, { FC, SyntheticEvent, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Input, InputPassword, Button } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { authentication } from '../../utils/definedMessages'

const Authentication: FC = () => {
  const provider = useContext(EstablishmentContext)

  const intl = useIntl()

  return (
    <>
      <div className="w-40">
        {' '}
        {intl.formatMessage(authentication.authentication)}
        <br />
        <br />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-column w-100">
          <div className="mb5">
            <Input
              label={intl.formatMessage(authentication.clientId)}
              value={provider.settings.clientId}
              size="regular"
              readOnly={!provider.change}
              onChange={(event: any) => {
                provider.updateSettings({ clientId: event.target.value })
              }}
            />
          </div>
          <div className="mb5">
            <InputPassword
              label={intl.formatMessage(authentication.clientSecret)}
              value={provider.settings.clientSecret}
              size="regular"
              readOnly={!provider.change}
              onChange={(event: any) => {
                provider.updateSettings({ clientSecret: event.target.value })
              }}
            />
          </div>
        </div>
        <div className="flex flex-column  w-100 ">
          <span className="mt9 ml8">
            <Button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault()
                provider.changeSettings()
              }}
            >
              {!provider.change
                ? intl.formatMessage(authentication.change)
                : intl.formatMessage(authentication.save)}
            </Button>
          </span>
        </div>
      </div>
    </>
  )
}

export default Authentication
