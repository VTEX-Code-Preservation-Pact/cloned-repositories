import type { CSSProperties, ReactElement } from 'react'
import React from 'react'

import styles from './title.css'

export interface Props {
  children: ReactElement | ReactElement[]
  className?: string
  style?: CSSProperties
}

export const Title = ({ children, className, style }: Props) => {
  return (
    <div className={`${styles.titleContainer} ${className}`} style={style}>
      {children}
    </div>
  )
}
