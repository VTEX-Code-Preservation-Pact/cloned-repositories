import React from 'react'
import { useIntl } from 'react-intl'

import type { CustomSubTotalItems } from '../../../interfaces'
import { formatter } from '../../../utils'
import { ExclusivePromotions } from './ExclusivePromotions'
import styles from './totals.css'

interface Props {
  config: any
  customSubTotalItems: CustomSubTotalItems[]
  discounts: any
  exclusivePromotion: any
  hideDiscount: boolean
  items: any
  shipping: any
  subtotal: any
  subtotalExcludePrice: any
  tax: any
  totalOfferings: number
  value: number
}

export const Totals = ({
  customSubTotalItems,
  discounts,
  exclusivePromotion,
  hideDiscount,
  items,
  shipping,
  subtotal,
  tax,
  totalOfferings,
  value,
}: Props) => {
  const intl = useIntl()

  return (
    <div className={styles.totalsContainer}>
      <div className={styles.totalsLabelsContainer}>
        {!Number.isNaN(items) && items !== undefined && (
          <p className={styles.totalsLabel}>
            {intl.formatMessage({ id: 'store/checkoutless.summary.subtotal' })}
          </p>
        )}
        {!Number.isNaN(shipping) && shipping !== undefined && (
          <p className={styles.totalsLabel}>
            {intl.formatMessage({
              id: 'store/checkoutless.summary.shipping',
            })}
          </p>
        )}
        {!Number.isNaN(tax) && tax !== undefined && (
          <p className={styles.totalsLabel}>
            {intl.formatMessage({ id: 'store/checkoutless.summary.taxes' })}
          </p>
        )}
        {customSubTotalItems.length
          ? customSubTotalItems.map((custom, index) => {
              return (
                <p key={index} className={styles.totalsLabel}>
                  {custom.name}
                </p>
              )
            })
          : null}

        {!Number.isNaN(discounts) && discounts !== undefined && (
          <p className={styles.totalsLabel}>
            {intl.formatMessage({
              id: 'store/checkoutless.summary.discounts',
            })}
          </p>
        )}
        {!hideDiscount && (
          <div className={styles.totalsDiscounts}>
            {exclusivePromotion?.map((promotion: any, index: number) =>
              ExclusivePromotions({ text: promotion.name, key: index })
            )}
          </div>
        )}
        <p className={styles.totalsLabel}>
          {intl.formatMessage({ id: 'store/checkoutless.summary.total' })}
        </p>
      </div>
      <div className={styles.totalsValues}>
        {!Number.isNaN(items) && items !== undefined && (
          <p className={styles.totalsLabel}>{formatter.format(subtotal)}</p>
        )}
        {!Number.isNaN(shipping) && shipping !== undefined && (
          <p className={styles.totalsLabel}>{formatter.format(shipping)}</p>
        )}
        {!Number.isNaN(tax) && tax !== undefined && (
          <p className={styles.totalsLabel}>{formatter.format(tax)}</p>
        )}
        {customSubTotalItems.length
          ? customSubTotalItems.map((custom, index) => {
              return (
                <p key={index} className={styles.totalsLabel}>
                  {formatter.format(custom.value)}
                </p>
              )
            })
          : null}

        {!Number.isNaN(discounts) && discounts !== undefined && (
          <p className={styles.totalsLabel}>{formatter.format(discounts)}</p>
        )}
        {!hideDiscount && (
          <div className={styles.totalsDiscounts}>
            {exclusivePromotion?.map((promotion: any, index: number) =>
              ExclusivePromotions({
                text: promotion.value,
                isGift: promotion.isGift,
                key: index,
              })
            )}
          </div>
        )}

        <p className={styles.totalsLabel}>
          {value !== 0
            ? formatter.format(value + totalOfferings)
            : intl.formatMessage({
                id: 'store/checkoutless.summary.undefinedTotal',
              })}
        </p>
      </div>
    </div>
  )
}
