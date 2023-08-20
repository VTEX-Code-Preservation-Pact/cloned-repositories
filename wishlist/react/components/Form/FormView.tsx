import React from 'react'
import { isMobile } from 'react-device-detect'
import Dialog from '../Dialog/index'
import Screen from '../Screen'

import styles from '../../wishList.css'

interface FormViewProps {
  onClose: () => void
  children: JSX.Element
}

const FormView = ({ children, onClose }: FormViewProps): JSX.Element =>
  isMobile ? (
    <Screen>{children}</Screen>
  ) : (
    <Dialog onClose={onClose}>
      <div className={styles.formViewDialog}>{children}</div>
    </Dialog>
  )

export default FormView
