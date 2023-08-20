/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useStatisticsContext, Statistic } from './index'
import buttonUseIcon from '../../assets/icons/button_use.svg'
import buttonUseIconActive from '../../assets/icons/use_button_active.svg'
import shoppingIcon from '../../assets/icons/shopping.svg'
import shoppingIconActive from '../../assets/icons/shopping_active.svg'
import conversionIcon from '../../assets/icons/conversion_rate.svg'
import conversionIconActive from '../../assets/icons/conversion_rate_active.svg'
import ticketIcon from '../../assets/icons/ticket_average.svg'
import ticketActiveIcon from '../../assets/icons/ticket_average_active.svg'
import styles from '../../styles.css'

const StatisticItem = ({
  isActive,
  onClick,
  type,
  label,
  Icon,
  IconActive,
}: {
  isActive: boolean
  onClick: (type: Statistic) => void
  type: Statistic
  label: any
  Icon: any
  IconActive: any
}) => {
  return (
    <div
      className={`${isActive && styles.selectedCard}`}
      onClick={() => onClick(type)}
    >
      <small>
        <img src={isActive ? IconActive : Icon} alt="button-use" />
        {label}
      </small>
    </div>
  )
}

const StatisticType = () => {
  const { statisticSelected, setStadisticsSelected } =
    useStatisticsContext() as any

  return (
    <div className={styles.containerMetrics}>
      <StatisticItem
        isActive={statisticSelected === Statistic.buttonUse}
        label={
          <FormattedMessage id="checkoutless.statistics.admin.useButton" />
        }
        type={Statistic.buttonUse}
        onClick={setStadisticsSelected}
        Icon={buttonUseIcon}
        IconActive={buttonUseIconActive}
      />
      <StatisticItem
        isActive={statisticSelected === Statistic.checkout}
        label={<FormattedMessage id="checkoutless.statistics.checkout" />}
        type={Statistic.checkout}
        onClick={setStadisticsSelected}
        Icon={shoppingIcon}
        IconActive={shoppingIconActive}
      />
      <StatisticItem
        isActive={statisticSelected === Statistic.conversionRate}
        label={<FormattedMessage id="checkoutless.statistics.conversion" />}
        type={Statistic.conversionRate}
        onClick={setStadisticsSelected}
        Icon={conversionIcon}
        IconActive={conversionIconActive}
      />
      <StatisticItem
        isActive={statisticSelected === Statistic.ticketAverage}
        label={<FormattedMessage id="checkoutless.statistics.ticket" />}
        type={Statistic.ticketAverage}
        onClick={setStadisticsSelected}
        Icon={ticketIcon}
        IconActive={ticketActiveIcon}
      />
    </div>
  )
}

export default StatisticType
