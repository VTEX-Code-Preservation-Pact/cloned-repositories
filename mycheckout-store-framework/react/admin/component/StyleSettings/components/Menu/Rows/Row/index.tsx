import React from 'react'
import { useIntl } from 'react-intl'

import styles from './styles.css'

interface Props {
  label: { id: string }
  children: JSX.Element
}

export const Row = ({ label, children }: Props) => {
  const { formatMessage } = useIntl()

  return (
    <div className={styles.rowContainer}>
      <h4 className={styles.rowLabel}>{formatMessage(label)}</h4>
      <div className={styles.rowChildrenContainer}>{children}</div>
    </div>
  )
}
