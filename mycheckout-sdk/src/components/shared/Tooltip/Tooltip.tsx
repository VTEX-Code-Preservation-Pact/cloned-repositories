import React from 'react'

import styles from './toolTip.css'

export const ToolTip = ({ tooltip, children }: any) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipChildren}>{children}</div>
      <div className={styles.contentTooltip}>
        {tooltip}
        <span className="arrow"></span>
      </div>
    </div>
  )
}
