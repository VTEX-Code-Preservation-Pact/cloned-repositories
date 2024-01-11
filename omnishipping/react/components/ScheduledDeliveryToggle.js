import React, { Component } from 'react'
import classNames from 'classnames'
import {
  changeActiveSLAOption,
  changeActiveTab,
  selectScheduledDelivery,
  toggleScheduledDelivery,
} from '../actions/order-form-actions'
import { setAditionalShippingData } from '../actions/component-activity-actions'
import {
  getAddress,
  getSearchAddress,
} from '../selectors/address-form-selectors'
import {
  getScheduledDeliveries,
  getScheduledDeliveryAmount,
  getScheduledDeliveryCheapestPrice,
  hasAllItemsSelectedScheduledDeliveries,
  hasLIWithOnlyScheduledDelivery,
  hasSelectedDeliveryWindow,
  shouldShowScheduledDeliveryOptions,
} from '../selectors/scheduled-delivery-selectors'
import { injectIntl, intlShape } from 'react-intl'

import ProductItems from './ProductItems'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getChannelItemsAmount } from '../selectors/delivery-selectors'
import { storePreferencesDataShape } from './../shapes/leanShippingOptionGroupShape'
import styles from './ScheduledDeliveryToggle.css'
import { translate } from '../utils/i18nUtils'
import ToggleIcon from '../assets/components/ToggleIcon'
import RadioSelected from '../assets/components/RadioSelected'
import LeanShippingOption from './LeanShippingOption'
import ScheduledDelivery from './ScheduledDelivery'

export class ScheduledDeliveryToggle extends Component {
  constructor(props) {
    super(props)

    const isActiveFromStore = props.isScheduledDeliveryActive

    const innerConditionToActivateToggle =
      props.hasAllItemsSelectedScheduledDeliveries ||
      props.hasSelectedDeliveryWindow ||
      props.hasLIWithOnlyScheduledDelivery

    const isActive = isActiveFromStore || innerConditionToActivateToggle

    props.toggleScheduledDelivery(isActive)
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const residentialId = this.props.addressFormResidentialId
    const addressChanged = nextProps.addressFormResidentialId !== residentialId

    if (addressChanged) {
      this.props.toggleScheduledDelivery(false)
      this.props.setAditionalShippingData({
        isScheduledDeliveryActive: false,
      })
    }
  }

  updateSLAOption = id => {
    this.props.changeActiveSLAOption({ slaOption: id })
    this.props.setAditionalShippingData({
      selectedLeanShippingOption: id,
    })
  }

  handleClick = () => {
    const {
      selectScheduledDelivery,
      hasLIWithOnlyScheduledDelivery,
      isScheduledDeliveryActive,
      setAditionalShippingData,
      toggleScheduledDelivery,
    } = this.props

    if (hasLIWithOnlyScheduledDelivery) {
      return
    }

    selectScheduledDelivery(!isScheduledDeliveryActive)

    toggleScheduledDelivery(!isScheduledDeliveryActive)
    setAditionalShippingData({
      isScheduledDeliveryActive: !isScheduledDeliveryActive,
    })
  }

  findFirstScheduledItemWithLength(scheduledDeliveryItemsBySeller) {
    const someScheduledDeliveryWithLength =
      scheduledDeliveryItemsBySeller &&
      scheduledDeliveryItemsBySeller.find(scheduledDelivery =>
        scheduledDelivery.selectedScheduledDeliveries.find(
          scheduledDelivery => {
            return scheduledDelivery.items.length > 0
          }
        )
      )

    if (!someScheduledDeliveryWithLength) {
      return scheduledDeliveryItemsBySeller && scheduledDeliveryItemsBySeller[0]
    }

    return someScheduledDeliveryWithLength
  }

  hasAvailableDeliveryWindow = scheduledDelivery => {
    const { selectedScheduledDelivery } = scheduledDelivery

    return (
      selectedScheduledDelivery &&
      selectedScheduledDelivery.availableDeliveryWindows.length > 0
    )
  }

