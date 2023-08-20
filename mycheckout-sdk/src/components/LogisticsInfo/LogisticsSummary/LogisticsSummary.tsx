import React, { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

import { Alert } from '../../shared'
import { Pickup, Shipping } from '../../Icons'
import InfoItem from '../../shared/InfoItem'
import globalStyles from '../../../myCheckout-styles.module.css'
import type { PackageSummaryMC } from '../../../interfaces/orderForm'
import { messages as packageMessages } from '../../../utils/packages'
import { useDeliveryPromise } from '../../../hooks/useDeliveryPromise'

interface Props {
  className?: string
  emptyCart: boolean
  packages: PackageSummaryMC[]
  isLoading: boolean
  intl: any
  onClick: () => void
  disabledAction?: boolean
  alternativeAction?: () => void
}

const LogisticsSummary = ({
  className,
  emptyCart,
  packages,
  intl,
  onClick,
  disabledAction,
  alternativeAction,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <ContentLoader
        speed={2}
        width={315}
        height={30}
        viewBox="0 0 315 30"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="15" rx="2" ry="2" width="315" height="20" />
      </ContentLoader>
    )
  }

  return (
    <Fragment>
      {emptyCart && (
        <Alert type="error" text="store/checkoutless.userInfo.noProducts" />
      )}
      {packages.length > 0 &&
        packages.map((info) => {
          const { time, textTime } = useDeliveryPromise(
            info.selectedShippingEstimate
          )

          return (
            info.deliveryChannel && (
              <InfoItem key={info.deliveryChannel} className={className}>
                <InfoItem.Icon>
                  {info.deliveryChannel === 'delivery' ? (
                    <Shipping
                      fill={globalStyles.strokeCheckiconAlternative}
                      height={24}
                      width={24}
                    />
                  ) : (
                    <Pickup fill={globalStyles.iconAlternative} />
                  )}
                </InfoItem.Icon>
                <InfoItem.Content>
                  {info.deliveryChannel === 'delivery' ? (
                    <Fragment>{`${intl.formatMessage(
                      packageMessages.homeDelivery
                    )} - ${time} ${textTime}`}</Fragment>
                  ) : (
                    <Fragment>{`${intl.formatMessage(
                      packageMessages.pickUpInStore
                    )} - ${info?.storeName}`}</Fragment>
                  )}
                </InfoItem.Content>
                <InfoItem.Edit
                  style={{ flex: 0, justifyContent: 'end' }}
                  className={globalStyles.cursorPointer}
                  onClick={onClick}
                  disabledAction={disabledAction}
                  alternativeAction={alternativeAction}
                />
              </InfoItem>
            )
          )
        })}
    </Fragment>
  )
}

export default LogisticsSummary
