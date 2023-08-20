import type { CSSProperties } from 'react'
import React, { useContext } from 'react'

import { LiteEdit } from '../../../Icons'
import globalStyles from '../../../../myCheckout-styles.module.css'
import styles from '../infoItem.module.css'
import { InfoItemContext } from '../InfoItem'

export interface Props {
  className?: string
  style?: CSSProperties
  onClick: () => void
  icon?: JSX.Element
  disabledAction?: boolean
  alternativeAction?: () => void
}

export const InfoItemEdit = ({
  className,
  style,
  onClick,
  icon,
  disabledAction,
  alternativeAction,
}: Props) => {
  const { disabled } = useContext(InfoItemContext)

  const handleClick = () => {
    if (disabledAction) {
      if (alternativeAction) alternativeAction()

      return
    }

    if (!onClick) return
    onClick()
  }

  return disabled ? null : (
    <div
      onClick={handleClick}
      className={`${styles.infoItemContent} ${className}`}
      style={style}
    >
      {icon || (
        <LiteEdit
          fill={
            disabledAction
              ? globalStyles.iconDisable
              : globalStyles.iconAlternative
          }
        />
      )}
    </div>
  )
}
