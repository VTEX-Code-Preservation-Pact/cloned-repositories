import type { CSSProperties, ReactElement } from 'react'
import React from 'react'

import styles from '../infoItem.module.css'

export interface Props {
  children: ReactElement | ReactElement[]
  className?: string
  style?: CSSProperties
}

export const InfoItemIcon = ({ children, className, style }: Props) => {
  return (
    <div className={`${styles.infoItemIcon} ${className}`} style={style}>
      {children}
    </div>
  )
}