  render() {
    const {
      activeScheduledDelivery,
      channel,
      deliveryItemsAmount,
      hasLIWithOnlyScheduledDelivery,
      intl,
      isScheduledDeliveryActive: isActive,
      scheduledDeliveryItemsBySeller,
      shouldUpdateUi,
      shouldShowScheduledDeliveryOptions,
      storePreferencesData,
    } = this.props

    const firstScheduledItemWithLength = this.findFirstScheduledItemWithLength(
      scheduledDeliveryItemsBySeller
    )

    const scheduledDeliveryString = translate(
      intl,
      firstScheduledItemWithLength &&
      firstScheduledItemWithLength.items &&
      firstScheduledItemWithLength.items.length !== deliveryItemsAmount
        ? 'scheduledDeliveryPartial'
        : 'scheduledDeliveryAll',
      {
        amount:
          scheduledDeliveryItemsBySeller &&
          firstScheduledItemWithLength.items &&
          firstScheduledItemWithLength.items.length,
      }
    )

    return (
      <div className={styles.scheduledDeliveryList}>
        <div
          className={classNames({
            [`${styles.schedule} ${styles.scheduleActive}`]: isActive,
            [styles.schedule]: !isActive,
          })}
          id={`scheduled-delivery-${channel}`}
          onClick={this.handleClick}>
          {hasLIWithOnlyScheduledDelivery ? (
            <div className={styles.radioSelected}>
              <RadioSelected />
            </div>
          ) : (
            <ToggleIcon isActive={isActive} />
          )}
          <p>{scheduledDeliveryString}</p>
        </div>
        {isActive &&
          shouldShowScheduledDeliveryOptions &&
          scheduledDeliveryItemsBySeller.map((scheduledDelivery, index) => (
            <div
              className={styles.scheduledDeliveryOptionsWrapper}
              key={`${scheduledDelivery.selectedSla}-${index}`}>
              {scheduledDelivery.slas.map(sla => (
                <div key={sla.id}>
                  <LeanShippingOption
                    option={sla}
                    optionsLength={scheduledDelivery.slas.length}
                    selectedSla={activeScheduledDelivery}
                    shouldUpdateUi={shouldUpdateUi}
                    storePreferencesData={storePreferencesData}
                    updateSLAOption={this.updateSLAOption}
                    leanShipping={false}
                  />
                </div>
              ))}
            </div>
          ))}
        {isActive &&
          scheduledDeliveryItemsBySeller &&
          scheduledDeliveryItemsBySeller.map(scheduledDelivery =>
            scheduledDelivery.selectedScheduledDeliveries.map((sd, index) => (
              <div key={`${sd.seller.id}-${sd.selectedScheduledDelivery.id}`}>
                <div className={styles.datepicker}>
                  {this.hasAvailableDeliveryWindow(sd) && (
                    <ScheduledDelivery
                      sla={sd.selectedScheduledDelivery}
                      previousHasSelectedWindow={sd.previousHasSelectedWindow}
                    />
                  )}
                  <div className={styles.productItems}>
                    <ProductItems items={sd.items} />
                  </div>
                </div>
                {index + 1 !==
                  scheduledDelivery.selectedScheduledDeliveries.length && (
                  <hr className={styles.scheduledDeliverySeparator} />
                )}
              </div>
            ))
          )}
      </div>
    )
  }
}

ScheduledDeliveryToggle.propTypes = {
  activeDeliveryChannel: PropTypes.string.isRequired,
  activeScheduledDelivery: PropTypes.string,
  address: PropTypes.object.isRequired,
  addressFormResidentialId: PropTypes.string.isRequired,
  canEditData: PropTypes.bool.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
  changeActiveSLAOption: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  deliveryItemsAmount: PropTypes.number.isRequired,
  hasAllItemsSelectedScheduledDeliveries: PropTypes.bool.isRequired,
  hasLIWithOnlyScheduledDelivery: PropTypes.bool.isRequired,
  hasSelectedDeliveryWindow: PropTypes.bool.isRequired,
  intl: intlShape,
  isScheduledDeliveryActive: PropTypes.bool.isRequired,
  scheduledDeliveryAmount: PropTypes.number.isRequired,
  scheduledDeliveryCheapestPrice: PropTypes.number.isRequired,
  scheduledDeliveryItemsBySeller: PropTypes.array.isRequired,
  searchAddress: PropTypes.object.isRequired,
  selectScheduledDelivery: PropTypes.func.isRequired,
  setAditionalShippingData: PropTypes.func.isRequired,
  shouldUpdateUi: PropTypes.bool.isRequired,
  shouldShowScheduledDeliveryOptions: PropTypes.bool.isRequired,
  storePreferencesData: storePreferencesDataShape.isRequired,
  toggleScheduledDelivery: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  activeScheduledDelivery: state.delivery.activeScheduledDelivery,
  shouldShowScheduledDeliveryOptions: shouldShowScheduledDeliveryOptions(state),
  address: getAddress(state),
  addressFormResidentialId: state.addressForm.residentialId,
  activeDeliveryChannel: state.componentActivity.activeDeliveryChannel,
  isScheduledDeliveryActive: state.delivery.isScheduledDeliveryActive,
  canEditData: state.orderForm.canEditData,
  deliveryItemsAmount: getChannelItemsAmount(state, ownProps),
  hasAllItemsSelectedScheduledDeliveries: hasAllItemsSelectedScheduledDeliveries(
    state,
    ownProps
  ),
  hasSelectedDeliveryWindow: hasSelectedDeliveryWindow(state, ownProps),
  scheduledDeliveryAmount: getScheduledDeliveryAmount(state, ownProps),
  searchAddress: getSearchAddress(state),
  scheduledDeliveryCheapestPrice: getScheduledDeliveryCheapestPrice(
    state,
    ownProps
  ),
  scheduledDeliveryItemsBySeller: getScheduledDeliveries(state, ownProps),
  hasLIWithOnlyScheduledDelivery: hasLIWithOnlyScheduledDelivery(
    state,
    ownProps
  ),
  shouldUpdateUi: state.delivery.shouldUpdateUi,
  storePreferencesData: state.orderForm.storePreferencesData,
})

export default connect(
  mapStateToProps,
  {
    changeActiveTab,
    changeActiveSLAOption,
    selectScheduledDelivery,
    setAditionalShippingData,
    toggleScheduledDelivery,
  }
)(injectIntl(ScheduledDeliveryToggle))
