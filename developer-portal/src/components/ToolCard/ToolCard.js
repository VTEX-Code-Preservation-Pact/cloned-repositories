import React from 'react'
import styles from './ToolCard.module.css'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import clsx from 'clsx'

function ToolCard({ tag, title, description, linkTo }) {
  return (
    <div className={(clsx('col'), styles.toolItem)}>
      <p className={styles.toolTag}>{tag}</p>
      <div className={styles.tool}>
        <Link to={useBaseUrl(linkTo)}>
          <div className={styles.toolContent}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
      </div>{' '}
    </div>
  )
}

export default ToolCard
