import React from 'react'

import { Button } from '../shared'
import { EmptyCart } from '../Icons'
import useFormatMessage from '../../i18n/useFormatMessage'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './unavailableProducts.modules.css'

interface Props {
  handleClose: () => void
}

const UnavailableProducts = ({ handleClose }: Props) => {
  return (
    <div className={styles.unavailableProductsContainer}>
      <div className={styles.unavailableProductsContent}>
        <EmptyCart
          className={styles.unavailableProductsIcon}
          fill={globalStyles.iconPrimary}
        />
        <p
          className={`${styles.unavailableProductsTextEmptyOrder} ${globalStyles.inDesktop}`}
        >
          {useFormatMessage('store/checkoutless.emptyCart.emptyOrder')}
        </p>
        <p
          className={`${styles.unavailableProductsText} ${globalStyles.inMobile}`}
        >
          {useFormatMessage('store/checkoutless.emptyCart.message')}
        </p>
        <p
          className={`${styles.unavailableProductsText} ${globalStyles.inDesktop}`}
        >
          {useFormatMessage('store/checkoutless.emptyCart.messageDeskopt')}
        </p>
        <Button
          value={'store/checkoutless.button.continue'}
          onClick={handleClose}
          secondary
        />
      </div>
    </div>
  )
}

export default UnavailableProducts
