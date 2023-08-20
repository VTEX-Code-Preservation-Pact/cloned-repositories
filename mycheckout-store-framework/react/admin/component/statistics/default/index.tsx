import type { IFilter } from '../interfaces'
import { formatCurrentDay } from '../../../utils/utilsStatistics'

export const defaultFilters: IFilter = {
  visualization: 'd',
  selectedFrom: formatCurrentDay(new Date()),
  selectedUntil: formatCurrentDay(new Date()),
  previousUntil: new Date(),
  previousFrom: new Date(),
}
