import React from 'react'
import styles from './StartSection.module.css'
import StartCreating from '../../../components/StartCreating/StartCreating'
import Link from '@docusaurus/Link'

const StartSection = () => {
  return (
    <section className={styles.startSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8">
            <h1 className={styles.header__title}>
              Start here to <strong>code</strong> the
              <br /> future of <strong>digital commerce.</strong>
            </h1>
            <p className={styles.header__subtitle}>
              Leverage VTEX capabilities and build first-class commerce
              experiences
            </p>

            <h2 className={styles.creatingTitle}>Start creating:</h2>
            <StartCreating />

            <div className={styles.stack}>
              <div className={styles.stack__description}>
                <h2>From Zero to Hero</h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                pellentesque consectetur porta. Vestibulum bibendum et ante ac
                condimentum. Mauris vel mollis risus.
                <button>
                  <Link to="stack/0">GET STARTED</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StartSection
