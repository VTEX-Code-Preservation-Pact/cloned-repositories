import React from 'react'

import { Info } from '../Icons'
import { ToolTip } from '../shared'

interface Props {
  message: string
  styles?: any
}

const ButtonMessage = (props: Props) => {
  const { message, styles } = props

  return (
    <div className={styles.CheckoutlessInfo}>
      <ToolTip
        tooltip={
          <div className={styles.CheckoutlessInfoMessage}>
            <div dangerouslySetInnerHTML={{ __html: message }}></div>
          </div>
        }
      >
        <Info />
      </ToolTip>
    </div>
  )
}

export default ButtonMessage
