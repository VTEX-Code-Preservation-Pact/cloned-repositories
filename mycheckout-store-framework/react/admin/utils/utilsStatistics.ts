/* eslint-disable no-restricted-imports */
import { pathOr } from 'ramda'

export const getDateByOption = (range: number, initialDate: string) => {
  const today = new Date(initialDate)

  today.setDate(today.getDate() - range)
  const formatDate = `${today.getUTCFullYear()}${
    today.getMonth() <= 10 ? '-0' : '-'
  }${today.getMonth() + 1}-${today.getUTCDate()}`

  initialDate = formatDate

  return initialDate
}

export const formatCurrentDay = (today: any) => {
  const thisDay = new Date()
  const formatDate = `${thisDay.getUTCFullYear()}${
    thisDay.getMonth() <= 10 ? '-0' : '-'
  }${thisDay.getMonth() + 1}-${thisDay.getUTCDate()}`

  today = formatDate

  return today
}

export const formatCurrentDayPicker = (today: any) => {
  const thisDay = new Date(today)
  const formatDate = `${thisDay.getUTCFullYear()}${
    thisDay.getMonth() <= 10 ? '-0' : '-'
  }${thisDay.getMonth() + 1}-${thisDay.getUTCDate()}`

  today = formatDate

  return today
}

export const days = {
  today: 0,
  yesterday: 1,
  lastWeek: 7,
  lastMonth: 31,
  person: 0,
}

export const getDateIntoOptionValue = (
  value: string,
  stateInitial: any,
  stateFinal: any
) => {
  return {
    initial: getDateByOption(pathOr(0, [value], days), stateInitial),
    final: formatCurrentDayPicker(stateFinal),
  }
}

const selectArray = (
  selected: any,
  previous: any
): { arrayToIterate: any[]; arrayToCompare: any[] } => {
  const arrayToIterate = selected.length > previous.length ? selected : previous

  const arrayToCompare = selected.length < previous.length ? selected : previous

  return {
    arrayToIterate,
    arrayToCompare,
  }
}

export const generateDataForChart = (
  selected: any,
  previous: any,
  name: string
) => {
  const selectedItems = selectArray(selected, previous)
  const { arrayToCompare, arrayToIterate } = Object.assign(selectedItems, {})

  const data = arrayToIterate.map((item) => {
    const prvArray =
      selectedItems[
        selected.length > previous.length ? 'arrayToIterate' : 'arrayToCompare'
      ]

    const useArray =
      selectedItems[
        selected.length > previous.length ? 'arrayToCompare' : 'arrayToIterate'
      ]

    return {
      name: item?._id,
      isEqual: arrayToCompare.some((compare: any) => item._id === compare._id),
      previous: pathOr(
        0,
        [name],
        prvArray.find((prv) => prv._id === item._id)
      ),
      use: pathOr(
        0,
        [name],
        useArray.find((use) => use._id === item._id)
      ),
    }
  })

  return data
}

export const showDataInGraphic = (
  arrSelected: any,
  arrPrevious: any,
  name: string
): any[] => {
  if (arrPrevious?.length === 0) {
    return arrSelected?.map((item: any) => ({
      name: item._id,
      use: item[name],
    }))
  }

  const allData = [...arrSelected, ...arrPrevious]
  const data = allData?.map((item: any) => ({
    name: item._id,
    use: item[name],
    previous: null,
  }))

  if (data.length === 1) {
    return data
  }

  return generateDataForChart(arrSelected, arrPrevious, name)
}

export const formatDate = (date: string) => {
  const info = date.split('-')
  const newDate = `${pathOr('', [1], info)}-${pathOr('', [0], info)}-${pathOr(
    '',
    [2],
    info
  )}`

  return new Date(newDate)
}
