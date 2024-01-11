import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants'
import React, { PureComponent } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { translate, translateDate } from './../utils/i18nUtils'
import moment from 'moment'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { fixImageUrl } from '../utils/Images'
import { itemShape } from './../shapes/itemShape'
import styles from './PackageSummary.css'

export class PackageSummary extends PureComponent {
  render() {
    const {
      intl,
      deliveryWindow,
      packageItems,
      packagesLength,
      shippingEstimate,
    } = this.props

    const shippingEstimateString =
      shippingEstimate &&
      translate(
        intl,
        `shippingEstimate-${shippingEstimate.split(/[0-9]+/)[1]}`,
        {
          timeAmount: shippingEstimate.split(/\D+/)[0],
        }
      )

    const deliveryWindowDateString =
      deliveryWindow && translateDate(intl, deliveryWindow.startDateUtc)

    const deliveryWindowTimeString =
      deliveryWindow &&
      translate(intl, 'deliveryWindowsSummarytime', {
        startDate: moment.utc(deliveryWindow.startDateUtc).format('LT'),
        endDate: moment.utc(deliveryWindow.endDateUtc).format('LT'),
      })

    return (
      <div
        className={`${styles.package} ${
          packagesLength === 1 ? styles.packageSingle : ''
        }`}>
        <ReactTooltip effect="solid" />
        <div className={styles.top}>
          <p className={`${styles.sla} sla`}>
            {deliveryWindow ? deliveryWindowDateString : shippingEstimateString}
            {deliveryWindow && <span>{deliveryWindowTimeString}</span>}
          </p>
        </div>
        <div className={styles.items}>
          {packageItems.map(item => (
            <div className={styles.itemImgWrapper} key={item.uniqueId}>
              <img
                alt={item.name}
                className={`${styles.itemImg}`}
                data-tip={item.name}
                height={DEFAULT_HEIGHT}
                src={fixImageUrl(item.imageUrl)}
                width={DEFAULT_WIDTH}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

PackageSummary.propTypes = {
  deliveryWindow: PropTypes.object,
  intl: intlShape,
  packageItems: PropTypes.arrayOf(itemShape).isRequired,
  packagesLength: PropTypes.number.isRequired,
  shippingEstimate: PropTypes.string.isRequired,
}

export default injectIntl(PackageSummary)
