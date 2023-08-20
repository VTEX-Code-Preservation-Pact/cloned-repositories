import type { CSSProperties, ReactElement } from 'react'
import React from 'react'

import useFormatMessage from '../../../../i18n/useFormatMessage'
import styles from '../infoItem.module.css'

export interface Props {
  children?: ReactElement | ReactElement[]
  className?: string
  style?: CSSProperties
  text?: string
  value?: string
}

export const InfoItemContent = ({
  children,
  className,
  style,
  text,
  value,
}: Props) => {
  return (
    <div className={`${styles.infoItemContent} ${className}`} style={style}>
      {text ? useFormatMessage(text) : children}
      {value}
    </div>
  )
}
