import React, { Fragment } from 'react'

import type { BundleItem, Offering } from '../../../interfaces'
import { Button } from '../../shared'
import { Delete, Verified } from '../../Icons'
import { formatter } from '../../../utils'
import global from '../../../myCheckout-styles.module.css'
import styles from './attachment.css'

interface Props {
  offering: Offering
  bundleItem: BundleItem
  index: number
  handleAdd: () => void
  handleDelete: () => void
}

const Attachment = (props: Props) => {
  const { bundleItem, offering, handleAdd, handleDelete } = props

  return (
    <Fragment>
      {bundleItem ? (
        <div className={`${styles.attachmentContainer}`}>
          <div className={styles.attachmentDelete}>
            <div onClick={handleDelete}>
              <Delete
                fill={global.iconSecondary}
                background={global.iconBackground}
                backgroundSecondary={global.iconBackgroundSecondary}
              />
            </div>
          </div>
          <div className={styles.attachmentImageContainer}>
            <img
              className={styles.attachmentImage}
              src={'https://kuikpay.vteximg.com.br/arquivos/ids/155417'}
              alt={bundleItem.name}
            />
          </div>
          <div className={styles.attachmentContent}>
            <div className={styles.attachmentMiddle}>
              <div className={styles.attachmentName}>
                <p className={styles.attachmentText}>{bundleItem.name}</p>
              </div>
            </div>
            <div className={styles.attachmentPriceContent}>
              <p className={styles.attachmentPrice}>
                {formatter.format(bundleItem.price / 100)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.attachmentOffering}>
          <div>
            <Verified />
          </div>
          <div className={styles.attachmentInfo}>
            <p className={styles.attachmentPrice}>
              {offering.name} - {formatter.format(offering.price / 100)}
            </p>
          </div>
          <div className={styles.attachmentButton}>
            <Button
              onClick={handleAdd}
              value="store/checkoutless.attachment.add"
            />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Attachment
