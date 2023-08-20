import React, { Fragment } from 'react'

import { Dropup, LiteEdit, OutlineCreate } from '../../Icons'
import type { Section } from '../../ViewValidate'
import type { Address } from '../../../interfaces'
import global from '../../../myCheckout-styles.module.css'
import styles from './editButton.css'

interface Props {
  completed: boolean
  orderSection: Section
  handleClientData: () => void
  handleShippingData: () => void
  addressAlternative: Address
  theme: string
}

const EditButton = (props: Props) => {
  const {
    completed,
    orderSection,
    handleClientData,
    addressAlternative,
    handleShippingData,
    theme,
  } = props

  return (
    <Fragment>
      {!completed ? (
        <span className={global.cursorPointer}>
          <Dropup fill={global.arrowUpIcon} />
        </span>
      ) : (
        <a
          onClick={() => {
            if (orderSection === 'clientProfileData') {
              handleClientData()
            } else if (orderSection === 'shippingData') {
              if (!addressAlternative) {
                handleShippingData()
              }
            }
          }}
        >
          <LiteEdit
            className={styles.iconEditContainer}
            fill={
              orderSection === 'shippingData' && addressAlternative
                ? '#9798a5'
                : null
            }
          />
          <OutlineCreate
            className={styles.iconCreateContainer}
            theme={theme}
            fill={
              orderSection === 'shippingData' && addressAlternative
                ? '#9798a5'
                : null
            }
          />
        </a>
      )}
    </Fragment>
  )
}

export default EditButton
