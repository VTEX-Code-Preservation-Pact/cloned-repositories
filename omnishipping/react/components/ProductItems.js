import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants'
import React, { PureComponent } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import { fixImageUrl } from '../utils/Images'
import styles from './ProductItems.css'

export class ProductItems extends PureComponent {
  render() {
    const { items, isAvailable } = this.props

    return (
      <div className={`${styles.items} delivery-items`}>
        <ReactTooltip effect="solid" />
        {items.map(item => {
          return (
            <div className={styles.item} key={item.uniqueId}>
              <img
                alt={item.name}
                className={classNames(styles.image, 'delivery-item mr1', {
                  [`${
                    styles.unavailable
                  } delivery-item-unavailable`]: !isAvailable,
                })}
                data-tip={item.name}
                height={DEFAULT_HEIGHT}
                src={fixImageUrl(item.imageUrl)}
                width={DEFAULT_WIDTH}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

ProductItems.defaultProps = {
  isAvailable: true,
}

ProductItems.propTypes = {
  intl: intlShape,
  isAvailable: PropTypes.bool,
  items: PropTypes.array,
  itemsByPackages: PropTypes.array,
}

export default injectIntl(ProductItems)
