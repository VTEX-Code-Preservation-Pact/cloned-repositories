/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-imports */
import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'
import { useLazyQuery } from 'react-apollo'
import { pathOr } from 'ramda'

import getButtonUses from '../../graphql/metrics/getButtonUses.graphql'
import getCheckout from '../../graphql/metrics/getCheckout.graphql'
import getConversionRate from '../../graphql/metrics/getConversionRate.graphql'
import getTicketAverage from '../../graphql/metrics/getTicketAverage.graphql'
import StatisticsView from './Statistics'
import { showDataInGraphic, formatDate } from '../../utils/utilsStatistics'
import { defaultFilters } from './default'
import type { IFilter } from './interfaces'

export enum Statistic {
  buttonUse = 1,
  checkout = 2,
  conversionRate = 3,
  ticketAverage = 4,
}

export interface StatisticsContext {
  statisticSelected: Statistic
  setStadisticsSelected: (state: Statistic) => void
  filters: IFilter
  setFilters: (state: IFilter) => void
  onSubmitFilters: (
    forceVisualization?: string,
    forceSelectectFrom?: string,
    forceSelectedUntil?: string,
    forcePreviousFrom?: string,
    forcePreviousUntil?: string
  ) => void
  graphicInfo: any[]
  setChecked: (state: boolean) => void
  checked: boolean
  firstPicker: any
  setFirstPicker: (state: any) => void | null
  secondPicker: any
  setSecondPicker: (state: any) => void | null
  thirdPicker: any
  setThirdPicker: (state: any) => void | null
  fourPicker: any
  setFourPicker: (state: any) => void | null
  firstSelectOption: string
  setFirstSelectOption: (state: string) => void
  secondSelectOption: string
  setSecondSelectOption: (state: string) => void
  loading: boolean
}

const statisticsContext = createContext<StatisticsContext>({} as any)
const { Provider } = statisticsContext

export const useStatisticsContext = () => useContext(statisticsContext)

