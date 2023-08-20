import type { CSSProperties, ReactElement } from 'react'
import React from 'react'

import useFormatMessage from '../../../../i18n/useFormatMessage'
import styles from '../title.css'

export interface Props {
  children?: ReactElement | ReactElement[]
  className?: string
  isPrimary?: boolean
  style?: CSSProperties
  title: string
}

export const TitleItem = ({
  children,
  className,
  isPrimary = true,
  style,
  title,
}: Props) => {
  return (
    <div className={`${styles.titleContent} ${className}`} style={style}>
      <div className={styles.titleIcon}>{children}</div>
      <div className={isPrimary ? styles.titlePrimary : styles.titleSecondary}>
        <span>{useFormatMessage(title)}</span>
      </div>
    </div>
  )
}
