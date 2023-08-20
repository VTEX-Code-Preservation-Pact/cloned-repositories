import React from 'react'
import styles from './CommunityCard.module.css'
import Link from '@docusaurus/Link'

function CommunityCard({ img, title, tagLine, description, linkTo }) {
  return (
    <div className={styles.communityCard}>
        <img src={img} />
        <div className={styles.communityText}>
            <h2>{title}</h2>
            <Link href={linkTo}>{tagLine}</Link>
            <p>{description}</p>
      </div>
    </div>
  )
}

export default CommunityCard
