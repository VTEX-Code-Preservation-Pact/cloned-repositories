import React from 'react'

import { Spinner } from '../shared'
import Style from './loadModal.css'

const LoadModal = () => {
  return (
    <div className={Style.loadModalOverlay}>
      <div className={Style.loadModalContainer}>
        <Spinner size={24} />
      </div>
    </div>
  )
}

export default LoadModal
