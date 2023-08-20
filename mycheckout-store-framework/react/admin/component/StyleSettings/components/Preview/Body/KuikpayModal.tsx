import React from 'react'
import { KuikpayModalPreview } from 'kuikpay-sdk'

import { useKuikpayModal } from '../../../hooks'
import styles from './styles.css'

export const KuikpayModal = () => {
  const { isMobile, refModal } = useKuikpayModal()

  return (
    <div
      ref={refModal}
      className={`${styles.modalContainerDesktop} ${
        isMobile && styles.modalContainerMobile
      }`}
    >
      <KuikpayModalPreview />
    </div>
  )
}
