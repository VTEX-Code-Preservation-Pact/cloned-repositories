import React, { FC, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Toggle } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import setTaxConfigurationMutation from '../../queries/setTaxConfiguration.gql'
import getTaxConfiguration from '../../queries/getTaxConfiguration.gql'
import { toggle } from '../../utils/definedMessages'

const ToggleArea: FC = () => {
  const intl = useIntl()

  const [initialState, setState] = useState(Boolean)

  const { data, loading } = useQuery<GetTaxConfiguration>(getTaxConfiguration)

  const [taxConfiguration] = useMutation<SetTaxConfiguration>(
    setTaxConfigurationMutation
  )

  useEffect(() => {
    setState(
      (data?.getTaxConfiguration?.url ?? '')
        .replace('master--', '')
        .includes(window.location.origin) ?? false
    )
  }, [data])

  if (loading)
    return <div className="dib">{intl.formatMessage(toggle.loading)}</div>

  const activateDeactivate = async () => {
    const operations = initialState ? 'deactivate' : 'activate'

    await taxConfiguration({ variables: { operation: operations } })

    setState(!initialState)
  }

  return (
    <>
      {intl.formatMessage(toggle.status)}
      <br />
      <br />
      <div className="dib">
        <Toggle
          label={
            initialState
              ? intl.formatMessage(toggle.activate)
              : intl.formatMessage(toggle.deactivate)
          }
          semantic
          checked={initialState}
          onChange={activateDeactivate}
        />
      </div>
    </>
  )
}

export default ToggleArea
