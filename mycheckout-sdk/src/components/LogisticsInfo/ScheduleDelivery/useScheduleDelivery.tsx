import React, { useEffect, useMemo, useState } from 'react'

import { Clock, Calendar } from '../../Icons'
import { formatter, isMobile as validateIsMobile } from '../../../utils'
import { useSelectValue } from '../../../hooks/useSelectValue'
import global from '../../../myCheckout-styles.module.css'
import { usePackagesManager } from '../Packages/usePackagesManager'

const fmtDay = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: '2-digit',
  month: 'short',
})

const fmtTime = new Intl.DateTimeFormat('es-CO', {
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
})

const useScheduleDelivery = () => {
  const { packageManager, setPackageManager, deliveryChannel } =
    usePackagesManager()

  const [dateOptions, setDateOptions] = useState({})

  const [formatedEstimateDate, setFormatedEstimateDate] = useState([
    {
      label: '',
      value: '',
    },
  ])

  const isMobile = validateIsMobile()
  const numOfItemsToShow = useMemo(() => (isMobile ? 2 : 4), [isMobile])

  const [formatedEstimateTime, setFormatedEstimateTime] = useState([
    {
      label: 'Seleccione la fecha de entrega',
      value: 'placeholder',
      deliveryWindow: {
        startDateUtc: '',
        endDateUtc: '',
      },
    },
  ])

  const deliveryDate: any = useSelectValue({
    label: 'Fecha de entrega',
    value: 'placeholder',
  })

  const deliveryTime: any = useSelectValue({
    label: 'Hora de entrega',
    value: 'placeholder',
  })

  const deliveryWindows = useMemo(
    () =>
      packageManager[deliveryChannel].selectedSla?.availableDeliveryWindow.map(
        (option) => {
          const startDate = new Date(option.startDateUtc.split('+')[0])
          const endDate = new Date(option.endDateUtc.split('+')[0])

          const day = `${fmtDay.format(startDate)}`
          const timeRange = `${fmtTime.format(startDate)} - ${fmtTime.format(
            endDate
          )}`

          const price = formatter.format(option.price / 100)

          return {
            day,
            timeRange,
            price,
            deliveryWindow: option,
          }
        }
      ) || [],
    [packageManager]
  )

  useEffect(() => {
    if (packageManager[deliveryChannel].selectedSla.deliveryWindow) {
      const selectedDeliveryWindow = deliveryWindows.find(
        (dw) =>
          dw.deliveryWindow.startDateUtc ===
            packageManager[deliveryChannel].selectedSla.deliveryWindow
              .startDateUtc &&
          dw.deliveryWindow.endDateUtc ===
            packageManager[deliveryChannel].selectedSla.deliveryWindow
              .endDateUtc
      )

      if (selectedDeliveryWindow) {
        deliveryDate.setValue({
          label: selectedDeliveryWindow.day,
          value: selectedDeliveryWindow.day,
        })
      }
    }
  }, [])

  useEffect(() => {
    const deliveryWindowsGroupByDate = {}

    for (const deliveryWindow of deliveryWindows) {
      const keys = Object.keys(deliveryWindowsGroupByDate)

      if (keys.includes(deliveryWindow.day)) {
        deliveryWindowsGroupByDate[deliveryWindow.day].push(deliveryWindow)
      } else {
        deliveryWindowsGroupByDate[deliveryWindow.day] = [deliveryWindow]
      }
    }

    setDateOptions(deliveryWindowsGroupByDate)

    const dates = Object.keys(deliveryWindowsGroupByDate)

    setFormatedEstimateDate(
      dates.map((date) => {
        return {
          label: date,
          value: date,
        }
      })
    )

    // TODO: Revisar como afecta esta logica
    // if (selectedSla?.availableDeliveryWindows.length < 1) {
    //   setDeliveryWindow({
    //     startDateUtc: '',
    //     endDateUtc: '',
    //   })
    //   setScheduleDelivery({
    //     day: '',
    //     timeRange: '',
    //   })
    //   setDisabled(false)
    // } else if (
    //   deliveryDate.value.value === 'placeholder' ||
    //   deliveryTime.value.value === 'placeholder'
    // ) {
    //   setDisabled(true)
    // }
  }, [packageManager])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (deliveryDate?.value?.value !== 'placeholder') {
      if (packageManager[deliveryChannel].selectedSla.deliveryWindow) {
        const selectedDeliveryWindow = deliveryWindows.find(
          (dw) =>
            dw.deliveryWindow.startDateUtc ===
              packageManager[deliveryChannel].selectedSla.deliveryWindow
                .startDateUtc &&
            dw.deliveryWindow.endDateUtc ===
              packageManager[deliveryChannel].selectedSla.deliveryWindow
                .endDateUtc &&
            dw.day === deliveryDate?.value?.value
        )

        if (selectedDeliveryWindow) {
          deliveryTime.setValue({
            label: selectedDeliveryWindow.timeRange,
            value: selectedDeliveryWindow.timeRange,
          })
        } else {
          deliveryTime.setValue({
            label: 'Hora de entrega',
            value: 'placeholder',
          })
        }
      }

      setFormatedEstimateTime(
        dateOptions[deliveryDate?.value?.value]?.map((option: any) => {
          return {
            label: `${option.timeRange} (${option.price})`,
            value: option.timeRange,
            deliveryWindow: option.deliveryWindow,
          }
        })
      )

      setPackageManager({
        ...packageManager,
        [deliveryChannel]: {
          ...packageManager[deliveryChannel],
          selectedSla: {
            ...packageManager[deliveryChannel].selectedSla,
            deliveryWindow: {
              startDateUtc: '',
              endDateUtc: '',
            },
          },
        },
      })
    }
  }, [deliveryDate?.value?.value])

  useEffect(() => {
    if (
      !deliveryTime?.value?.value ||
      deliveryTime?.value?.value === 'placeholder'
    ) {
      return
    }

    const deliveryWindowLabel = formatedEstimateTime?.find(
      (option) => option.value === deliveryTime?.value?.value
    )

    const deliveryWindow = deliveryWindowLabel?.deliveryWindow

    setPackageManager({
      ...packageManager,
      [deliveryChannel]: {
        ...packageManager[deliveryChannel],
        selectedSla: {
          ...packageManager[deliveryChannel].selectedSla,
          deliveryWindow: {
            startDateUtc: deliveryWindow?.startDateUtc,
            endDateUtc: deliveryWindow?.endDateUtc,
          },
        },
      },
    })
  }, [deliveryTime?.value?.value])

  const selectIconCalendar = () => (
    <Calendar
      fill={
        deliveryDate?.value?.value !== 'placeholder'
          ? global.iconAlternativeSecondary
          : global.iconAlternative
      }
      width={'24'}
      height={'16'}
    />
  )

  const selectIconClock = () => (
    <Clock
      fill={
        deliveryTime?.value?.value !== 'placeholder'
          ? global.iconAlternativeSecondary
          : global.iconAlternative
      }
      width={'24'}
      height={'22'}
    />
  )

  return {
    deliveryDate,
    deliveryTime,
    formatedEstimateDate,
    formatedEstimateTime,
    numOfItemsToShow,
    selectedSla: packageManager[deliveryChannel].selectedSla,
    selectIconCalendar,
    selectIconClock,
  }
}

export default useScheduleDelivery
