import type { CSSProperties, ReactElement } from 'react'
import React, { createContext } from 'react'

import type { InfoItemContextProps } from '../interfaces/interfaces'
import styles from './infoItem.module.css'

export interface Props {
  children: ReactElement | ReactElement[]
  className?: string
  disabled?: boolean
  style?: CSSProperties
  firstAction?: () => void
}

export const InfoItemContext = createContext({} as InfoItemContextProps)
const { Provider } = InfoItemContext

export const InfoItem = ({
  children,
  className,
  disabled = false,
  style,
  firstAction,
}: Props) => {
  return (
    <Provider value={{ disabled }}>
      <div
        className={`${styles.infoItemContainer} ${className}`}
        style={style}
        onClick={() => {
          firstAction && firstAction()
        }}
      >
        {children}
      </div>
    </Provider>
  )
}
