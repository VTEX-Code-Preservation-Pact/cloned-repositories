import React from 'react'
import { useDispatch } from 'react-redux'

import { maximizeModal } from '../../contexts/global-context/reducers/modalSlice'
import styles from './floatingButton.css'

const FloatingButton = () => {
  const dispatchGlobal = useDispatch()

  const onClick = () => {
    localStorage.setItem('minimize_modal', 'false')
    dispatchGlobal(maximizeModal())
  }

  return (
    <span className={styles.floatButton} onClick={onClick}>
      <img
        src="https://kuikpay.vteximg.com.br/arquivos/ids/155424"
        alt="My-checkout-float-button"
      />
    </span>
  )
}

export default FloatingButton
