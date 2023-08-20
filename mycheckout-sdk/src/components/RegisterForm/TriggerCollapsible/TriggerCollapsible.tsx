import React, { Fragment } from 'react'

import { Dropdown, Check } from '../../Icons'
import { useUserData } from '../../../contexts/UserDataProvider'
import EditButton from '../EditButton/EditButtonContainer'
import type { Section } from '../../ViewValidate'
import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import styles from './triggerCollapsible.css'

interface Props {
  text?: string
  icon?: JSX.Element
  open?: boolean
  id: Section
  show?: boolean
  validateAddressAlterAndLogistic: boolean
}

export const TriggerCollapsible = (props: Props) => {
  const {
    text,
    icon,
    open = false,
    id,
    show = true,
    validateAddressAlterAndLogistic,
  } = props

  const userData = useUserData()

  return (
    <div className={styles.triggerCollapsibleContainer}>
      <div className={styles.triggerCollapsibleInfo}>
        {icon}
        <div className={styles.triggerCollapsibleText}>
          {text && <p className={global.textXl}>{useFormatMessage(text)}</p>}
        </div>
        {(userData[id]?.completed || validateAddressAlterAndLogistic) && (
          <Check fill={global.iconSecondary} />
        )}
      </div>
      <span className={global.cursorPointer}>
        {open ? (
          <Fragment>
            {show && (
              <EditButton
                completed={userData[id]?.completed}
                orderSection={id}
              />
            )}
          </Fragment>
        ) : (
          <Dropdown fill={global.arrowDownIcon} />
        )}
      </span>
    </div>
  )
}
