import React, { FunctionComponent } from 'react'

export const Link:FunctionComponent<{to: string}> = ({ to, children }) => {
  return <a href={to}>{children}</a>
}

export const useOwnerBlockCssHandles = (handles: string[]) => {
  return handles.reduce<Record<string, string>>((acc, handle) => {
    acc[handle] = handle
    return acc
  }, {})
}