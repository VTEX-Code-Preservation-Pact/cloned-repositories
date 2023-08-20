import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { Delete } from '../../Icons'
import { formatter } from '../../../utils'
import { Alert, Spinner } from '../../shared'
import Attachment from '../Attachment/AttachmentContainer'
import type { Item, Offering, Config } from '../../../interfaces'
import globalStyles from '../../../myCheckout-styles.module.css'
import styles from './item.css'

interface Props {
  item: Item
  config: Partial<Config>
  loading: boolean
  handleClick: () => void
  newSellingPrice: number
  visibleVariations: any[]
  listPriceToUse: number
  sellingPriceToUse: number
}

const Product = (props: Props) => {
  const {
    item: {
      imageUrl,
      name,
      sellingPrice,
      quantity,
      availability,
      offerings,
      bundleItems,
      isGift,
      listPrice,
      skuSpecifications,
      measurementUnit,
      unitMultiplier,
      hiddenRemove,
      hiddenUnits,
      description,
      index,
    },
    loading,
    handleClick,
    visibleVariations,
    listPriceToUse,
    sellingPriceToUse,
  } = props

  const intl = useIntl()

  return (
    <div className={`${styles.itemContainer} ${globalStyles.borderBottom}`}>
      <div className={`${styles.itemContent}`}>
        {!isGift && !loading && !hiddenRemove && (
          <div className={styles.itemDeleteContainer} onClick={handleClick}>
            <Delete
              fill={globalStyles.iconAlternative}
              background={globalStyles.iconBackground}
              backgroundSecondary={globalStyles.iconBackgroundSecondary}
            />
          </div>
        )}
        <div className={styles.itemImageContainer}>
          <img width={74} height={74} src={imageUrl} alt={name} />
          {loading && (
            <div className={styles.itemOverlaySpinner}>
              <Spinner size={24} />
            </div>
          )}
        </div>
        <div className={styles.itemRightContainer}>
          <div className={styles.itemRightMiddle}>
            <div className={styles.itemRightMiddleName}>
              {isGift && (
                <p>
                  {intl.formatMessage({
                    id: 'store/checkoutless.summary.isGift',
                  })}
                </p>
              )}
              <p>{name}</p>
              {description && <p>{description}</p>}
            </div>
            {skuSpecifications?.length > 0 && (
              <div className={styles.itemSkuSpecifications}>
                {skuSpecifications
                  ?.filter((item) => {
                    if (!visibleVariations.length) return true

                    return visibleVariations.some(
                      (v) => v.toLowerCase() === item?.fieldName?.toLowerCase()
                    )
                  })
                  .map((item, i) => (
                    <p key={i}>
                      {item.fieldName}: {item.fieldValues}{' '}
                      {skuSpecifications.length - 1 !== i && '-'}&nbsp;
                    </p>
                  ))}
              </div>
            )}
            {!isGift && !hiddenUnits && (
              <p>{`${quantity * unitMultiplier} ${measurementUnit}`}</p>
            )}
          </div>
          <div className={styles.itemPriceContainer}>
            {!isGift && (
              <Fragment>
                {listPrice > sellingPrice ? (
                  <Fragment>
                    {sellingPriceToUse > 0 && (
                      <p className={globalStyles.lineThrough}>
                        {formatter.format(listPriceToUse)}
                      </p>
                    )}

                    <p className={styles.itemPriceBold}>
                      {sellingPriceToUse > 0
                        ? formatter.format(sellingPriceToUse)
                        : 'Gratis'}
                    </p>
                  </Fragment>
                ) : (
                  <p className={styles.itemPriceBold}>
                    {sellingPriceToUse > 0
                      ? formatter.format(sellingPriceToUse)
                      : 'Gratis'}
                  </p>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
      {offerings?.map((offering: Offering) => {
        const bundleItem = bundleItems.find((item) => item.id === offering.id)

        return (
          <Attachment
            key={offering.id}
            offering={offering}
            bundleItem={bundleItem}
            index={index}
          />
        )
      })}
      {availability !== 'available' && availability !== 'cannotBeDelivered' && (
        <Alert type="warning" text="store/checkoutless.summary.unavailable" />
      )}
      {availability === 'cannotBeDelivered' && (
        <Alert
          type="warning"
          text="store/checkoutless.summary.unavailableLogistic"
        />
      )}
    </div>
  )
}

export default Product
