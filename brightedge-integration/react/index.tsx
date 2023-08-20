import React, { FunctionComponent, useState, useEffect } from 'react'

import useScript from './hooks/useScriptLoader'

interface Props {
  appSettings: any
}

const BrightEdgeScript: FunctionComponent<{ accountId: string }> = ({
  accountId,
}) => {
  const [loaded, error] = useScript(
    `//cdn.bc0a.com/autopilot/${accountId}/autopilot_sdk.js`
  )

  if (!loaded || error) return null
  return null
}

const BrightEdge: FunctionComponent<Props> = ({ appSettings }) => {
  const { accountId } = appSettings
  const [shouldLoadScript, setShouldLoadScript] = useState(false)

  useEffect(() => {
    setShouldLoadScript(true)
  }, [])

  if (!accountId) return null
  return (
    <div>
      <div className="be-ix-link-block" />
      {shouldLoadScript ? <BrightEdgeScript accountId={accountId} /> : null}
    </div>
  )
}

export default BrightEdge
