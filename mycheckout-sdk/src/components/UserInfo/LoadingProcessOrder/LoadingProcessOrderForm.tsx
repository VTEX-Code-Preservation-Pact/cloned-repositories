import React, { Fragment } from 'react'

import useFormatMessage from '../../../i18n/useFormatMessage'
import { formatter } from '../../../utils'
import { LocationIcon, Shipping, Store } from '../../Icons'
import type { ChangeLogistics, PackageSummary } from '../../../interfaces'
import global from '../../../myCheckout-styles.module.css'
import styles from './loadingProcessOrder.module.css'
import type { AddressMC } from '../../../interfaces/orderForm'

interface Props {
  summaryChangeLogistics: ChangeLogistics[]
  packagesSummary: PackageSummary[]
  selectedAddress: AddressMC
  total: number
}

const LoadingProcessOrder = ({
  summaryChangeLogistics,
  packagesSummary,
  selectedAddress,
  total,
}: Props) => {
  return (
    <div className={styles.loadingOrderContainer}>
      <div className={styles.loadingOrderContent}>
        <div className={styles.imageOrderContainer}>
          <span className={styles.imageOrder}></span>
        </div>
        <h2>{useFormatMessage('store/checkoutless.register.pay.loading')}</h2>

        <hr />

        {packagesSummary?.map((logistic, index) => {
          const { deliveryType, selectedSla, storeInfo } = logistic
          const changeDelivery = summaryChangeLogistics?.[index]

          return (
            <div className={styles.wrapperInfoOrder}>
              <div>
                <p className={global.semiBold}>
                  {useFormatMessage(
                    'store/checkoutless.logistics.endingOrderPackages',
                    {
                      package: index + 1,
                      length: packagesSummary.length,
                    }
                  )}
                </p>

                <p className={`${global.enphasis} ${global.semiBold}`}>
                  {deliveryType === 'delivery'
                    ? useFormatMessage(
                        'store/checkoutless.logistics.homeDelivery'
                      )
                    : useFormatMessage(
                        'store/checkoutless.logistics.pickUpInStore'
                      )}
                </p>
              </div>
              {deliveryType === 'delivery' && (
                <Fragment>
                  <div className={styles.containerInfoOrder}>
                    <LocationIcon fill={global.iconPrimary} />
                    <p>
                      {`${selectedAddress?.street} ${selectedAddress?.city} - ${selectedAddress?.state}`}
                    </p>
                  </div>
                  <div className={styles.containerInfoOrder}>
                    <Shipping
                      fill={global.iconAlternativeStrokeSecondary}
                      strokeWidth={1.5}
                    />
                    <p>
                      {useFormatMessage(
                        'store/checkoutless.register.pay.delivery'
                      )}
                      {changeDelivery?.scheduleDelivery?.day &&
                      changeDelivery?.scheduleDelivery?.timeRange ? (
                        <Fragment>
                          <br />
                          {changeDelivery?.scheduleDelivery?.day} |{' '}
                          {changeDelivery?.scheduleDelivery?.timeRange}
                        </Fragment>
                      ) : (
                        selectedSla
                      )}
                    </p>
                  </div>
                </Fragment>
              )}

              {deliveryType === 'pickup-in-point' && (
                <Fragment>
                  <div className={styles.containerInfoOrder}>
                    <Store fill={global.strokeCheckicon} />
                    <p>
                      {useFormatMessage(
                        'store/checkoutless.register.pay.pickup-point'
                      )}{' '}
                      {storeInfo}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          )
        })}

        <div className={styles.totals}>
          <p className={global.bold}>
            {useFormatMessage('store/checkoutless.register.pay.total')}{' '}
            {formatter.format(total)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingProcessOrder
