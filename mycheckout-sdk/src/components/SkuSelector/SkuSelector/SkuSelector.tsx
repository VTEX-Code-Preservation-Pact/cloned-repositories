import React from 'react'
import { pathOr } from 'ramda'

import { isColor } from '../utils'
import useFormatMessage from '../../../i18n/useFormatMessage'
import styles from './skuItem.module.css'
import Carousel from '../../shared/Carousel'

interface Props {
  variationList: unknown[]
  isAvailableVariation: (variation: any, position: number) => number | boolean
  isSelected: (variation: any) => boolean
  onChangeSelector: (variation: any, index: number) => void
}

const SkuSelector = ({
  variationList,
  isAvailableVariation,
  isSelected,
  onChangeSelector,
}: Props) => {
  return (
    <Carousel data={variationList}>
      <Carousel.Item>
        <div className={styles.skuItemContainer}>
          {variationList.map((variation: any, index: number) => {
            const variationsElements = pathOr([], ['variations'], variation)

            return (
              <div className={styles.skuItemContent} key={index}>
                <p>{`${useFormatMessage('store/checkoutless.text.select')} ${
                  variation?.name
                }:`}</p>
                <div className={styles.skuItemVariatonContent}>
                  {variationsElements.map((v, i) => {
                    const imageUrl = pathOr(
                      '',
                      ['elements', 0, 'images', 0, 'imageUrl'],
                      v
                    )

                    const selected = isSelected(v)
                    const isAvailable = isAvailableVariation(v, index)
                    const renderImage = isColor(variation?.name) && imageUrl

                    return (
                      <div
                        className={`${styles.skuItemVariatonItem} ${
                          selected ? styles.skuItemVariatonItemSelected : null
                        } ${
                          !isAvailable
                            ? styles.skuItemVariatonItemDisabled
                            : null
                        }`}
                        onClick={() =>
                          isAvailable && onChangeSelector(v, index)
                        }
                        key={`${v?.variation}-${i}`}
                      >
                        {renderImage ? (
                          <img
                            src={imageUrl}
                            className={styles.skuItemVariatonItemImg}
                          />
                        ) : (
                          v?.variation
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default SkuSelector