const Statistics = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [statisticSelected, setStadisticsSelected] = useState<Statistic>(
    Statistic.buttonUse
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [filters, setFilters] = useState<IFilter>(defaultFilters)
  const [graphicInfo, setGraphicInfo] = useState<any[]>([])
  const [firstPicker, setFirstPicker] = useState<any>('')
  const [secondPicker, setSecondPicker] = useState<any>('')
  const [thirdPicker, setThirdPicker] = useState<any>('')
  const [fourPicker, setFourPicker] = useState<any>('')
  const [firstSelectOption, setFirstSelectOption] = useState<string>('')
  const [secondSelectOption, setSecondSelectOption] = useState<string>('')

  const [lazyButtonUses, { data: buttonUses }] = useLazyQuery(getButtonUses, {
    fetchPolicy: 'network-only',
  })

  const [lazyCheckout, { data: checkoutUse }] = useLazyQuery(getCheckout, {
    fetchPolicy: 'network-only',
  })

  const [lazyConversion, { data: conversionUse }] = useLazyQuery(
    getConversionRate,
    { fetchPolicy: 'network-only' }
  )

  const [lazyTicket, { data: ticketUse }] = useLazyQuery(getTicketAverage, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    setLoading(true)
    if (buttonUses) {
      const previousPeriod = pathOr(
        [],
        ['button', 'previousPeriodButton'],
        buttonUses
      )

      const selectedPeriod = pathOr(
        [],
        ['button', 'selectedPeriodButton'],
        buttonUses
      )

      setGraphicInfo(
        showDataInGraphic(previousPeriod, selectedPeriod, 'use').sort(
          (a: any, b: any) => {
            const fist: any = formatDate(a?.name)
            const last: any = formatDate(b?.name)

            return fist - last
          }
        )
      )
      setLoading(false)
    }
  }, [buttonUses])

  useEffect(() => {
    setLoading(true)
    if (checkoutUse) {
      const previousPeriod = pathOr(
        [],
        ['checkout', 'previousPeriodCheckout'],
        checkoutUse
      )

      const selectedPeriod = pathOr(
        [],
        ['checkout', 'selectedPeriodCheckout'],
        checkoutUse
      )

      setGraphicInfo(
        showDataInGraphic(
          previousPeriod,
          selectedPeriod,
          'closedPurchases'
        ).sort((a: any, b: any) => {
          const fist: any = formatDate(a?.name)
          const last: any = formatDate(b?.name)

          return fist - last
        })
      )
    }

    setLoading(false)
  }, [checkoutUse])

  useEffect(() => {
    setLoading(true)
    if (conversionUse) {
      const previousPeriod = pathOr(
        [],
        ['conversionRate', 'previousPeriodCR'],
        conversionUse
      )

      const selectedPeriod = pathOr(
        [],
        ['conversionRate', 'selectedPeriodCR'],
        conversionUse
      )

      setGraphicInfo(
        showDataInGraphic(previousPeriod, selectedPeriod, 'cr').sort(
          (a: any, b: any) => {
            const fist: any = formatDate(a?.name)
            const last: any = formatDate(b?.name)

            return fist - last
          }
        )
      )
    }

    setLoading(false)
  }, [conversionUse])

  useEffect(() => {
    setLoading(true)
    if (ticketUse) {
      const previousPeriod = pathOr(
        [],
        ['ticketAverage', 'previousPeriodTicket'],
        ticketUse
      )

      const selectedPeriod = pathOr(
        [],
        ['ticketAverage', 'selectedPeriodTicket'],
        ticketUse
      )

      setGraphicInfo(
        showDataInGraphic(previousPeriod, selectedPeriod, 'ticketAverage').sort(
          (a: any, b: any) => {
            const fist: any = formatDate(a?.name)
            const last: any = formatDate(b?.name)

            return fist - last
          }
        )
      )
    }

    setLoading(false)
  }, [ticketUse])

  const onSubmitFilters = (
    forceVisualization?: string,
    forceSelectectFrom?: string,
    forceSelectedUntil?: string,
    forcePreviousFrom?: string,
    forcePreviousUntil?: string
  ) => {
    const { timeZone: timezone = 'America/Bogota' } =
      Intl.DateTimeFormat().resolvedOptions()

    switch (statisticSelected) {
      case Statistic.buttonUse:
        lazyButtonUses({
          variables: {
            ...filters,
            visualization: forceVisualization || filters.visualization,
            selectedFrom: forceSelectectFrom || filters.selectedFrom,
            selectedUntil: forceSelectedUntil || filters.selectedUntil,
            previousFrom: forcePreviousFrom || filters.previousFrom,
            previousUntil: forcePreviousUntil || filters.previousUntil,
            timezone,
          },
        })
        break

      case Statistic.checkout:
        lazyCheckout({
          variables: {
            ...filters,
            visualization: forceVisualization || filters.visualization,
            selectedFrom: forceSelectectFrom || filters.selectedFrom,
            selectedUntil: forceSelectedUntil || filters.selectedUntil,
            previousFrom: forcePreviousFrom || filters.previousFrom,
            previousUntil: forcePreviousUntil || filters.previousUntil,
            timezone,
          },
        })
        break

      case Statistic.conversionRate:
        lazyConversion({
          variables: {
            ...filters,
            visualization: forceVisualization || filters.visualization,
            selectedFrom: forceSelectectFrom || filters.selectedFrom,
            selectedUntil: forceSelectedUntil || filters.selectedUntil,
            previousFrom: forcePreviousFrom || filters.previousFrom,
            previousUntil: forcePreviousUntil || filters.previousUntil,
            timezone,
          },
        })
        break

      case Statistic.ticketAverage:
        lazyTicket({
          variables: {
            ...filters,
            visualization: forceVisualization || filters.visualization,
            selectedFrom: forceSelectectFrom || filters.selectedFrom,
            selectedUntil: forceSelectedUntil || filters.selectedUntil,
            previousFrom: forcePreviousFrom || filters.previousFrom,
            previousUntil: forcePreviousUntil || filters.previousUntil,
            timezone,
          },
        })

      default:
        break
    }
  }

  useEffect(() => {
    setLoading(true)
    onSubmitFilters()
  }, [statisticSelected])

  const context = useMemo<StatisticsContext>(
    () => ({
      statisticSelected,
      setStadisticsSelected,
      filters,
      setFilters,
      onSubmitFilters,
      graphicInfo,
      setChecked,
      checked,
      firstPicker,
      setFirstPicker,
      secondPicker,
      setSecondPicker,
      thirdPicker,
      setThirdPicker,
      fourPicker,
      setFourPicker,
      firstSelectOption,
      setFirstSelectOption,
      secondSelectOption,
      setSecondSelectOption,
      loading,
    }),
    [
      statisticSelected,
      filters,
      graphicInfo,
      checked,
      firstPicker,
      secondPicker,
      thirdPicker,
      firstSelectOption,
      secondSelectOption,
      loading,
    ]
  )

  return (
    <Provider value={context}>
      <StatisticsView />
    </Provider>
  )
}

export default Statistics
