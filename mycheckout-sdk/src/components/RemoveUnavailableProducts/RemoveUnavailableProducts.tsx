import React, { Fragment } from 'react'

import styles from './removeUnavailableProducts.css'
import { Alert, Button } from '../shared'
import { MyCheckoutAnimation } from '../Animations'
import globalStyles from '../../myCheckout-styles.module.css'
import type { ItemToRemove } from '../../interfaces'
import type { ScreenToGoToCheckout } from '../../interfaces/StepsAndSections'

interface Props {
  itemsToRemove: ItemToRemove[]
  showAnimation: boolean
  screenToGoToCheckout: ScreenToGoToCheckout
  handleClick: () => void
}

export const RemoveUnavailableProducts = ({
  itemsToRemove,
  showAnimation,
  screenToGoToCheckout,
  handleClick,
}: Props) => {
  return (
    <div
      className={`${styles.removeUnavailableProductsContainer} ${
        showAnimation && styles.centerContainer
      }`}
    >
      {showAnimation ? (
        <MyCheckoutAnimation />
      ) : screenToGoToCheckout === 'removeUnavailableProducts' ? (
        <Fragment>
          <Alert
            className={globalStyles.bold}
            text="store/checkoutless.validateItems.text"
            description="store/checkoutless.validateItems.description"
            type="warning"
            hideOnClick={false}
          />

          <div className={styles.itemsContainer}>
            {itemsToRemove?.map((item: ItemToRemove) => (
              <img width={74} height={74} src={item.imageUrl} alt={item.name} />
            ))}
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              onClick={handleClick}
              value="store/checkoutless.validateItems.deleteAndContinue"
            />

            {/* <input
              className={`${styles.buttonCheckout} ${globalStyles.bold}`}
              onClick={() => window.open('/checkout', '_blank')}
              type="button"
              value={useFormatMessage(
                'store/checkoutless.validateItems.checkout'
              )}
            /> */}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Alert
            className={globalStyles.bold}
            text="store/checkoutless.multiplePackages.text"
            description="store/checkoutless.multiplePackages.description"
            type="warning"
            hideOnClick={false}
          />

          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => window.open('/checkout', '_blank')}
              value="store/checkoutless.validateItems.checkout"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
