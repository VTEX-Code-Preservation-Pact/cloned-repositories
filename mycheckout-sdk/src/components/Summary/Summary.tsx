import React, { Fragment } from 'react'

import { Dropdown, Dropup, MyOrder } from '../Icons'
import { Button } from '../shared'
import HeaderContainer from '../Header/HeaderContainer'
import ItemContainer from './Item/ItemContainer'
import Title from '../shared/Title'
import Totals from './Totals'
import type { Config, CustomItems, Item } from '../../interfaces'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './summary-modules.css'

interface Props {
  className?: string
  config: Partial<Config>
  isCollapsible: boolean
  items: Item[]
  itemsCustoms: Item[]
  itemsGift: Item[]
  open: boolean
  someItemUnavailable: boolean
  getCustomItem: (item: Item) => CustomItems
  handleClick: (isOpen: boolean) => void
  handleContinue: () => void
  isCustomItem: (item: Item) => boolean
}

export const Summary = ({
  className,
  isCollapsible,
  items,
  itemsCustoms,
  itemsGift,
  open,
  someItemUnavailable,
  getCustomItem,
  handleClick,
  handleContinue,
  isCustomItem,
}: Props) => {
  return (
    <div className={`${styles.summaryContainer} ${className}`}>
      <HeaderContainer
        className={globalStyles.inMobile}
        clearOrderFormProfile={() => {}}
      />
      <a
        onClick={() =>
          isCollapsible
            ? handleClick(!open)
            : !someItemUnavailable && handleContinue()
        }
        className={globalStyles.cursorPointer}
      >
        <Title className={styles.summaryTitle}>
          <Title.Item title="store/checkoutless.summary.showOrder">
            <MyOrder fill={globalStyles.iconPrimary} width={24} height={24} />
          </Title.Item>
          {open && isCollapsible ? (
            <div className={styles.summaryIconCollapsible}>
              <Dropup fill={globalStyles.iconPrimary} />
            </div>
          ) : (
            <div className={styles.summaryIconCollapsible}>
              <Dropdown fill={globalStyles.iconPrimary} />
            </div>
          )}
        </Title>
      </a>
      <div className={`${styles.summaryContainerOverflow}`}>
        <div className={styles.summaryContent}>
          {open && (
            <Fragment>
              <div className={styles.summaryItems}>
                {items?.map((item: Item, index: number) => {
                  const isSendfinish = isCustomItem(item)
                  const customItem = getCustomItem(item)

                  if (!item.isGift && !isSendfinish) {
                    return (
                      <ItemContainer
                        key={`${item.id}-${index}`}
                        item={{
                          ...item,
                          ...customItem,
                          name: customItem?.name || item.name,
                          index,
                        }}
                      />
                    )
                  }

                  return null
                })}

                {itemsGift.map((item: Item, index: number) => (
                  <ItemContainer key={item.id} item={{ ...item, index }} />
                ))}

                {itemsCustoms.map((item: Item, index: number) => (
                  <ItemContainer key={item.id} item={{ ...item, index }} />
                ))}
              </div>
              <Totals />
              {!isCollapsible && (
                <div className={styles.summaryButtonContainer}>
                  <Button
                    value={'store/checkoutless.button.continue'}
                    onClick={handleContinue}
                    secondary={true}
                    disabled={someItemUnavailable}
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
