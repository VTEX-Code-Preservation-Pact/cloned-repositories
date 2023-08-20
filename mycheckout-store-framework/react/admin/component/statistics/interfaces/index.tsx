export interface IFilter {
  visualization: 'd' | 'm' | 'y'
  selectedFrom: string | Date
  selectedUntil: string | Date
  previousFrom: null | Date
  previousUntil: null | Date
}
