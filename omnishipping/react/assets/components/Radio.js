import React, { PureComponent } from 'react'

import styles from './Radio.css'

class Radio extends PureComponent {
  render() {
    return (
      <svg
        className={styles.svg}
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8zm0 14.4A6.398 6.398 0 0 1 1.6 8c0-3.536 2.864-6.4 6.4-6.4 3.536 0 6.4 2.864 6.4 6.4 0 3.536-2.864 6.4-6.4 6.4z"
          fill="#666"
        />
      </svg>
    )
  }
}

export default Radio
