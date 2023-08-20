import React, { FC, SyntheticEvent, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'
import { ping } from '../../utils/definedMessages'

const Ping: FC = () => {
  const provider = useContext(EstablishmentContext)

  const intl = useIntl()

  return (
    <>
      <div className="mt2 dib inline-flex">
        {intl.formatMessage(ping.verify)}
        <span
          className={
            provider.ping === 1
              ? 'active-c-success c-success ml2'
              : ' c-danger active-c-danger ml2'
          }
        >
          {provider.ping === 0
            ? ''
            : provider.ping === 1
            ? intl.formatMessage(ping.true)
            : intl.formatMessage(ping.false)}
        </span>
        <br />
        <br />
      </div>
      <div className="mb3">
        <Button
          onClick={(e: SyntheticEvent) => {
            e.preventDefault()
            provider.verifyPing()
          }}
        >
          {intl.formatMessage(ping.verifyButton)}
        </Button>
      </div>
    </>
  )
}

export default Ping
