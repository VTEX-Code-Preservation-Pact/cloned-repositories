import React, { useMemo } from 'react'

import { Loading } from '../../Icons'
import styles from './spinner.css'

interface SpinnerProps {
  size: number
}

const Spinner = ({ size = 50 }: SpinnerProps) => {
  return useMemo(
    () => (
      <div
        className={styles.spinner}
        style={{
          width: size,
          height: size,
          margin: 'auto',
        }}
      >
        <Loading />
      </div>
    ),
    []
  )
}

export default Spinner
