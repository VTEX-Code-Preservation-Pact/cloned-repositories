import React from 'react'
import ReactDOM from 'react-dom'

import styles from '../../myCheckout-styles.module.css'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Portal: (props: Props) => React.ReactPortal = ({ children }: Props) => {
  const handleClick = (e: any) => {
    e.stopPropagation()
  }

  const target = window?.document?.body

  return ReactDOM.createPortal(
    <div className={styles.Checkoutless} onClick={handleClick}>
      {children}
    </div>,
    target
  )
}

export default Portal
