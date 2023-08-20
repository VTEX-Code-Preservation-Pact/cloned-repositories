import React from 'react'
import styles from './DeveloperTools.module.css'
import ToolCard from '../../../components/ToolCard/ToolCard'
import ViewAll from '../../../components/ViewAll/ViewAll'

const DeveloperTools = () => {
  return (
    <section className={styles.developerTools}>
      <div className="container">
        <div className={styles.devToolsContent}>
          <div className={styles.contentTools}>
            <ToolCard
              title="VTEX IO CLI"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              linkTo="/shopping-experiences/overview"
              tag="COMMAND LINE INTERFACE"
            />
            <ToolCard
              title="App APIs"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              linkTo="/apps/overview"
              tag="REST APIs"
            />
            <ToolCard
              title="FastStore"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              linkTo="/faststore/overview"
              tag="LIBRARIES AND UI COMPONENTS"
            />
            <ToolCard
              title="WebOps"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              linkTo="/developer-tools/webops/overview"
              tag="DEPLOYMENT PLATFORM"
            />
          </div>
          <div className={styles.contentTitle}>
            <div>
              <h3>
                Get up and running with our APIs, libraries, and other developer
                tools.
              </h3>
              <ViewAll 
              message="View all" 
              linkTo="/developer-tools/overview"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeveloperTools
