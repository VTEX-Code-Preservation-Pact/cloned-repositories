import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Spinner, Alert } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import PropsTable from './components/PropsTable'
import useComponentSchema from './hooks/useComponentSchema'

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  const {
    route: {
      params: { appId, app, interfaceId },
    },
  } = useRuntime()
  console.log(appId, interfaceId)

  const { loading, error, data } = useComponentSchema(
    appId ?? app,
    interfaceId ?? blockInterface
  )

  if (loading) {
    return (
      <span className="dib c-muted-1">
        <Spinner color="currentColor" size={20} />
      </span>
    )
  }
  if (error) {
    return (
      <div className="mb5">
        <Alert type="error">
          <FormattedMessage id="docs-ui/empty-docs" />
        </Alert>
      </div>
    )
  }
  return (
    data && (
      <PropsTable fetchedProps={data.schema} fetchedMessages={data.messages} />
    )
  )
}

interface DocPropProps {
  blockInterface: string
}

export default DocProp
