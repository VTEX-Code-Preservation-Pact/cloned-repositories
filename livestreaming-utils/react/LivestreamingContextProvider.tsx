import type { AddToCartConfig } from '@nizza/player'
import type { FC } from 'react'
import React, { createContext, useMemo } from 'react'

export interface LivestreamingProps {
  addToCartConfig?: AddToCartConfig
}

export const LivestreamingContext = createContext<LivestreamingProps>({
  addToCartConfig: {},
})

LivestreamingContext.displayName = 'LivestreamingContext'

export interface LivestreamingProviderProps {
  value: LivestreamingProps
}

const LivestreamingProvider: FC<LivestreamingProviderProps> = ({
  value = {},
  children,
}) => {
  const context = useMemo(() => value, [value])

  return (
    <LivestreamingContext.Provider value={context}>
      {children}
    </LivestreamingContext.Provider>
  )
}

LivestreamingProvider.displayName = 'LivestreamingConfigProvider'

export default LivestreamingProvider
