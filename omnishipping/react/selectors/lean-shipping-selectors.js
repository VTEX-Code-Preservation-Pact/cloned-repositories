import {
  getCheapestCombination,
  getCostBenefitCombination,
} from '../utils/DeliveryPackagesUtils'

import { createSelector } from 'reselect'
import estimateCalculator from '@vtex/estimate-calculator'
import sortBy from 'lodash/sortBy'
import { hasSLAs, hasDeliveryWindows } from '../utils/SlasUtils'
import { isDelivery } from '../utils/DeliveryChannelsUtils'

const logisticsInfoSelector = logisticsInfo => logisticsInfo

function isDeliveryAndHasSelectedSla(logisticsInfo) {
  return logisticsInfo.filter(li => isDelivery(li) && li.selectedSla)
}

function filterSlaNoWindowAndDelivery(logisticsInfoItem) {
  return logisticsInfoItem.slas.filter(
    sla => !hasDeliveryWindows(sla) && isDelivery(sla)
  )
}

function getCheapestSla(logisticsInfoItem) {
  return estimateCalculator.getCheapestSla(
    filterSlaNoWindowAndDelivery(logisticsInfoItem)
  )
}

function getCheapestSlaFromDelivery(logisticsInfoItem) {
  return (
    hasSLAs(logisticsInfoItem) &&
    (getCheapestSla(logisticsInfoItem) ||
      logisticsInfoItem.slas.find(sla => isDelivery(sla)))
  )
}

export const getCheapestSlas = createSelector(
  logisticsInfoSelector,
  logisticsInfo => {
    if (!logisticsInfo.find(li => hasSLAs(li))) return []

    const deliveryLIs = isDeliveryAndHasSelectedSla(logisticsInfo)

    const cheapestFromCombination =
      deliveryLIs.length > 1 ? getCheapestCombination(deliveryLIs) : []

    const cheapestSlaFromSingleLI = getCheapestSlaFromDelivery(deliveryLIs[0])

    const singleDeliveryLI = [
      {
        ...deliveryLIs[0],
        selectedSla: cheapestSlaFromSingleLI && cheapestSlaFromSingleLI.id,
      },
    ]

    const cheapestFromCalculator =
      deliveryLIs.length === 1 ? singleDeliveryLI : []

    const newCheapestLogisticsInfo = [
      ...cheapestFromCombination,
      ...cheapestFromCalculator,
      ...logisticsInfo.filter(li => !isDelivery(li)),
    ]

    return sortBy(newCheapestLogisticsInfo, 'itemIndex')
  }
)

export const getFastestSlas = createSelector(
  logisticsInfoSelector,
  logisticsInfo => {
    const fastestLogisticsInfo =
      logisticsInfo.filter(li => isDelivery(li) && li.selectedSla).map(li => {
        const selectedSla = estimateCalculator.getFastestSla(
          li.slas.filter(sla => isDelivery(sla) && !hasDeliveryWindows(sla))
        )
        if (selectedSla && li.slas.length > 1) {
          return {
            ...li,
            selectedSla: selectedSla.id,
          }
        }
        return li
      }) || []

    if (logisticsInfo.find(li => hasSLAs(li))) {
      return sortBy(
        [
          ...fastestLogisticsInfo,
          ...logisticsInfo.filter(li => !isDelivery(li)),
        ],
        'itemIndex'
      )
    }

    return []
  }
)

export const getCombinedSlas = createSelector(
  logisticsInfoSelector,
  logisticsInfo => {
    if (logisticsInfo.find(li => hasSLAs(li))) {
      const deliveryLogisticsInfo = logisticsInfo.filter(
        li => isDelivery(li) && li.selectedSla
      )

      const combinedLogisticsInfo =
        deliveryLogisticsInfo.length > 0
          ? getCostBenefitCombination(deliveryLogisticsInfo)
          : []

      return sortBy(
        [
          ...combinedLogisticsInfo,
          ...logisticsInfo.filter(li => !isDelivery(li)),
        ],
        'itemIndex'
      )
    }
    return []
  }
)
