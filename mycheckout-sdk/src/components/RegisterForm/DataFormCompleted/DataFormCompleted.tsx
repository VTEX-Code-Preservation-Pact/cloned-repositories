import React from 'react'

import styles from './dataFormCompleted.css'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const DataFormCompleted = (props: Props) => {
  const { children } = props

  return <div className={styles.dataFormCompletedContainer}>{children}</div>
}

export default DataFormCompleted
