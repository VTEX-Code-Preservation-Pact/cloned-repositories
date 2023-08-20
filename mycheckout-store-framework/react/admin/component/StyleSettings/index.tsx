import React from 'react'

import { StyleSettingsProvider } from './hooks'
import { Preview, Menu } from './components'
import styles from './styles.css'

const StyleSettings = () => {
  return (
    <StyleSettingsProvider>
      <div className={styles.StyleSettingsContainer}>
        <div className={styles.StyleSettingsContent}>
          <div className={styles.StyleSettingsPreview}>
            <Preview />
          </div>

          <div className={styles.StyleSettingsMenu}>
            <Menu />
          </div>
        </div>
      </div>
    </StyleSettingsProvider>
  )
}

export default StyleSettings
