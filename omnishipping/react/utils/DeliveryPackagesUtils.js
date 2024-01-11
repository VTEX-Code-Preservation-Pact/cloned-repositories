import estimateCalculator from '@vtex/estimate-calculator'
import flatten from 'lodash/flatten'
import groupBy from 'lodash/groupBy'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import sortBy from 'lodash/sortBy'
import findIndex from 'lodash/findIndex'
import uniqBy from 'lodash/uniqBy'
import { isDelivery } from './DeliveryChannelsUtils'

function hasMoreThanOneSla(li) {
  return li.slas.length > 1
}

function hasAvailableDeliveryWindows(sla) {
  return sla.availableDeliveryWindows.length > 0
}

function getUniqueSlasById(logisticsInfo) {
  return uniqBy(
    flatten(
      logisticsInfo.map(li =>
        li.slas.filter(
          sla =>
            isDelivery(sla) &&
            (hasMoreThanOneSla(li) ? !hasAvailableDeliveryWindows(sla) : true)
        )
      )
    ),
    'id'
  )
}

function getCheapestSlasFromLogisticsInfo(logisticsInfo) {
  return (
    (logisticsInfo &&
      sortBy(getUniqueSlasById(logisticsInfo), sla => sla.price)) ||
    []
  )
}

function getFastestSlasFromLogisticsInfo(logisticsInfo) {
  return (
    (logisticsInfo &&
      sortBy(
        getUniqueSlasById(logisticsInfo),
        sla =>
          sla &&
          estimateCalculator.getShippingEstimateQuantityInSeconds(
            sla.shippingEstimate
          )
      )) ||
    []
  )
}

function getGroupedLogisticsInfoWithSelectedSlas(slas, logisticsInfo) {
  return (
    (slas.length > 1 &&
      logisticsInfo.length > 1 &&
      slas.map(sla => {
        const groupedLogisticsInfoBySlas = groupBy(logisticsInfo, li => {
          const groupedSla = li.slas.find(localSla => localSla.id === sla.id)
          return groupedSla && groupedSla.id
        })

        // if group is not undefined select sla in li
        return Object.keys(groupedLogisticsInfoBySlas).map(selectedSla => {
          const isSelectedSlaUndefined = selectedSla !== 'undefined'

          const notUndefinedLogisticsInfo =
            isSelectedSlaUndefined &&
            groupedLogisticsInfoBySlas[selectedSla].map(li => ({
              ...li,
              selectedSla,
            }))

          return (
            notUndefinedLogisticsInfo || {
              unselectedLogisticsInfo: groupedLogisticsInfoBySlas.undefined,
            }
          )
        })
      })) ||
    estimateCalculator.selectCheapestSlaForAllItems(logisticsInfo)
  )
}

export function getCostBenefitCombination(logisticsInfo) {
  const fastestSlas = getFastestSlasFromLogisticsInfo(logisticsInfo)
  const groupedLIsWithSelectedSlas = getGroupedLogisticsInfoWithSelectedSlas(
    fastestSlas,
    logisticsInfo
  )

  const groupedLIsWithUnselectedLogisticsInfo =
    groupedLIsWithSelectedSlas.find(item => isArray(item)) &&
    groupedLIsWithSelectedSlas.length > 1 &&
    flatten(
      groupedLIsWithSelectedSlas[1].map(liGroup => {
        const hasUnselected = get(liGroup, 'unselectedLogisticsInfo')
        return hasUnselected
          ? getCostBenefitCombination(get(liGroup, 'unselectedLogisticsInfo'))
          : liGroup
      })
    )

  return (
    groupedLIsWithUnselectedLogisticsInfo || groupedLIsWithSelectedSlas || []
  )
}

function getGroupedLIsWithLessPackages(logisticsInfo) {
  return (
    logisticsInfo &&
    logisticsInfo.reduce((previousLIGroup, currentLIGroup) => {
      const previousArray = previousLIGroup.find(item => isArray(item))
      const currentArray = currentLIGroup.find(item => isArray(item))

      if (!previousArray) return currentLIGroup

      if (!currentArray) return previousLIGroup

      return previousArray.length >= currentArray.length
        ? previousLIGroup
        : currentLIGroup
    })
  )
}

export function getCheapestCombination(logisticsInfo) {
  const cheapestSlas = getCheapestSlasFromLogisticsInfo(logisticsInfo)

  const freeSla = cheapestSlas.find(sla => sla.price === 0)

  const groupedLIsWithSelectedSlas = getGroupedLogisticsInfoWithSelectedSlas(
    cheapestSlas,
    logisticsInfo
  )

  const groupedLIsWithLessPackages =
    groupedLIsWithSelectedSlas.find(item => isArray(item)) &&
    getGroupedLIsWithLessPackages(groupedLIsWithSelectedSlas)

  const groupedLIsWithFreeSla =
    freeSla && groupedLIsWithSelectedSlas[findIndex(cheapestSlas, freeSla)]

  const selectedGroupedLIs =
    groupedLIsWithFreeSla ||
    groupedLIsWithLessPackages ||
    groupedLIsWithSelectedSlas

  const groupedLIsWithUnselectedLogisticsInfo =
    selectedGroupedLIs &&
    selectedGroupedLIs.length > 0 &&
    flatten(
      selectedGroupedLIs.map(liGroup => {
        const hasUnselected = get(liGroup, 'unselectedLogisticsInfo')

        return hasUnselected
          ? getCheapestCombination(get(liGroup, 'unselectedLogisticsInfo'))
          : liGroup
      })
    )

  return groupedLIsWithUnselectedLogisticsInfo || [selectedGroupedLIs] || []
}
