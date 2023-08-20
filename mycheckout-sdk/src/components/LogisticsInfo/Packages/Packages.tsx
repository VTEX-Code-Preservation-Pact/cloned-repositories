/* eslint-disable no-loop-func */
import React from 'react'

import styles from '../logisticsInfo-module.css'
import DeliveryChannel from '../DeliveryChannel/DeliveryChannelContainer'
import { Button } from '../../shared'
import useFormatMessage from '../../../i18n/useFormatMessage'
import LogisticsInfo from '../LogisticsInfo'
import globalStyles from '../../../myCheckout-styles.module.css'
import { usePackagesManager } from './usePackagesManager'

interface Props {
  global: any
  isEdit: boolean
}

const Packages = (props: Props) => {
  const { isEdit } = props

  const {
    packageNumber,
    packageManager,
    deliveryChannel,
    actualItems,
    handleContinue,
    disable,
  } = usePackagesManager()

  return (
    <div>
      <div className={`${styles.packagesContainer} ${globalStyles.textBase}`}>
        <p className={globalStyles.regular}>
          {useFormatMessage('store/checkoutless.logistics.shippingSteps', {
            step: packageNumber,
          })}
        </p>
        <p className={`${globalStyles.enphasis} ${globalStyles.regular}`}>
          {deliveryChannel === 'delivery'
            ? useFormatMessage('store/checkoutless.logistics.homeDelivery')
            : useFormatMessage('store/checkoutless.logistics.pickUpInStore')}
        </p>
      </div>
      <div className={styles.imagesContainer}>
        {actualItems.map((item) => (
          <img src={item.imageUrl} key={item.id} />
        ))}
      </div>
      <DeliveryChannel />
      <LogisticsInfo />
      <div className={globalStyles.actionButtonContainer}>
        {!isEdit ? (
          <Button
            value={'store/checkoutless.button.continue'}
            onClick={() => handleContinue(packageManager[deliveryChannel])}
            disabled={!disable}
          />
        ) : (
          <div className={globalStyles.buyButtonContainer}>
            <Button
              value={'store/checkoutless.button.save'}
              onClick={() => handleContinue(packageManager[deliveryChannel])}
              disabled={!disable}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Packages
