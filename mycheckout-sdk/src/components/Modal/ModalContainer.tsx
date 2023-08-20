import React from 'react'

import { Modal } from './Modal'
import { useModal } from './useModal'
import type { InitialProps } from '../../interfaces'

const ModalContainer = (props: InitialProps) => {
  const modal = useModal(props)

  return <Modal {...modal} {...props} />
}

export default ModalContainer
