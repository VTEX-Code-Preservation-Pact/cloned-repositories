import React from 'react'
import { Spinner } from 'vtex.styleguide'

import styles from './styles.css'
import { Pdp } from './Pdp'
import { useStyleSettings } from '../../../hooks'
import { KuikpayModal } from './KuikpayModal'
import '../../../../../../App.global.css'

export const Body = () => {
  const { loadingStyles, componentSelected, deviceSelected } =
    useStyleSettings()

  const showModal = componentSelected === 'modal'

  return (
    <div className={styles.bodyContainer}>
      {loadingStyles ? (
        <Spinner />
      ) : (
        <div
          style={
            showModal && deviceSelected === 'mobile'
              ? { position: 'relative', width: '450px', height: '70vh' }
              : { position: 'relative', width: '100%', height: '70vh' }
          }
        >
          {!showModal && <Pdp />}
          {showModal && <KuikpayModal />}
        </div>
      )}
    </div>
  )
}
