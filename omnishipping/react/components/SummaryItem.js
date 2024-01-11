import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import PropTypes from 'prop-types'
import SummaryPriceShippingEstimate from './SummaryPriceShippingEstimate'
import GiftListTitle from './GiftListTitle'
import { connect } from 'react-redux'
import { getAddress } from '../selectors/address-form-selectors'
import { getOrderFormItemsByPickup } from '../selectors/order-form-selectors'
import { hasSelectedScheduledDelivery } from '../selectors/scheduled-delivery-selectors'
import { translate } from './../utils/i18nUtils'
import {
  isPickup,
  isDelivery,
  isCurrentChannel,
} from '../utils/DeliveryChannelsUtils'
import { formatCurrency } from '../utils/Currency'
import { helpers, components } from 'vtex.address-form'
const { removeValidation } = helpers
const { AddressSummary } = components

import styles from './SummaryItem.css'

function getSelectedSla(li) {
  return li.slas.find(sla => sla.id === li.selectedSla)
}

export class SummaryItem extends Component {
  constructor() {
    super()

    this.state = { SummaryScheduledDelivery: undefined }
  }

  componentDidMount() {
    this.loadScheduledDelivery(this.props)
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.loadScheduledDelivery(nextProps)
  }

  getPackagesPrice = () => {
    const {
      logisticsInfo,
      deliveryChannel,
      storePreferencesData,
      intl,
    } = this.props

    const selectedSlas = logisticsInfo
      .filter(li => isCurrentChannel(li, deliveryChannel))
      .map(li => getSelectedSla(li))

    const deliveryWindowPrice = selectedSlas.reduce(
      (acc, sla) =>
        // Returns the highest delivery window price.
        // It is expected that the delivery window price will
        // be either 0 or the same price for all scheduled items.
        // Every scheduled item contains a delivery window price,
        // but they are not supposed to be summed up, just to be
        // picked from one scheduled item
        Math.max(sla.deliveryWindow ? sla.deliveryWindow.price : 0, acc),
      0
    )

    const value = selectedSlas.reduce(
      (acc, sla) => acc + sla.price,
      deliveryWindowPrice
    )

    const formattedPrice = formatCurrency({
      value,
      storePreferencesData,
    })

    return value === 0 ? translate(intl, 'free') : formattedPrice
  }

  loadScheduledDelivery = props => {
    if (
      !props.hasSelectedScheduledDelivery ||
      this.state.SummaryScheduledDelivery
    ) {
      return
    }
    import('./SummaryScheduledDelivery').then(SummaryScheduledDelivery => {
      this.setState({
        SummaryScheduledDelivery: SummaryScheduledDelivery.default,
      })
    })
  }

  render() {
    const {
      selectedRules,
      address,
      canEditData,
      giftRegistryData,
      groups,
      intl,
      orderFormItems,
      packages,
      deliveryChannel,
    } = this.props

    const { SummaryScheduledDelivery } = this.state
    const groupConditions =
      groups > 1 || (groups === 1 && !isDelivery(deliveryChannel))

    return (
      packages.length > 0 && (
        <div className={`shp-summary-group ${styles.group}`}>
          {groupConditions && (
            <p className={`shp-summary-group-title ${styles.title}`}>
              {isDelivery(deliveryChannel)
                ? translate(intl, 'deliverySummary')
                : translate(intl, 'pickupSummary')}
            </p>
          )}

          <div className={`shp-summary-group-content ${styles.content}`}>
            <div className={`shp-summary-group-info ${styles.info}`}>
              {isDelivery(deliveryChannel) && (
                <div className={`shp-summary-group-address ${styles.address}`}>
                  {giftRegistryData ? (
                    <GiftListTitle giftRegistryData={giftRegistryData} />
                  ) : (
                    <AddressSummary
                      address={removeValidation(address)}
                      canEditData={canEditData}
                      onClickMaskedInfoIcon={this.handleClickMaskedInfoIcon}
                      rules={selectedRules}
                    />
                  )}
                </div>
              )}

              {packages.map((pack, index) => {
                const isPickupChannel = isPickup(deliveryChannel)
                const selectedSlaObj = getSelectedSla(pack)
                const shouldShowItemsLength = groups > 1
                const shouldShowPackagesTitle = packages.length > 1

                return (
                  <Fragment
                    key={`${pack.seller}-${deliveryChannel}-${
                      pack.selectedSla
                    }-${pack.shippingEstimate}`}>
                    {isPickupChannel && (
                      <div
                        className={`shp-summary-group-title ${styles.address}`}>
                        {selectedSlaObj &&
                          selectedSlaObj.pickupStoreInfo.friendlyName}
                      </div>
                    )}

                    {!isDelivery(deliveryChannel) && (
                      <div
                        className={`shp-summary-group-address ${
                          styles.address
                        } ${styles.pickupAddress}`}>
                        {giftRegistryData ? (
                          <GiftListTitle giftRegistryData={giftRegistryData} />
                        ) : (
                          <AddressSummary
                            address={removeValidation(address)}
                            canEditData={canEditData}
                            onClickMaskedInfoIcon={
                              this.handleClickMaskedInfoIcon
                            }
                            rules={selectedRules}
                          />
                        )}
                      </div>
                    )}

                    <SummaryPriceShippingEstimate
                      index={index}
                      isPickupChannel={isPickupChannel}
                      orderFormItems={orderFormItems}
                      pack={pack}
                      selectedSlaObj={selectedSlaObj}
                      shouldShowItemsLength={shouldShowItemsLength}
                      shouldShowPackagesTitle={shouldShowPackagesTitle}
                    />

                    {selectedSlaObj.deliveryWindow &&
                      SummaryScheduledDelivery && (
                      <SummaryScheduledDelivery
                        deliveryWindow={selectedSlaObj.deliveryWindow}
                      />
                    )}
                  </Fragment>
                )
              })}
            </div>
            <div className={`shp-summary-group-price ${styles.price}`}>
              {this.getPackagesPrice()}
            </div>
          </div>
        </div>
      )
    )
  }
}

SummaryItem.propTypes = {
  address: PropTypes.object.isRequired,
  canEditData: PropTypes.bool.isRequired,
  deliveryChannel: PropTypes.string.isRequired,
  giftRegistryData: PropTypes.object,
  groups: PropTypes.number.isRequired,
  intl: intlShape,
  logisticsInfo: PropTypes.array.isRequired,
  orderFormItems: PropTypes.array.isRequired,
  packages: PropTypes.array.isRequired,
  selectedRules: PropTypes.object.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  address: getAddress(state),
  canEditData: state.orderForm.canEditData,
  giftRegistryData: state.orderForm.giftRegistryData,
  hasSelectedScheduledDelivery: hasSelectedScheduledDelivery(state),
  orderFormItems: getOrderFormItemsByPickup(state, ownProps),
  storePreferencesData: state.orderForm.storePreferencesData,
})

export default connect(mapStateToProps)(injectIntl(SummaryItem))
