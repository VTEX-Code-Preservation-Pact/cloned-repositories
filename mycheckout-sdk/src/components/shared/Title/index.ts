import { Title as TitleHOC } from './Title'
import { TitleItem } from './TitleItem/TitleItem'
import type { TitleHOCProps } from '../interfaces/interfaces'

export const Title: TitleHOCProps = Object.assign(TitleHOC, {
  Item: TitleItem,
})

export default Title
